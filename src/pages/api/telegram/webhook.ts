import type { APIRoute } from 'astro';
import { safeEqualString } from '../../../lib/crypto-safe';
import { env } from '../../../lib/env';
import {
  handleTelegramUpdate,
  type TelegramUpdate,
} from '../../../lib/telegram';

export const prerender = false;

/**
 * Telegram Bot webhook.
 * Set with:
 *   curl "https://api.telegram.org/bot$TOKEN/setWebhook" \
 *     -d "url=https://peranto.app/api/telegram/webhook" \
 *     -d "secret_token=$TELEGRAM_WEBHOOK_SECRET"
 */
export const POST: APIRoute = async ({ request }) => {
  const configuredSecret = env('TELEGRAM_WEBHOOK_SECRET');
  if (!configuredSecret) {
    console.error('Telegram webhook rejected: TELEGRAM_WEBHOOK_SECRET not set');
    return new Response('Webhook secret not configured', { status: 503 });
  }

  const header = request.headers.get('x-telegram-bot-api-secret-token') ?? '';
  if (!safeEqualString(header, configuredSecret)) {
    return new Response('Unauthorized', { status: 401 });
  }

  if (!env('TELEGRAM_BOT_TOKEN')) {
    return new Response('Bot not configured', { status: 503 });
  }

  let update: TelegramUpdate;
  try {
    update = (await request.json()) as TelegramUpdate;
  } catch {
    return new Response('Bad Request', { status: 400 });
  }

  try {
    await handleTelegramUpdate(update);
  } catch (error) {
    console.error('Telegram webhook handler failed', error);
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const GET: APIRoute = async () => {
  return new Response('Method Not Allowed', { status: 405 });
};
