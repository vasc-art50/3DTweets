import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeMdbook from 'starlight-theme-mdbook';

export default defineConfig({
  site: 'https://yourdomain.com',
  plugins: [
    starlight({
      title: 'My Web',
      plugins: [
        starlightThemeMdbook(),
      ],
      sidebar: [
        { label: 'O nás', slug: 'o-nas' },
        { label: 'Oblíbené modely', slug: 'oblibene-modely' },
      ],
    }),
  ],
});