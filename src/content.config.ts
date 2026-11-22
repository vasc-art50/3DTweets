import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { BLOG_CATEGORIES, DEFAULT_BLOG_AUTHOR } from './utils/blog';

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
  category: z.enum(BLOG_CATEGORIES).default('projects'),
  printablesUrl: z.string().url().optional(),
  author: z.string().default(DEFAULT_BLOG_AUTHOR),
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

const tweetoneCard = z.object({
  eyebrow: z.string().optional(),
  title: z.string().optional(),
  date: z.string().optional(),
  text: z.string().optional(),
  cause: z.string().optional(),
  fix: z.string().optional(),
  fixPrefix: z.string().optional(),
  inlineCode: z.string().optional(),
  fixSuffix: z.string().optional(),
  items: z.array(z.string()).optional(),
  code: z.string().optional(),
  column: z.enum(['is-6', 'is-12']).default('is-6'),
});

const tweetone = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tweetone' }),
  schema: ({ image }) =>
    z.object({
      eyebrow: z.string(),
      title: z.string(),
      order: z.number().int().positive(),
      altBackground: z.boolean().default(false),
      heroImage: image().optional(),
      galleryFolder: z.string().optional(),
      gallery: z.array(image()).optional(),
      specs: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
      layout: z.enum(['overview', 'setup', 'hardware', 'cards', 'reference']).optional(),
      highlightBox: z
        .object({
          eyebrow: z.string(),
          goal: z.string(),
          experiment: z.string(),
          result: z.string(),
        })
        .optional(),
      cards: z.array(tweetoneCard).optional(),
      links: z
        .array(
          z.object({
            label: z.string(),
            url: z.url(),
          }),
        )
        .optional(),
    }),
});

export const collections = { blog, blogCs, tweetone };
