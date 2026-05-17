import type { ProjectScreenshot } from './screenshot-types';
import yohualliAttestation from '../assets/yohualli/yohualli-attestation.png';
import yohualliGraphViz from '../assets/yohualli/yohualli-graph-viz.png';
import yohualliRelayGraph from '../assets/yohualli/yohualli-relay-graph.png';
import yohualliZkLab from '../assets/yohualli/yohualli-zk-lab.png';

export const yohualliScreenshots: ProjectScreenshot[] = [
  {
    id: 'attestation',
    src: yohualliAttestation,
    captionKey: 'research.projects.yohualli.shot.attestation',
    featured: true,
  },
  {
    id: 'graph',
    src: yohualliGraphViz,
    captionKey: 'research.projects.yohualli.shot.graph',
  },
  {
    id: 'relay',
    src: yohualliRelayGraph,
    captionKey: 'research.projects.yohualli.shot.relay',
  },
  {
    id: 'zk-lab',
    src: yohualliZkLab,
    captionKey: 'research.projects.yohualli.shot.zk',
  },
];
