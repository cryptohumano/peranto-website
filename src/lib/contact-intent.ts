import type { Lang } from '../i18n/ui';

const INTERESTS = [
  'criteria',
  'lumo',
  'research',
  'support',
  'identity',
  'otro',
] as const;
export type ContactInterest = (typeof INTERESTS)[number];

export function isContactInterest(value: string | null | undefined): value is ContactInterest {
  return Boolean(value && (INTERESTS as readonly string[]).includes(value));
}

export function contactPath(lang: Lang): string {
  return `/${lang}/contacto`;
}

export function buildContactHref(
  lang: Lang,
  input: {
    interest?: ContactInterest | string;
    topic?: string;
    ref?: string;
    path?: string;
  } = {},
): string {
  const params = new URLSearchParams();
  if (input.interest) params.set('interest', input.interest);
  if (input.topic) params.set('topic', input.topic);
  if (input.ref) params.set('ref', input.ref);
  if (input.path) params.set('path', input.path);
  const qs = params.toString();
  const base = contactPath(lang);
  return qs ? `${base}?${qs}` : base;
}

export function buildPrefillMessage(
  lang: Lang,
  input: {
    topic?: string | null;
    ref?: string | null;
    path?: string | null;
  },
): string {
  const topic = input.topic?.trim();
  if (!topic) return '';

  const pathLine = input.path ? `\n\n${lang === 'es' ? 'Página' : 'Page'}: ${input.path}` : '';

  if (lang === 'en') {
    return (
      `Hello — I was looking at «${topic}» on Peranto and would like to connect.` +
      `\n\nSpecifically, I'd like to talk about: ` +
      pathLine
    );
  }

  return (
    `Hola — estaba revisando «${topic}» en Peranto y me interesa conectar.` +
    `\n\nEn concreto, me gustaría hablar sobre: ` +
    pathLine
  );
}

export function parseContactPrefill(lang: Lang, searchParams: URLSearchParams) {
  const interestRaw = searchParams.get('interest');
  const interest = isContactInterest(interestRaw) ? interestRaw : '';
  const topic = searchParams.get('topic')?.trim() || '';
  const ref = searchParams.get('ref')?.trim() || '';
  const path = searchParams.get('path')?.trim() || '';
  const message = buildPrefillMessage(lang, { topic, ref, path });

  return { interest, topic, ref, path, message };
}
