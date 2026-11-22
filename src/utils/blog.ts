export const DEFAULT_BLOG_AUTHOR = '3DTweet team';

export const BLOG_CATEGORIES = ['projects', 'our-models', 'TweetONE'] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export function getBlogAuthor(author?: string): string {
  return author?.trim() || DEFAULT_BLOG_AUTHOR;
}
