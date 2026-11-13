/**
 * Global site metadata and navigation.
 */
export const site = {
  name: '3DTweets',
  tagline: 'Design. Print. Build.',
  description:
    '3DTweets creates custom 3D designs, prototypes, and printed parts for makers, product ideas, and practical workshop improvements.',
  email: '3DTweets247@gmail.com',
  address: 'Prague · Czech Republic',
  url: 'https://3dtweets.com',
} as const;

export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];
