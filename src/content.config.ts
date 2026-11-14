import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Blog content collection (Content Layer).
 * Posts live as Markdown files in src/content/blog and are rendered by the
 * routes under src/pages/blog/. Extend the schema here whenever a post needs
 * a new frontmatter field (e.g. author, heroImage).
 */
const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  // ISO date string in frontmatter, e.g. 2026-10-21
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: blogSchema,
});

const blogCs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog-cs' }),
  schema: blogSchema,
});

export const collections = { blog, blogCs };
