import { defineMiddleware, sequence } from 'astro:middleware';
import { middleware as i18nMiddleware } from 'astro:i18n';
import { isAdminAuthenticated } from './lib/admin-auth';

/** Gate /admin* y /api/admin* (excepto login). */
const adminGate = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  const isAdminUi = pathname.startsWith('/admin');
  const isAdminApi = pathname.startsWith('/api/admin');

  if (!isAdminUi && !isAdminApi) {
    return next();
  }

  if (pathname === '/admin/login' || pathname === '/api/admin/login') {
    return next();
  }

  if (!isAdminAuthenticated(context.request.headers.get('cookie'))) {
    if (isAdminApi) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return context.redirect('/admin/login');
  }

  try {
    return await next();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Admin route failed', pathname, message);
    return new Response(
      `<!doctype html><html lang="es"><meta charset="utf-8"/><title>Error admin</title>
      <body style="font-family:system-ui;padding:2rem">
      <h1>Error en admin</h1>
      <p>Revisa Deploy Logs. Detalle:</p>
      <pre style="white-space:pre-wrap;background:#f5f5f5;padding:1rem">${message.replaceAll('<', '&lt;')}</pre>
      <p><a href="/api/health">/api/health</a> · <a href="/admin/login">Volver al login</a></p>
      </body></html>`,
      { status: 500, headers: { 'Content-Type': 'text/html; charset=utf-8' } },
    );
  }
});

/**
 * i18n automático, pero sin tocar /admin ni /api
 * (routing: "manual" en astro.config).
 */
const localeGate = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_')
  ) {
    return next();
  }
  return i18nMiddleware({
    prefixDefaultLocale: true,
    redirectToDefaultLocale: true,
  })(context, next);
});

export const onRequest = sequence(adminGate, localeGate);
