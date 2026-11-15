import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Shared English and Czech blog content schema (Content Layer).
 * Extend the schema here whenever a post needs a new frontmatter field.
 */
const blogFields = {
  title: z.string(),
  description: z.string(),
  // ISO date string in frontmatter, e.g. 2026-10-21
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  category: z.enum(['projects', 'our-models', 'showcase']).default('projects'),
  printablesUrl: z.string().url().optional(),
  author: z.string().optional(),
  printSpecs: z
    .object({
      material: z.string().optional(),
      layerHeight: z.string().optional(),
      infill: z.string().optional(),
      supports: z.string().optional(),
    })
    .optional(),
};

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      ...blogFields,
      heroImage: image().optional(),
      galleryFolder: z.string().optional(),
      gallery: z.array(image()).optional(),
    }),
});

const blogCs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog-cs' }),
  schema: ({ image }) =>
    z.object({
      ...blogFields,
      heroImage: image().optional(),
      galleryFolder: z.string().optional(),
      gallery: z.array(image()).optional(),
    }),
});

export const collections = { blog, blogCs };
