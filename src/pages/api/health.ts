import type { APIRoute } from 'astro';
import { env } from '../../lib/env';
import { getPrisma } from '../../lib/db';

export const prerender = false;

export const GET: APIRoute = async () => {
  const hasDbUrl = Boolean(env('DATABASE_URL'));
  const adminConfigured = Boolean(env('ADMIN_PASSWORD') && env('ADMIN_SECRET'));
  const telegramConfigured = Boolean(env('TELEGRAM_BOT_TOKEN') && env('TELEGRAM_CHAT_ID'));

  let dbOk = false;
  let schemaOk = false;
  let leadCount: number | null = null;
  let dbError: string | null = null;
  let schemaError: string | null = null;

  if (hasDbUrl) {
    try {
      await getPrisma().$queryRaw`SELECT 1`;
      dbOk = true;
    } catch (error) {
      dbError = error instanceof Error ? error.message : String(error);
      console.error('Health DB check failed', dbError);
    }

    if (dbOk) {
      try {
        leadCount = await getPrisma().lead.count();
        schemaOk = true;
      } catch (error) {
        schemaError = error instanceof Error ? error.message : String(error);
        console.error('Health schema check failed', schemaError);
      }
    }
  }

  const ok = dbOk && schemaOk && adminConfigured;
  const body = {
    ok,
    databaseUrlConfigured: hasDbUrl,
    db: dbOk ? 'up' : 'down',
    schema: schemaOk ? 'up' : 'down',
    leadCount,
    adminConfigured,
    telegramConfigured,
    telegramWebhookSecretConfigured: Boolean(env('TELEGRAM_WEBHOOK_SECRET')),
    ...(dbError ? { dbError } : {}),
    ...(schemaError ? { schemaError } : {}),
  };

  return new Response(JSON.stringify(body), {
    status: ok ? 200 : 503,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
};
