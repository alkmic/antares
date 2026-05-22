import type { Article, Expertise } from '@/payload-types';
import { getPayloadClient } from './payload';

/**
 * Couche d'accès aux données — API locale Payload (pas de fetch HTTP interne).
 * Toutes les requêtes sont résilientes : sans connexion DB, on renvoie une liste vide
 * plutôt que de planter le rendu (les sections concernées s'affichent en état vide).
 */

export async function getExpertises(): Promise<Expertise[]> {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: 'expertises',
      sort: 'orderIndex',
      limit: 100,
      depth: 0,
    });
    return docs;
  } catch {
    return [];
  }
}

export async function getRecentArticles(limit = 3): Promise<Article[]> {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: 'articles',
      where: { status: { equals: 'published' } },
      sort: '-publishedAt',
      limit,
      depth: 1,
    });
    return docs;
  } catch {
    return [];
  }
}
