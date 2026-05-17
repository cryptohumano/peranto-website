import type { ProjectScreenshot } from './screenshot-types';
import emergencyDetail from '../assets/emergency/emergency-detail.png';
import emergencyList from '../assets/emergency/emergency-list.png';
import emergencyRadio from '../assets/emergency/emergency-radio.png';
import emergencyUnlock from '../assets/emergency/emergency-unlock.png';

export const emergencyScreenshots: ProjectScreenshot[] = [
  {
    id: 'radio',
    src: emergencyRadio,
    captionKey: 'research.projects.emergency.shot.radio',
    featured: true,
  },
  {
    id: 'list',
    src: emergencyList,
    captionKey: 'research.projects.emergency.shot.list',
  },
  {
    id: 'detail',
    src: emergencyDetail,
    captionKey: 'research.projects.emergency.shot.detail',
  },
  {
    id: 'unlock',
    src: emergencyUnlock,
    captionKey: 'research.projects.emergency.shot.unlock',
  },
];
