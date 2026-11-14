import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../../data/site';

export async function GET(context: APIContext) {
  const posts = await getCollection('blogCs');

  return rss({
    title: `${site.name} – Blog`,
    description: 'Praktické poznámky k 3D návrhu, tisku a projektům 3DTweets.',
    site: context.site ?? site.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/cs/blog/${post.id}/`,
    })),
  });
}
