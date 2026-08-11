import type { APIRoute } from 'astro';
import {
  createAdminSessionCookie,
  verifyAdminPassword,
} from '../../../lib/admin-auth';
import { isHttpsRequest } from '../../../lib/crypto-safe';
import { env } from '../../../lib/env';
import { clientIp, consumeRateLimit, resetRateLimit } from '../../../lib/rate-limit';

export const prerender = false;

const LOGIN_LIMIT = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

export const POST: APIRoute = async ({ request }) => {
  if (!env('ADMIN_PASSWORD') || !env('ADMIN_SECRET')) {
    console.error('Admin login failed: ADMIN_PASSWORD / ADMIN_SECRET not set');
    return Response.redirect(new URL('/admin/login?error=config', request.url), 302);
  }

  const ip = clientIp(request);
  const limitKey = `admin-login:${ip}`;
  const limited = consumeRateLimit(limitKey, LOGIN_LIMIT, LOGIN_WINDOW_MS);
  if (!limited.ok) {
    return Response.redirect(new URL('/admin/login?error=rate', request.url), 302);
  }

  const form = await request.formData();
  const password = String(form.get('password') ?? '');

  if (!verifyAdminPassword(password)) {
    return Response.redirect(new URL('/admin/login?error=1', request.url), 302);
  }

  resetRateLimit(limitKey);

  try {
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/admin',
        'Set-Cookie': createAdminSessionCookie(isHttpsRequest(request)),
      },
    });
  } catch (error) {
    console.error('Admin session cookie failed', error);
    return Response.redirect(new URL('/admin/login?error=config', request.url), 302);
  }
};
