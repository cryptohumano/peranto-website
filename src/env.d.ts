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
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
