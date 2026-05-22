import config from '@payload-config';
import { getPayload, type Payload } from 'payload';

let cached: Payload | null = null;

/** Instance Payload locale (API serveur), mise en cache pour la durée du process. */
export async function getPayloadClient(): Promise<Payload> {
  if (cached) return cached;
  cached = await getPayload({ config });
  return cached;
}
