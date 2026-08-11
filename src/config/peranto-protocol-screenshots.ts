import type { ProjectScreenshot } from './screenshot-types';
import perantoCredentials from '../assets/peranto-protocol/peranto-credentials.png';
import perantoEconomia from '../assets/peranto-protocol/peranto-economia.png';
import perantoIdentity from '../assets/peranto-protocol/peranto-identity.png';
import perantoLinktr33 from '../assets/peranto-protocol/peranto-linktr33.png';

export const perantoProtocolScreenshots: ProjectScreenshot[] = [
  {
    id: 'identity',
    src: perantoIdentity,
    captionKey: 'research.projects.peranto-protocol.shot.identity',
    featured: true,
  },
  {
    id: 'linktr33',
    src: perantoLinktr33,
    captionKey: 'research.projects.peranto-protocol.shot.linktr33',
  },
  {
    id: 'credentials',
    src: perantoCredentials,
    captionKey: 'research.projects.peranto-protocol.shot.credentials',
  },
  {
    id: 'economia',
    src: perantoEconomia,
    captionKey: 'research.projects.peranto-protocol.shot.economia',
  },
];
