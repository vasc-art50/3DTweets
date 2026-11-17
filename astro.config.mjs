// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';
import { markdownFigurePlugin } from './src/utils/markdown-figures.mjs';

/** @type {import('astro').AstroIntegration} */
const markdownFigures = {
  name: 'markdown-figures',
  hooks: {
    'astro:config:setup': ({ config }) => {
      const processor = config.markdown.processor;
      if (
        processor.name !== 'satteri' ||
        !('hastPlugins' in processor.options) ||
        !Array.isArray(processor.options.hastPlugins)
      ) {
        throw new Error('Markdown figure captions require Astro’s Sätteri processor.');
      }
      processor.options.hastPlugins.push(markdownFigurePlugin);
    },
  },
};

// https://astro.build/config
export default defineConfig({
  site: 'https://3dtweets.com',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'cs'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    markdownFigures,
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', cs: 'cs' },
      },
    }),
    pagefind(),
  ],
  vite: {
    server: {
      watch: {
        usePolling: true,
        interval: 1000,
        ignored: ['**/node_modules/**', '**/.git/**', '**/dist/**', '**/.astro/**'],
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['if-function'],
        },
      },
    },
  },
});