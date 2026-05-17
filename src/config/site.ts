export type ProjectStatus = 'live' | 'poc' | 'experiment';

export type Project = {
  id: string;
  status: ProjectStatus;
  href: string;
  githubHref?: string;
  subscribeHref?: string;
  featured?: boolean;
};

/** URLs globales — actualiza según evolucione el ecosistema */
export const siteConfig = {
  siteUrl: 'https://peranto.app',
  ghostUrl: import.meta.env.PUBLIC_GHOST_URL ?? 'https://learn.peranto.app',
  githubOrg: 'https://github.com/cryptohumano',
  email: 'hola@peranto.app',
};
