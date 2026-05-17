import type { Lang } from '../i18n/ui';
import { siteConfig } from '../config/site';

/** Configuración SEO central — dominio principal (no Ghost) */
export const seoConfig = {
  siteName: 'Peranto',
  locale: { es: 'es_MX', en: 'en_US' } as const satisfies Record<Lang, string>,
  ogImagePath: '/og.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  themeColor: '#0a1018',
  twitterCard: 'summary_large_image' as const,
  /** Feed RSS del laboratorio Ghost (subdominio) */
  ghostRssPath: '/rss/',
};

export function absoluteUrl(path: string, site = siteConfig.siteUrl): string {
  return new URL(path, site).href;
}

export function ghostRssUrl(): string | undefined {
  const base = import.meta.env.PUBLIC_GHOST_URL;
  if (!base) return undefined;
  return absoluteUrl(seoConfig.ghostRssPath, base.replace(/\/$/, ''));
}

export function googleSiteVerification(): string | undefined {
  const token = import.meta.env.PUBLIC_GOOGLE_SITE_VERIFICATION;
  return token?.trim() || undefined;
}
