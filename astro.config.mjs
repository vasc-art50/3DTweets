import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://www.3dtweets.com',
  integrations: [
    starlight({
      title: '3DTweets',
      locales: {
        root: { label: 'Čeština', lang: 'cs' },
      },
      pagefind: false,
      pagination: false,
      head: [
        { tag: 'link', attrs: { rel: 'stylesheet', href: '/site.css' } },
      ],
      components: {
        Header: './src/components/SiteHeader.astro',
      },
      sidebar: [
        {
          label: 'Obsah',
          items: [{ autogenerate: { directory: '/' } }],
        },
      ],
    }),
  ],
});