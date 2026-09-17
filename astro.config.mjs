// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://peranto.app',
  output: 'server',
  server: {
    host: '0.0.0.0',
  },
  security: {
    allowedDomains: [
      { hostname: 'localhost' },
      { hostname: '127.0.0.1' },
      { hostname: '**.up.railway.app', protocol: 'https' },
      { hostname: 'peranto.app', protocol: 'https' },
      { hostname: 'www.peranto.app', protocol: 'https' },
    ],
  },
  adapter: node({
    mode: 'standalone',
  }),
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    // Manual: permite /admin fuera de locales (ver src/middleware.ts)
    routing: 'manual',
  },
  redirects: {
    '/': '/es/',
    // Atajos estables para Chrome Web Store / AMO
    '/aura/privacidad': '/es/aura/privacidad',
    '/aura/privacy': '/en/aura/privacy',
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es',
          en: 'en',
        },
      },
      filter: (page) => {
        const path = new URL(page).pathname;
        if (path.includes('/api/') || path.includes('/admin')) return false;
        return (
          path === '/es/' ||
          path === '/en/' ||
          path === '/es/contacto' ||
          path === '/en/contacto' ||
          path === '/es/contacto/' ||
          path === '/en/contacto/' ||
          path === '/es/aura/privacidad' ||
          path === '/en/aura/privacy' ||
          path === '/es/aura/privacidad/' ||
          path === '/en/aura/privacy/'
        );
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
