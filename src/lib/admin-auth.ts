import { createHmac, timingSafeEqual } from 'node:crypto';
import { safeEqualString } from './crypto-safe';
import { env } from './env';

const COOKIE_NAME = 'peranto_admin';
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSecret() {
  const secret = env('ADMIN_SECRET');
  if (!secret) {
    throw new Error('ADMIN_SECRET is not set');
  }
  return secret;
}

function getPassword() {
  return env('ADMIN_PASSWORD');
}

function sign(value: string) {
  return createHmac('sha256', getSecret()).update(value).digest('hex');
}

export function verifyAdminPassword(password: string) {
  const expected = getPassword();
  if (!expected || !password) return false;
  return safeEqualString(password, expected);
}

/** Defense-in-depth for /api/admin handlers (middleware also gates these). */
export function guardAdminRequest(request: Request): Response | null {
  if (isAdminAuthenticated(request.headers.get('cookie'))) return null;
  return new Response(JSON.stringify({ error: 'Unauthorized' }), {
    status: 401,
    headers: { 'Content-Type': 'application/json' },
  });
}

export function createAdminSessionCookie(secure = true) {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS;
  const payload = `admin:${exp}`;
  const token = `${payload}.${sign(payload)}`;
  const securePart = secure ? '; Secure' : '';
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${MAX_AGE_SECONDS}${securePart}`;
}

export function clearAdminSessionCookie() {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

export function isAdminAuthenticated(cookieHeader: string | null): boolean {
  if (!cookieHeader) return false;
  try {
    getSecret();
  } catch {
    return false;
  }

  const match = cookieHeader.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  if (!match) return false;

  const token = match[1];
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;

  const expected = sign(payload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

  const [, expRaw] = payload.split(':');
  const exp = Number(expRaw);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return false;

  return true;
}
