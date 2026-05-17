type TrackProps = Record<string, string>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: TrackProps }) => void;
    umami?: { track: (event: string, data?: TrackProps) => void };
  }
}

function trackEvent(name: string, props?: TrackProps) {
  if (typeof window.plausible === 'function') {
    window.plausible(name, props ? { props } : undefined);
  }
  if (typeof window.umami?.track === 'function') {
    window.umami.track(name, props);
  }
}

function propsFromElement(el: Element): TrackProps | undefined {
  const props: TrackProps = {};
  for (const attr of el.attributes) {
    if (!attr.name.startsWith('data-track-') || attr.name === 'data-track-event') {
      continue;
    }
    const key = attr.name.slice('data-track-'.length);
    if (key) props[key] = attr.value;
  }
  return Object.keys(props).length > 0 ? props : undefined;
}

/** Eventos en enlaces/botones con data-track-event y data-track-* opcionales */
export function initAnalyticsClickTracking() {
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const el = target.closest('[data-track-event]');
    if (!el) return;

    const name = el.getAttribute('data-track-event');
    if (!name) return;

    trackEvent(name, propsFromElement(el));
  });
}

/** Paneles <details> de investigación — abrir / cerrar */
export function initProjectPanelTracking() {
  document.querySelectorAll<HTMLDetailsElement>('[data-project-panel]').forEach((panel) => {
    panel.addEventListener('toggle', () => {
      const project = panel.getAttribute('data-track-project');
      if (!project) return;

      const variant = panel.getAttribute('data-track-variant') ?? 'compact';
      const action = panel.open ? 'open' : 'close';

      trackEvent('Project Panel', {
        project,
        variant,
        action,
      });
    });
  });
}
