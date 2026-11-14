import { getRelativeLocaleUrl } from 'astro:i18n';
import type { Locale } from './ui';

export function getLocale(locale: string | undefined): Locale {
  return locale === 'cs' ? 'cs' : 'en';
}

function stripLocale(pathname: string): string {
  return pathname.replace(/^\/(?:en|cs)(?=\/|$)/, '') || '/';
}

function isLocalizedRoute(pathname: string): boolean {
  const path = stripLocale(pathname).replace(/\/+$/, '') || '/';
  return (
    ['/', '/about', '/services', '/tweetone', '/contact', '/blog'].includes(path) ||
    /^\/blog\/[^/]+$/.test(path)
  );
}

export function localeUrl(locale: Locale, pathname: string): string {
  const path = stripLocale(pathname);
  const cleanPath = path.replace(/^\/+|\/+$/g, '');
  return cleanPath
    ? getRelativeLocaleUrl(locale, cleanPath)
    : getRelativeLocaleUrl(locale);
}

export function localeSwitchUrl(pathname: string, target: Locale): string {
  return localeUrl(target, isLocalizedRoute(pathname) ? pathname : '/');
}

export function alternateLocaleUrls(pathname: string): Record<Locale, string> | undefined {
  if (!isLocalizedRoute(pathname)) return undefined;
  return {
    en: localeUrl('en', pathname),
    cs: localeUrl('cs', pathname),
  };
}
