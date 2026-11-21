import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import test from 'node:test';
import { pathToFileURL } from 'node:url';
import { markdownFigurePlugin } from '../src/utils/markdown-figures.mjs';
import { markdownTablePlugin } from '../src/utils/markdown-tables.mjs';
import { markdownVideoPlugin } from '../src/utils/markdown-videos.mjs';

const astroRequire = createRequire(import.meta.resolve('astro/package.json'));
const { createSatteriMarkdownProcessor } = await import(
  pathToFileURL(astroRequire.resolve('@astrojs/markdown-satteri')).href
);
const processor = await createSatteriMarkdownProcessor({
  syntaxHighlight: false,
  hastPlugins: [markdownVideoPlugin, markdownFigurePlugin, markdownTablePlugin],
});
const render = async (markdown) => (await processor.render(markdown)).code;

test('wraps each Markdown table once and preserves cell content and alignment', async () => {
  const html = await render('Before\n\n| Name | Value |\n| :--- | ---: |\n| `GPIO 10` | 69,8&nbsp;Hz |\n\nAfter');
  assert.equal((html.match(/class="article-table-wrapper"/g) ?? []).length, 1);
  assert.match(html, /<div class="article-table-wrapper" tabindex="0"><table>/);
  assert.match(html, /<th style="text-align: right">Value<\/th>/);
  assert.match(html, /<code>GPIO 10<\/code>/);
  assert.match(html, /69,8(?:&nbsp;|&#160;|\u00a0)Hz/);
  assert.match(html, /<\/table><\/div>/);
  assert.match(html, /<p>Before<\/p>/);
  assert.match(html, /<p>After<\/p>/);
});

test('does not wrap fenced code and normal text', async () => {
  const html = await render('```text\n| not | a table |\n```\n\nA paragraph with `code`.');
  assert.doesNotMatch(html, /article-table-wrapper/);
  assert.match(html, /<pre><code class="language-text">/);
  assert.match(html, /<p>A paragraph with <code>code<\/code>\.<\/p>/);
});

test('preserves an explicitly wrapped raw HTML table without nesting wrappers', async () => {
  const html = await render('<div class="article-table-wrapper" tabindex="0">\n<table><tr><td>Value</td></tr></table>\n</div>');
  assert.equal((html.match(/class="article-table-wrapper"/g) ?? []).length, 1);
  assert.match(html, /<table><tr><td>Value<\/td><\/tr><\/table>/);
});
