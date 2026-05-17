import { siteConfig } from '../config/site';
import { researchProjects } from '../config/research-projects';

export type GhostTag = {
  id: string;
  name: string;
  slug: string;
};

export type GhostPost = {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  published_at: string;
  feature_image: string | null;
  tags?: GhostTag[];
};

type GhostPostsResponse = {
  posts: GhostPost[];
};

const projectTagSlugs = () =>
  new Set(
    researchProjects.map((p) => p.ghostTag).filter((tag): tag is string => Boolean(tag)),
  );

function ghostConfigured() {
  return Boolean(import.meta.env.PUBLIC_GHOST_URL && import.meta.env.GHOST_CONTENT_API_KEY);
}

function postsUrl(params: Record<string, string>) {
  const baseUrl = import.meta.env.PUBLIC_GHOST_URL!;
  const url = new URL('/ghost/api/content/posts/', baseUrl);
  url.searchParams.set('key', import.meta.env.GHOST_CONTENT_API_KEY!);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  return url;
}

/** Posts del laboratorio agrupados por slug de etiqueta Ghost (= id del proyecto en site config) */
export async function fetchLabPostsByProject(): Promise<Record<string, GhostPost[]>> {
  const allowed = projectTagSlugs();
  const grouped: Record<string, GhostPost[]> = {};

  if (!ghostConfigured() || allowed.size === 0) return grouped;

  try {
    const url = postsUrl({
      limit: '100',
      include: 'tags',
      fields: 'id,title,excerpt,slug,published_at,feature_image',
    });

    const res = await fetch(url.toString());
    if (!res.ok) return grouped;

    const data = (await res.json()) as GhostPostsResponse;

    for (const post of data.posts) {
      for (const tag of post.tags ?? []) {
        if (!allowed.has(tag.slug)) continue;
        grouped[tag.slug] ??= [];
        grouped[tag.slug].push(post);
      }
    }

    for (const slug of Object.keys(grouped)) {
      grouped[slug].sort(
        (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime(),
      );
    }
  } catch {
    return grouped;
  }

  return grouped;
}

export function labTagUrl(tagSlug: string): string {
  const base = siteConfig.ghostUrl.replace(/\/$/, '');
  return `${base}/tag/${tagSlug}/`;
}

export async function fetchLatestPosts(limit = 3): Promise<GhostPost[] | null> {
  if (!ghostConfigured()) return null;

  try {
    const res = await fetch(
      postsUrl({
        limit: String(limit),
        fields: 'id,title,excerpt,slug,published_at,feature_image',
        include: 'authors',
      }).toString(),
    );
    if (!res.ok) return null;
    const data = (await res.json()) as GhostPostsResponse;
    return data.posts;
  } catch {
    return null;
  }
}
