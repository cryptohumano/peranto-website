import { setDefaultResultOrder } from 'node:dns';
import { Agent, fetch as undiciFetch } from 'undici';
import { env } from './env';
import {
  getLeadStats,
  listLeads,
  statusLabel,
  whatsappHref,
} from './leads';

// Railway / some clouds time out on IPv6 to api.telegram.org
try {
  setDefaultResultOrder('ipv4first');
} catch {
  // ignore older runtimes
}

const ipv4Agent = new Agent({
  connect: { family: 4, timeout: 8_000 },
});

export type InlineButton = {
  text: string;
  url?: string;
  callback_data?: string;
};

export type NotifyPayload = {
  title: string;
  lines: string[];
  buttons?: InlineButton[][];
};

const TELEGRAM_TIMEOUT_MS = 8_000;
const TELEGRAM_RETRIES = 2;

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

export function siteBaseUrl(): string {
  const raw =
    env('PUBLIC_SITE_URL') ||
    env('SITE_URL') ||
    'https://peranto.app';
  return raw.replace(/\/$/, '');
}

export function adminLeadUrl(leadId: string): string {
  return `${siteBaseUrl()}/admin/leads/${leadId}`;
}

/** Accepts one or many IDs: "123" or "123, 456" or "123;456" */
export function parseTelegramChatIds(raw: string): string[] {
  return raw
    .split(/[,;\s]+/)
    .map((id) => id.trim())
    .filter(Boolean);
}

export function authorizedTelegramChatIds(): string[] {
  return parseTelegramChatIds(env('TELEGRAM_CHAT_ID') || env('TELEGRAM_CHAT_IDS'));
}

export function isAuthorizedTelegramChat(chatId: string | number): boolean {
  const allowed = authorizedTelegramChatIds();
  if (allowed.length === 0) return false;
  return allowed.includes(String(chatId));
}

function buildInlineKeyboard(buttons?: InlineButton[][]) {
  if (!buttons?.length) return undefined;
  return {
    inline_keyboard: buttons.map((row) =>
      row.map((btn) =>
        btn.url
          ? { text: btn.text, url: btn.url }
          : { text: btn.text, callback_data: btn.callback_data ?? 'noop' },
      ),
    ),
  };
}

async function telegramApi(
  token: string,
  method: string,
  body: Record<string, unknown>,
): Promise<boolean> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TELEGRAM_TIMEOUT_MS);

  try {
    const response = await undiciFetch(`https://api.telegram.org/bot${token}/${method}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      dispatcher: ipv4Agent,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error(`Telegram ${method} failed`, response.status, detail);
      return false;
    }

    return true;
  } finally {
    clearTimeout(timer);
  }
}

async function sendWithRetry(
  token: string,
  chatId: string,
  text: string,
  buttons?: InlineButton[][],
): Promise<boolean> {
  const payload: Record<string, unknown> = {
    chat_id: chatId,
    text,
    parse_mode: 'HTML',
    disable_web_page_preview: true,
  };
  const keyboard = buildInlineKeyboard(buttons);
  if (keyboard) payload.reply_markup = keyboard;

  for (let attempt = 1; attempt <= TELEGRAM_RETRIES; attempt++) {
    try {
      const ok = await telegramApi(token, 'sendMessage', payload);
      if (ok) return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`Telegram notify error (attempt ${attempt}/${TELEGRAM_RETRIES})`, chatId, message);
    }
    if (attempt < TELEGRAM_RETRIES) {
      await new Promise((r) => setTimeout(r, 400 * attempt));
    }
  }
  return false;
}

export async function sendTelegramChat(
  chatId: string | number,
  text: string,
  buttons?: InlineButton[][],
): Promise<boolean> {
  const token = env('TELEGRAM_BOT_TOKEN');
  if (!token) return false;
  return sendWithRetry(token, String(chatId), text, buttons);
}

export async function notifyTelegram({ title, lines, buttons }: NotifyPayload): Promise<boolean> {
  const token = env('TELEGRAM_BOT_TOKEN');
  const chatIds = authorizedTelegramChatIds();

  if (!token || chatIds.length === 0) {
    console.info('Telegram skip (missing TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID):', title);
    return false;
  }

  const body = [
    `<b>${escapeHtml(title)}</b>`,
    '',
    ...lines.map((line) => escapeHtml(line)),
  ].join('\n');

  const results = await Promise.all(
    chatIds.map((chatId) => sendWithRetry(token, chatId, body, buttons)),
  );

  return results.some(Boolean);
}

/** Fire-and-forget: never blocks the HTTP response. */
export function notifyTelegramBackground(payload: NotifyPayload): void {
  void notifyTelegram(payload).catch((error) => {
    console.error('Telegram background notify failed', error);
  });
}

/** WhatsApp + link al CRM admin. */
export function leadNotifyButtons(opts: {
  leadId?: string | null;
  phone?: string | null;
}): InlineButton[][] {
  const row: InlineButton[] = [];
  const wa = whatsappHref(opts.phone);
  if (wa) row.push({ text: 'WhatsApp', url: wa });
  if (opts.leadId) row.push({ text: 'Abrir en CRM', url: adminLeadUrl(opts.leadId) });
  return row.length ? [row] : [];
}

export async function formatResumenCommand(): Promise<string> {
  const stats = await getLeadStats();
  const byStatus = Object.fromEntries(
    stats.byStatus.map((row) => [row.status, row._count._all]),
  ) as Record<string, number>;

  const lines = [
    '<b>Resumen CRM — Peranto</b>',
    '',
    `Total leads: <b>${stats.total}</b>`,
    `Últimos 7 días: <b>${stats.recent}</b>`,
    '',
    '<b>Por etapa</b>',
    ...Object.entries(statusLabel).map(
      ([key, label]) => `· ${escapeHtml(label)}: ${byStatus[key] ?? 0}`,
    ),
    '',
    `<a href="${escapeHtml(siteBaseUrl() + '/admin')}">Abrir admin</a>`,
  ];

  return lines.join('\n');
}

export async function formatNuevosCommand(limit = 5): Promise<string> {
  const leads = await listLeads({ take: limit });
  if (leads.length === 0) {
    return '<b>Últimos leads</b>\n\nNo hay leads todavía.';
  }

  const blocks = leads.map((lead, index) => {
    const name = escapeHtml(lead.name || lead.email);
    const phone = lead.phone ? escapeHtml(lead.phone) : '—';
    const interest = escapeHtml(lead.interest || '—');
    const stage = escapeHtml(statusLabel[lead.status] ?? lead.status);
    const when = escapeHtml(lead.createdAt.toLocaleString('es-MX'));
    const link = adminLeadUrl(lead.id);
    return [
      `<b>${index + 1}. ${name}</b>`,
      `Tel: ${phone}`,
      `Interés: ${interest}`,
      `Etapa: ${stage}`,
      `Fecha: ${when}`,
      `<a href="${escapeHtml(link)}">Ver en CRM</a>`,
    ].join('\n');
  });

  return [`<b>Últimos ${leads.length} leads</b>`, '', ...blocks].join('\n\n');
}

export function formatHelpCommand(): string {
  return [
    '<b>Comandos Peranto</b>',
    '',
    '/resumen — totales y conteo por etapa',
    '/nuevos — últimos 5 leads',
    '/help — esta ayuda',
    '',
    'Solo chats autorizados (TELEGRAM_CHAT_ID) pueden usar el bot.',
  ].join('\n');
}

export type TelegramUpdate = {
  update_id?: number;
  message?: {
    message_id?: number;
    text?: string;
    chat?: { id?: number };
  };
  callback_query?: {
    id?: string;
    data?: string;
    message?: { chat?: { id?: number } };
  };
};

export async function handleTelegramUpdate(update: TelegramUpdate): Promise<void> {
  const chatId =
    update.message?.chat?.id ?? update.callback_query?.message?.chat?.id ?? null;

  if (chatId == null) return;

  if (!isAuthorizedTelegramChat(chatId)) {
    await sendTelegramChat(
      chatId,
      'No autorizado. Este bot solo responde a chats configurados en Peranto.',
    );
    return;
  }

  if (update.callback_query?.id) {
    const token = env('TELEGRAM_BOT_TOKEN');
    if (token) {
      await telegramApi(token, 'answerCallbackQuery', {
        callback_query_id: update.callback_query.id,
      });
    }
  }

  const text = (update.message?.text ?? '').trim();
  if (!text.startsWith('/')) return;

  const command = text.split(/\s+/)[0]?.split('@')[0]?.toLowerCase() ?? '';

  if (command === '/start' || command === '/help') {
    await sendTelegramChat(chatId, formatHelpCommand());
    return;
  }

  if (command === '/resumen') {
    await sendTelegramChat(chatId, await formatResumenCommand());
    return;
  }

  if (command === '/nuevos') {
    await sendTelegramChat(chatId, await formatNuevosCommand(5));
    return;
  }

  await sendTelegramChat(
    chatId,
    `Comando no reconocido: <code>${escapeHtml(command)}</code>\n\n${formatHelpCommand()}`,
  );
}
