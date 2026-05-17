import type { ProjectScreenshot } from './screenshot-types';
import andinoCheckpoint from '../assets/andino/andino-checkpoint.png';
import andinoMap from '../assets/andino/andino-map.png';

export const andinoScreenshots: ProjectScreenshot[] = [
  {
    id: 'map',
    src: andinoMap,
    captionKey: 'research.projects.andino.shot.map',
    featured: true,
  },
  {
    id: 'checkpoint',
    src: andinoCheckpoint,
    captionKey: 'research.projects.andino.shot.checkpoint',
  },
];
