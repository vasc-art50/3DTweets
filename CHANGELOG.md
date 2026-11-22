# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

### Added

- English translations of the six-part TweetONE build series.
- Click-to-play YouTube video cards for standalone links in Markdown articles.
- Complete Czech-language site under `/cs/`, including localized navigation,
  page metadata, translated service content and blog articles, language
  switching, and `hreflang` alternates.
- Dark / light mode with a navbar toggle; preference persisted in
  `localStorage` and inferred from `prefers-color-scheme` on first visit.
- Client-side page navigation with fade transitions via Astro
  `<ClientRouter />` (scripts use document-level event delegation so burger and
  theme toggle survive SPA transitions).
- Core site pages: Home, About, Services, Blog, Contact, and custom 404, with
  English and Czech routes.
- Blog backed by Astro Content Collections with project articles in English and
  Czech and an auto-generated RSS feed.
- SEO: canonical URLs, Open Graph (`website`/`article`), JSON-LD
  (`Organization`/`ProfessionalService`, `BlogPosting`, and model metadata),
  sitemap, `robots.txt`, and `llms.txt`.
- `prefers-reduced-motion` support for all animations and transitions.
- Accessibility: skip-to-content link, `aria-current` on the active nav item,
  visible `:focus-visible` styles, form labels with `required`/`autocomplete`,
  semantic landmarks and heading order.
- Performance: Bulma imported module-by-module (CSS reduced from ~690 KB to
  ~415 KB raw / ~44 KB gzip) instead of the full barrel.
- Home page "Latest articles" section showing the three most recent blog posts.
- Full article typography for blog posts (paragraphs, lists, headings,
  blockquote, code) and whole-card clickable blog cards (stretched link).
- TweetONE documentation split into seven editable Markdown sections per
  language, with structured cards and references configured in Pages CMS.
- TweetONE blog category, including localized labels and category filtering.
- Markdown images in blog and TweetONE content displayed in themed cards, with
  image titles rendered as captions.

### Changed

- Unified responsive hero and section heading sizes in EN/CZ, reduced hero
  spacing, and added localized `PROJECT JOURNAL` category navigation to article
  pages. Blog category filters now clear the query parameter when reset.
- Redesigned the English and Czech blog indexes as compact, filterable news
  feeds with category shortcuts, and improved article typography and bylines.
- Moved the localized blog journal title and category pills into a compact,
  full-width banner above article details.
- Improved inline code and responsive Markdown table readability in both themes.
- Lightened image backdrops in light mode while preserving the dark theme.
- Restored theme-aware ambient backdrops for blog lead images and responsive
  carousel styling for article galleries.
- Connected the Czech TweetONE build articles with a series index and chapter navigation.
- Markdown code blocks now use neutral, theme-aware boxes without syntax highlighting.
- Reworked the starter into a 3D design and printing portfolio, with a bold
  dark theme, adaptive light theme, and orange accent.
- Inter loaded from Google Fonts with a non-blocking async pattern
  (preconnect + preload + `media="print" onload`).
- Navbar burger rendered as a native `<button>` with correct `aria-expanded`
  state; theme toggle and menu use event delegation.
- Contact form replaced the old light-theme styling; still fully static
  (composes a `mailto:` to `site.email`).

### Fixed

- Restored accent-colored inline code and reduced desktop table overflow.
- Corrected the escaped Services ampersand and repaired `.gitignore` so its
  video exclusions work without ignoring all new files.

- Improved readability and hover feedback for outlined pricing-plan buttons.
- Theme resetting to light after client-side navigation — re-applied on
  `astro:page-load`.
- Theme toggle and burger listeners being lost after SPA navigation.
- `has-text-white` usages that would be invisible in light mode.

### Security

- Security response headers via `public/_headers` (CSP, HSTS,
  X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy).
- Expanded `.gitignore` coverage for environment files (`.env.*`).