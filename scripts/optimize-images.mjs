import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const imageDirectory = fileURLToPath(new URL('../public/images/', import.meta.url));
const files = await readdir(imageDirectory);
let optimizedCount = 0;
let originalBytes = 0;
let optimizedBytes = 0;

for (const file of files) {
  if (!/\.(?:jpe?g|png)$/i.test(file) || file === 'brand-logo.png') continue;

  const sourcePath = path.join(imageDirectory, file);
  const sourceMetadata = await sharp(sourcePath).metadata();
  if (!sourceMetadata.width) {
    throw new Error(`Could not read image dimensions: ${file}`);
  }

  const sourceBytes = (await stat(sourcePath)).size;
  originalBytes += sourceBytes;
  const baseName = path.parse(file).name;
  const widths = [...new Set([
    ...[400, 800, 1200].filter((width) => width < sourceMetadata.width),
    Math.min(sourceMetadata.width, 1600),
  ])];

  for (const width of widths) {
    const outputName = width === Math.min(sourceMetadata.width, 1600)
      ? `${baseName}.webp`
      : `${baseName}-${width}.webp`;
    const outputPath = path.join(imageDirectory, outputName);

    await sharp(sourcePath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78, effort: 5 })
      .toFile(outputPath);

    const outputBytes = (await stat(outputPath)).size;
    optimizedBytes += outputBytes;
    optimizedCount += 1;
  }
}

console.log(
  `Generated ${optimizedCount} responsive WebP images from ${(originalBytes / 1024 / 1024).toFixed(2)} MB of originals; variants total ${(optimizedBytes / 1024 / 1024).toFixed(2)} MB.`,
);
