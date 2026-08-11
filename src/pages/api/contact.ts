import type { APIRoute } from 'astro';
import { env } from '../../lib/env';
import {
  channelLabel,
  createLead,
  normalizePhone,
  parseContactChannel,
} from '../../lib/leads';
import { leadNotifyButtons, notifyTelegramBackground } from '../../lib/telegram';
import { clientIp, consumeRateLimit } from '../../lib/rate-limit';

export const prerender = false;

function resolveLang(raw: string): 'es' | 'en' {
  return raw.trim().toLowerCase() === 'en' ? 'en' : 'es';
}

function contactRedirect(lang: 'es' | 'en', query: string) {
  return `/${lang}/contacto?${query}`;
}

export const POST: APIRoute = async ({ request, redirect }) => {
  const ip = clientIp(request);
  const limited = consumeRateLimit(`contact:${ip}`, 8, 60_000);
  if (!limited.ok) {
    return new Response('Too Many Requests', {
      status: 429,
      headers: { 'Retry-After': String(limited.retryAfterSec) },
    });
  }

  const form = await request.formData();
  const lang = resolveLang(String(form.get('lang') ?? 'es'));
  const name = String(form.get('name') ?? '').trim();
  const email = String(form.get('email') ?? '').trim();
  const company = String(form.get('company') ?? '').trim();
  const phoneRaw = String(form.get('phone') ?? '').trim();
  const interest = String(form.get('interest') ?? '').trim();
  const message = String(form.get('message') ?? '').trim();
  const topic = String(form.get('topic') ?? '').trim();
  const sourcePath = String(form.get('sourcePath') ?? '').trim();
  const ref = String(form.get('ref') ?? '').trim();
  const preferredChannel =
    parseContactChannel(String(form.get('preferredChannel') ?? '')) ?? 'WHATSAPP';

  const phone = normalizePhone(phoneRaw);

  if (!name || !email || !message || !phone) {
    return redirect(contactRedirect(lang, 'error=missing'));
  }

  const contextLines = [
    topic ? `Contexto: ${topic}` : '',
    sourcePath ? `Página: ${sourcePath}` : '',
    ref ? `Origen UI: ${ref}` : '',
  ].filter(Boolean);

  const fullMessage =
    contextLines.length > 0 ? `${message}\n\n---\n${contextLines.join('\n')}` : message;

  let leadId: string | null = null;
  try {
    const lead = await createLead({
      name,
      email,
      company,
      phone,
      interest,
      message: fullMessage,
      source: 'CONTACT',
      preferredChannel,
    });
    leadId = lead.id;
  } catch (error) {
    console.error('Lead persist failed', error instanceof Error ? error.message : error);
    notifyTelegramBackground({
      title: 'Contacto web (DB falló) — Peranto',
      lines: [
        `Nombre: ${name}`,
        `Email: ${email}`,
        `Tel: ${phone}`,
        `Canal: ${channelLabel[preferredChannel]}`,
        `Empresa: ${company || '—'}`,
        `Interés: ${interest || '—'}`,
        topic ? `Tema: ${topic}` : '',
        sourcePath ? `Desde: ${sourcePath}` : '',
        '⚠️ No se guardó en DB (revisar DATABASE_URL / migrate)',
        '',
        message,
      ].filter(Boolean),
    buttons: leadNotifyButtons({ phone }),
  });
  return redirect(contactRedirect(lang, 'error=db'));
  }

  const to = env('CONTACT_TO_EMAIL', 'outreach@peranto.app');
  const resendKey = env('RESEND_API_KEY');

  notifyTelegramBackground({
    title: 'Nuevo contacto web — Peranto',
    lines: [
      `Nombre: ${name}`,
      `Email: ${email}`,
      `Tel / WA: ${phone}`,
      `Canal preferido: ${channelLabel[preferredChannel]}`,
      `Empresa: ${company || '—'}`,
      `Interés: ${interest || '—'}`,
      topic ? `Tema: ${topic}` : '',
      sourcePath ? `Desde: ${sourcePath}` : '',
      leadId ? `Lead: ${leadId}` : '',
      '',
      message,
    ].filter(Boolean),
    buttons: leadNotifyButtons({ leadId, phone }),
  });

  if (resendKey) {
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: env('CONTACT_FROM_EMAIL', 'Peranto Web <onboarding@resend.dev>'),
        to: [to],
        replyTo: email,
        subject: topic ? `Contacto web: ${name} — ${topic}` : `Contacto web: ${name}`,
        text: `Nombre: ${name}\nEmail: ${email}\nTel: ${phone}\nCanal: ${channelLabel[preferredChannel]}\nEmpresa: ${company}\nInterés: ${interest}\n\n${fullMessage}`,
      });
    } catch (error) {
      console.error('Contact email failed', error);
      return redirect(contactRedirect(lang, 'enviado=1'));
    }
  }

  return redirect(contactRedirect(lang, 'enviado=1'));
};
