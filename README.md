# 3DTweets

3DTweets is a bilingual project portfolio for original 3D design, functional
prototypes, short-run technical 3D printing, custom CoreXY printers, and
smart-home electronics.

## Website

- English: <https://3dtweets.com/>
- Czech: <https://3dtweets.com/cs/>
- Services: <https://3dtweets.com/services/> and
  <https://3dtweets.com/cs/services/>
- Blog and projects: <https://3dtweets.com/blog/> and
  <https://3dtweets.com/cs/blog/>

## Technology

- Astro 7 with static output
- Bulma and Sass
- Astro Content Collections for the English and Czech blogs
- `astro-pagefind` for site search
- `@astrojs/sitemap` for sitemap generation
- Structured data, canonical URLs, and localized `hreflang` links

The project requires Node.js >= 22.22.0 and uses pnpm.

## Development

```sh
pnpm install
pnpm dev
```

| Command | Action |
| --- | --- |
| `pnpm check` | Type-check the project |
| `pnpm build` | Build the static site into `dist/` |
| `pnpm preview` | Preview the production build |

## Content

English posts live in `src/content/blog/`; Czech translations live in
`src/content/blog-cs/`. The content schema is defined in `src/content.config.ts`.
Project images and other imported media live in `src/assets/`; static public
files live in `public/`.

Standalone YouTube video links in blog and TweetONE Markdown become click-to-play
video cards. Use a custom link label for a caption, or a bare URL for no caption:

```md
[First test print](https://youtu.be/TXev-ikeR5w?t=30)

https://youtu.be/TXev-ikeR5w

See [our video](https://youtu.be/TXev-ikeR5w) for details.
```

Links in sentences and lists remain normal links. The thumbnail is loaded from
YouTube before playback; without JavaScript the card links directly to YouTube.

Markdown tables automatically get a horizontally scrollable wrapper. For raw
HTML tables, add `<div class="article-table-wrapper" tabindex="0">` around the
table so it also scrolls on narrow screens.

The site publishes an RSS feed, `robots.txt`, `llms.txt`, and an XML sitemap.
Update the site URL in `astro.config.mjs` and `src/data/site.ts` together if the
canonical domain changes.
