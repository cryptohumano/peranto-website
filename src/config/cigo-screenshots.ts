import type { ProjectScreenshot } from './screenshot-types';
import cigoAccesos from '../assets/cigo/accesos.png';
import cigoConectar from '../assets/cigo/conectar.png';
import cigoConvocar from '../assets/cigo/convocar.png';
import cigoEmitir from '../assets/cigo/emitir.png';
import cigoPuesto from '../assets/cigo/puesto.png';

export const cigoScreenshots: ProjectScreenshot[] = [
  {
    id: 'emitir',
    src: cigoEmitir,
    captionKey: 'research.projects.cigo.shot.emitir',
    featured: true,
  },
  {
    id: 'puesto',
    src: cigoPuesto,
    captionKey: 'research.projects.cigo.shot.puesto',
  },
  {
    id: 'convocar',
    src: cigoConvocar,
    captionKey: 'research.projects.cigo.shot.convocar',
  },
  {
    id: 'accesos',
    src: cigoAccesos,
    captionKey: 'research.projects.cigo.shot.accesos',
  },
  {
    id: 'conectar',
    src: cigoConectar,
    captionKey: 'research.projects.cigo.shot.conectar',
  },
];
