// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://3dtweets.com',
  integrations: [sitemap()],
  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
    css: {
      preprocessorOptions: {
        // Bulma 1.0.4 still uses the legacy Sass if() function; silence the
        // dependency warning without hiding warnings from our own styles.
        scss: {
          silenceDeprecations: ['if-function'],
        },
      },
    },
  },
});
