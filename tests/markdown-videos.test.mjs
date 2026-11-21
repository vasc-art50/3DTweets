import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import test from 'node:test';
import { pathToFileURL } from 'node:url';
import { markdownFigurePlugin } from '../src/utils/markdown-figures.mjs';
import { markdownVideoPlugin } from '../src/utils/markdown-videos.mjs';

const astroRequire = createRequire(import.meta.resolve('astro/package.json'));
const { createSatteriMarkdownProcessor } = await import(
  pathToFileURL(astroRequire.resolve('@astrojs/markdown-satteri')).href
);
const processor = await createSatteriMarkdownProcessor({
  syntaxHighlight: false,
  hastPlugins: [markdownVideoPlugin, markdownFigurePlugin],
});
const render = async (markdown) => (await processor.render(markdown)).code;
const id = 'TXev-ikeR5w';

test('embeds supported standalone URLs without captions for URL labels', async () => {
  for (const url of [
    `https://youtu.be/${id}`,
    `https://www.youtube.com/watch?v=${id}`,
    `https://www.youtube.com/shorts/${id}`,
    `https://www.youtube.com/embed/${id}`,
  ]) {
    for (const markdown of [url, `[${url}](${url})`]) {
      const html = await render(markdown);
      assert.match(html, /<figure class="aw-markdown-figure aw-video">/);
      assert.match(html, /data-youtube-embed="https:\/\/www\.youtube-nocookie\.com\/embed\/TXev-ikeR5w\?rel=0&amp;modestbranding=1&amp;playsinline=1"/);
      assert.doesNotMatch(html, /<figcaption|<iframe/);
      assert.equal((html.match(/<figure/g) ?? []).length, 1);
    }
  }
});

test('preserves custom captions and supported timestamps', async () => {
  const html = await render(`[First **test** & print](https://youtu.be/${id}?t=1h2m3s)`);
  assert.match(html, /start=3723/);
  assert.match(html, /<figcaption>First test &amp; print<\/figcaption>/);
  const seconds = await render(`[Test](https://www.youtube.com/watch?v=${id}&start=45)`);
  assert.match(seconds, /start=45/);
});

test('leaves sentence links, tight and loose list links, and mixed image paragraphs alone', async () => {
  for (const markdown of [
    `See [video](https://youtu.be/${id}) for details.`,
    `- [video](https://youtu.be/${id})`,
    `1. [video](https://youtu.be/${id})\n\n   More text.`,
    `![Image](https://example.com/image.jpg) [video](https://youtu.be/${id})`,
  ]) {
    const html = await render(markdown);
    assert.doesNotMatch(html, /aw-video/);
    assert.match(html, /<a href="https:\/\/youtu\.be\/TXev-ikeR5w">video<\/a>/);
  }
});

test('leaves invalid, non-video and impersonating URLs untouched', async () => {
  for (const url of [
    'https://www.youtube.com/@Irbis3D',
    `https://youtube.com.evil.example/watch?v=${id}`,
    `https://youtu.be/${id}?t=not-a-time`,
    'https://youtu.be/not-a-valid-id',
    `http://youtu.be/${id}`,
  ]) {
    const html = await render(`[Video](${url})`);
    assert.doesNotMatch(html, /aw-video/);
    assert.match(html, /<a href=/);
  }
});
