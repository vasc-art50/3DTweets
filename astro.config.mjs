import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: '3DTweets',
      locales: {
        root: { label: 'Čeština', lang: 'cs' },
      },
      pagefind: false,
      pagination: false,
      customCss: ['./src/styles/site.css'],
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