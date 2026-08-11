/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_GHOST_URL?: string;
  readonly GHOST_CONTENT_API_KEY?: string;
  readonly PUBLIC_GOOGLE_SITE_VERIFICATION?: string;
  /** plausible | umami — vacío = desactivado */
  readonly PUBLIC_ANALYTICS_PROVIDER?: string;
  readonly PUBLIC_PLAUSIBLE_DOMAIN?: string;
  readonly PUBLIC_PLAUSIBLE_SCRIPT_URL?: string;
  readonly PUBLIC_UMAMI_WEBSITE_ID?: string;
  readonly PUBLIC_UMAMI_SCRIPT_URL?: string;
  readonly SITE_URL?: string;
  readonly PUBLIC_SITE_URL?: string;
  readonly DATABASE_URL?: string;
  readonly RESEND_API_KEY?: string;
  readonly CONTACT_TO_EMAIL?: string;
  readonly CONTACT_FROM_EMAIL?: string;
  readonly TELEGRAM_BOT_TOKEN?: string;
  readonly TELEGRAM_CHAT_ID?: string;
  readonly TELEGRAM_CHAT_IDS?: string;
  readonly TELEGRAM_WEBHOOK_SECRET?: string;
  readonly ADMIN_PASSWORD?: string;
  readonly ADMIN_SECRET?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
