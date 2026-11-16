import { execFileSync } from 'node:child_process';
import { lstat, readdir, readFile, rename, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { fileURLToPath, pathToFileURL } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, '..');
const modelImagesDirectory = 'src/assets/models';
const contentDirectory = 'src/content';
const maxImageDimension = 1600;
const webpQuality = 82;
const imageExtensionPattern = /\.(?:jpe?g|png)$/i;
const markdownImagePathPattern =
  /(?:\.\.\/|\.\/|\/)[^"'()<>\r\n]*?\.(?:jpe?g|png)(?=$|[\s)"'<>?#,])/giu;

function normalizeRepositoryPath(filePath) {
  return filePath.replaceAll('\\', '/').replace(/^\.\//, '');
}

function pathKey(filePath) {
  const resolved = path.resolve(filePath);
  return process.platform === 'win32' ? resolved.toLocaleLowerCase('en-US') : resolved;
}

function isWithinDirectory(directory, filePath) {
  const relativePath = path.relative(directory, filePath);
  return (
    relativePath !== '' &&
    !relativePath.startsWith(`..${path.sep}`) &&
    relativePath !== '..' &&
    !path.isAbsolute(relativePath)
  );
}

async function listMarkdownFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listMarkdownFiles(entryPath)));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
      files.push(entryPath);
    }
  }
  return files;
}

export async function optimizeImageFiles({ root, relativePaths }) {
  const absoluteRoot = path.resolve(root);
  const allowedDirectory = path.resolve(absoluteRoot, modelImagesDirectory);
  const files = [];

  for (const candidate of new Set(relativePaths.map(normalizeRepositoryPath))) {
    if (
      !candidate.startsWith(`${modelImagesDirectory}/`) ||
      !imageExtensionPattern.test(candidate)
    ) {
      continue;
    }

    const sourcePath = path.resolve(absoluteRoot, candidate);
    if (!isWithinDirectory(allowedDirectory, sourcePath)) {
      throw new Error(`Image path is outside ${modelImagesDirectory}: ${candidate}`);
    }

    const sourceStats = await lstat(sourcePath);
    if (sourceStats.isSymbolicLink()) {
      throw new Error(`Refusing to optimize a symbolic link: ${candidate}`);
    }
    if (!sourceStats.isFile()) continue;

    const destinationPath = sourcePath.replace(imageExtensionPattern, '.webp');
    for (const outputPath of [destinationPath, `${destinationPath}.tmp.webp`]) {
      try {
        await lstat(outputPath);
        throw new Error(`Refusing to overwrite an existing image: ${outputPath}`);
      } catch (error) {
        if (error.code !== 'ENOENT') throw error;
      }
    }

    files.push({ sourcePath, destinationPath });
  }

  if (files.length === 0) return { converted: 0, updatedMarkdown: 0 };

  const contentRoot = path.resolve(absoluteRoot, contentDirectory);
  const markdownFiles = await listMarkdownFiles(contentRoot);
  const replacements = new Map(
    files.map(({ sourcePath, destinationPath }) => [pathKey(sourcePath), destinationPath]),
  );
  const markdownUpdates = [];

  for (const markdownPath of markdownFiles) {
    const original = await readFile(markdownPath, 'utf8');
    const updated = original.replace(markdownImagePathPattern, (reference) => {
      const referencedPath = path.resolve(path.dirname(markdownPath), reference);
      const destinationPath = replacements.get(pathKey(referencedPath));
      if (!destinationPath) return reference;
      const extension = path.extname(reference);
      return `${reference.slice(0, -extension.length)}.webp`;
    });

    if (updated !== original) markdownUpdates.push({ markdownPath, original, updated });
  }

  const temporaryOutputs = [];
  const completedOutputs = [];
  try {
    for (const { sourcePath, destinationPath } of files) {
      const temporaryPath = `${destinationPath}.tmp.webp`;
      temporaryOutputs.push(temporaryPath);
      await sharp(sourcePath)
        .rotate()
        .resize({
          width: maxImageDimension,
          height: maxImageDimension,
          fit: 'inside',
          withoutEnlargement: true,
        })
        .webp({ quality: webpQuality })
        .toFile(temporaryPath);
    }

    for (const { destinationPath } of files) {
      const temporaryPath = `${destinationPath}.tmp.webp`;
      await rename(temporaryPath, destinationPath);
      completedOutputs.push(destinationPath);
    }

    for (const { markdownPath, updated } of markdownUpdates) {
      await writeFile(markdownPath, updated, 'utf8');
    }
  } catch (error) {
    for (const { markdownPath, original } of markdownUpdates) {
      await writeFile(markdownPath, original, 'utf8');
    }
    for (const outputPath of [...temporaryOutputs, ...completedOutputs]) {
      try {
        await unlink(outputPath);
      } catch (cleanupError) {
        if (cleanupError.code !== 'ENOENT') throw cleanupError;
      }
    }
    throw error;
  }

  for (const { sourcePath } of files) {
    await unlink(sourcePath);
  }

  return { converted: files.length, updatedMarkdown: markdownUpdates.length };
}

function setGitHubOutput(name, value) {
  if (process.env.GITHUB_OUTPUT) {
    return writeFile(process.env.GITHUB_OUTPUT, `${name}=${value}\n`, { flag: 'a' });
  }
  return Promise.resolve();
}

async function main() {
  const baseSha = process.env.BASE_SHA;
  const headSha = process.env.HEAD_SHA ?? 'HEAD';
  if (!baseSha || /^0+$/.test(baseSha)) {
    console.log('No valid push base SHA; refusing to scan existing images.');
    await setGitHubOutput('changed', 'false');
    return;
  }

  const changedPaths = execFileSync(
    'git',
    [
      'diff',
      '--diff-filter=AM',
      '--name-only',
      '-z',
      baseSha,
      headSha,
      '--',
      modelImagesDirectory,
    ],
    { cwd: repositoryRoot, encoding: 'utf8' },
  )
    .split('\0')
    .filter(Boolean);

  const result = await optimizeImageFiles({ root: repositoryRoot, relativePaths: changedPaths });
  console.log(
    `Converted ${result.converted} image(s); updated ${result.updatedMarkdown} Markdown file(s).`,
  );
  await setGitHubOutput('changed', String(result.converted > 0));
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  await main();
}
