import type { ProjectScreenshot } from './screenshot-types';
import cigoAccesos from '../assets/cigo/accesos.png';
import cigoCartera from '../assets/cigo/cartera.png';
import cigoConectar from '../assets/cigo/conectar.png';
import cigoConvocar from '../assets/cigo/convocar.png';
import cigoEmitir from '../assets/cigo/emitir.png';
import cigoInicio from '../assets/cigo/inicio.png';
import cigoPuesto from '../assets/cigo/puesto.png';
import cigoVotar from '../assets/cigo/votar.png';

export const cigoScreenshots: ProjectScreenshot[] = [
  {
    id: 'inicio',
    src: cigoInicio,
    captionKey: 'research.projects.cigo.shot.inicio',
  },
  {
    id: 'cartera',
    src: cigoCartera,
    captionKey: 'research.projects.cigo.shot.cartera',
  },
  {
    id: 'votar',
    src: cigoVotar,
    captionKey: 'research.projects.cigo.shot.votar',
  },
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
