export type AnalyticsProvider = 'plausible' | 'umami';

export type AnalyticsConfig =
  | {
      provider: 'plausible';
      domain: string;
      scriptUrl: string;
    }
  | {
      provider: 'umami';
      websiteId: string;
      scriptUrl: string;
    };

const DEFAULT_PLAUSIBLE_SCRIPT =
  'https://plausible.io/js/script.outbound-links.tagged-events.js';

const DEFAULT_UMAMI_SCRIPT = 'https://cloud.umami.is/script.js';

/** Configuración desde variables PUBLIC_* — sin script si no hay proveedor */
export function getAnalyticsConfig(): AnalyticsConfig | null {
  const raw = import.meta.env.PUBLIC_ANALYTICS_PROVIDER?.trim().toLowerCase();

  if (raw === 'plausible') {
    const domain =
      import.meta.env.PUBLIC_PLAUSIBLE_DOMAIN?.trim() || 'peranto.app';
    const scriptUrl =
      import.meta.env.PUBLIC_PLAUSIBLE_SCRIPT_URL?.trim() ||
      DEFAULT_PLAUSIBLE_SCRIPT;
    return { provider: 'plausible', domain, scriptUrl };
  }

  if (raw === 'umami') {
    const websiteId = import.meta.env.PUBLIC_UMAMI_WEBSITE_ID?.trim();
    if (!websiteId) return null;
    const scriptUrl =
      import.meta.env.PUBLIC_UMAMI_SCRIPT_URL?.trim() || DEFAULT_UMAMI_SCRIPT;
    return { provider: 'umami', websiteId, scriptUrl };
  }

  return null;
}

export function isAnalyticsEnabled(): boolean {
  return getAnalyticsConfig() !== null;
}
