import type { ImageMetadata } from 'astro';
import type { UIKey } from '../i18n/ui';

export type ProjectScreenshot = {
  id: string;
  src: ImageMetadata;
  captionKey: UIKey;
  featured?: boolean;
};
