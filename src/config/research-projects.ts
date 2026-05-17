import type { UIKey } from '../i18n/ui';
import type { Project, ProjectStatus } from './site';

export type ProjectGroupId = 'solidarity' | 'identity' | 'governance' | 'commons' | 'health';

export type ResearchProject = Project & {
  group: ProjectGroupId;
  titleKey: UIKey;
  descKey: UIKey;
  /** Etiqueta en Ghost (slug) para artículos del laboratorio — ej. tag «criteria» */
  ghostTag?: string;
  /** Abierto al cargar la página */
  defaultOpen?: boolean;
  /** Tarjeta ampliada con galería (como CriterIA) */
  showcase?: boolean;
};

export const projectGroups: { id: ProjectGroupId; labelKey: UIKey }[] = [
  { id: 'solidarity', labelKey: 'research.groups.solidarity' },
  { id: 'identity', labelKey: 'research.groups.identity' },
  { id: 'governance', labelKey: 'research.groups.governance' },
  { id: 'commons', labelKey: 'research.groups.commons' },
  { id: 'health', labelKey: 'research.groups.health' },
];

const gh = (repo: string) => `https://github.com/cryptohumano/${repo}`;

/** Proyectos públicos — ordenados dentro de cada grupo */
export const researchProjects: ResearchProject[] = [
  // Destacado (sin grupo en lista)
  {
    id: 'criteria',
    group: 'identity',
    status: 'live',
    featured: true,
    href: 'https://criteria.peranto.app',
    subscribeHref: 'https://criteria.peranto.app',
    githubHref: gh('criteria'),
    ghostTag: 'criteria',
    defaultOpen: true,
    titleKey: 'research.projects.criteria.title',
    descKey: 'research.projects.criteria.desc',
  },
  // Economía solidaria
  {
    id: 'lumo',
    group: 'solidarity',
    status: 'poc',
    showcase: true,
    href: gh('lumo'),
    githubHref: gh('lumo'),
    ghostTag: 'lumo',
    defaultOpen: false,
    titleKey: 'research.projects.lumo.title',
    descKey: 'research.projects.lumo.desc',
  },
  // Identidad e infraestructura
  {
    id: 'auradid',
    group: 'identity',
    status: 'experiment',
    href: gh('auradid'),
    githubHref: gh('auradid'),
    ghostTag: 'auradid',
    titleKey: 'research.projects.auradid.title',
    descKey: 'research.projects.auradid.desc',
  },
  {
    id: 'aura',
    group: 'identity',
    status: 'experiment',
    href: gh('aura-pwa'),
    githubHref: gh('aura-pwa'),
    ghostTag: 'aura',
    titleKey: 'research.projects.aura.title',
    descKey: 'research.projects.aura.desc',
  },
  // Gobernanza
  {
    id: 'yohualli',
    group: 'governance',
    status: 'experiment',
    showcase: true,
    href: 'https://yohualli.up.railway.app/attestations',
    githubHref: gh('Yohualli-Protocol'),
    ghostTag: 'yohualli',
    defaultOpen: false,
    titleKey: 'research.projects.yohualli.title',
    descKey: 'research.projects.yohualli.desc',
  },
  {
    id: 'zkpoll',
    group: 'governance',
    status: 'experiment',
    href: gh('zkPoll-System'),
    githubHref: gh('zkPoll-System'),
    ghostTag: 'zkpoll',
    titleKey: 'research.projects.zkpoll.title',
    descKey: 'research.projects.zkpoll.desc',
  },
  // Bien común / seguridad
  {
    id: 'andino',
    group: 'commons',
    status: 'experiment',
    showcase: true,
    href: 'https://cryptohumano.github.io/andino-wallet-pwa/mountain-logs/0e54f7bf-7fe1-4a4a-b20e-a89f06954d9d',
    githubHref: gh('andino-wallet-pwa'),
    ghostTag: 'andino',
    defaultOpen: false,
    titleKey: 'research.projects.andino.title',
    descKey: 'research.projects.andino.desc',
  },
  {
    id: 'emergency',
    group: 'commons',
    status: 'experiment',
    showcase: true,
    href: 'https://cryptohumano.github.io/emergency-wallet-pwa/emergencies/3a08f6bb-6f16-41cd-8664-9ae7117503ef',
    githubHref: gh('emergency-wallet-pwa'),
    ghostTag: 'emergency',
    defaultOpen: false,
    titleKey: 'research.projects.emergency.title',
    descKey: 'research.projects.emergency.desc',
  },
  // Salud
  {
    id: 'kume',
    group: 'health',
    status: 'experiment',
    href: gh('kume-pwa'),
    githubHref: gh('kume-pwa'),
    ghostTag: 'kume',
    titleKey: 'research.projects.kume.title',
    descKey: 'research.projects.kume.desc',
  },
];

export function projectsForSiteConfig(): Project[] {
  return researchProjects.map(({ group, titleKey, descKey, ...project }) => project);
}

export function showcaseProjects() {
  return researchProjects.filter((p) => p.showcase);
}

export function groupedProjects(excludeFeatured = true) {
  const list = excludeFeatured
    ? researchProjects.filter((p) => !p.featured && !p.showcase)
    : researchProjects;

  return projectGroups
    .map((group) => ({
      ...group,
      projects: list.filter((p) => p.group === group.id),
    }))
    .filter((g) => g.projects.length > 0);
}
