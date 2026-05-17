import type { ProjectScreenshot } from './screenshot-types';
import criteriaDocuments from '../assets/criteria/criteria-documents.png';
import criteriaEditor from '../assets/criteria/criteria-editor.png';
import criteriaIdentity from '../assets/criteria/criteria-identity.png';
import criteriaQuality from '../assets/criteria/criteria-quality.png';
import criteriaSecurity from '../assets/criteria/criteria-security.png';
import criteriaSources from '../assets/criteria/criteria-sources.png';

export type CriteriaScreenshot = ProjectScreenshot;

export const criteriaScreenshots: CriteriaScreenshot[] = [
  {
    id: 'editor',
    src: criteriaEditor,
    captionKey: 'research.projects.criteria.shot.editor',
    featured: true,
  },
  {
    id: 'quality',
    src: criteriaQuality,
    captionKey: 'research.projects.criteria.shot.quality',
  },
  {
    id: 'documents',
    src: criteriaDocuments,
    captionKey: 'research.projects.criteria.shot.documents',
  },
  {
    id: 'sources',
    src: criteriaSources,
    captionKey: 'research.projects.criteria.shot.sources',
  },
  {
    id: 'identity',
    src: criteriaIdentity,
    captionKey: 'research.projects.criteria.shot.identity',
  },
  {
    id: 'security',
    src: criteriaSecurity,
    captionKey: 'research.projects.criteria.shot.security',
  },
];
