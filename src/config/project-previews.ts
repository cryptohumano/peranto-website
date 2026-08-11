import type { ImageMetadata } from 'astro';
import andinoMap from '../assets/andino/andino-map.png';
import criteriaEditor from '../assets/criteria/criteria-editor.png';
import emergencyRadio from '../assets/emergency/emergency-radio.png';
import lumoTripMap from '../assets/lumo/lumo-trip-map.png';
import perantoIdentity from '../assets/peranto-protocol/peranto-identity.png';
import yohualliAttestation from '../assets/yohualli/yohualli-attestation.png';

/** Miniatura en cabecera contraída del panel (solo proyectos con galería) */
export const projectPreviewImages: Partial<Record<string, ImageMetadata>> = {
  criteria: criteriaEditor,
  lumo: lumoTripMap,
  'peranto-protocol': perantoIdentity,
  andino: andinoMap,
  emergency: emergencyRadio,
  yohualli: yohualliAttestation,
};
