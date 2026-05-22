/**
 * Consentement cookies (RGPD / CNIL).
 * Stocké dans un cookie JSON versionné, lisible côté serveur et client.
 * Par défaut tout le non-nécessaire est refusé tant qu'aucun choix explicite.
 */

export type ConsentCategory = 'necessary' | 'analytics' | 'embeds';

export interface ConsentState {
  necessary: true;
  analytics: boolean;
  embeds: boolean;
  ts: number; // horodatage du choix
  v: number; // version du schéma de consentement
}

export const CONSENT_COOKIE = 'antares-consent';
export const CONSENT_VERSION = 1;
export const CONSENT_MAX_AGE = 60 * 60 * 24 * 365; // 1 an

/** Catégories optionnelles présentées dans le gestionnaire granulaire. */
export const CONSENT_CATEGORIES: {
  key: 'analytics' | 'embeds';
  label: string;
  description: string;
}[] = [
  {
    key: 'analytics',
    label: "Mesure d'audience",
    description:
      'Statistiques de fréquentation anonymes (Plausible), sans cookie publicitaire ni partage à des tiers.',
  },
  {
    key: 'embeds',
    label: 'Contenus tiers',
    description:
      'Affichage du module de prise de rendez-vous (Calendly). Désactivé, un lien direct reste proposé.',
  },
];

export function defaultConsent(): ConsentState {
  return { necessary: true, analytics: false, embeds: false, ts: 0, v: CONSENT_VERSION };
}

/** Parse une valeur de cookie (string) en état de consentement, ou null si absent/invalide/obsolète. */
export function parseConsent(raw: string | undefined | null): ConsentState | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as Partial<ConsentState>;
    if (!parsed || typeof parsed !== 'object' || parsed.v !== CONSENT_VERSION) return null;
    return {
      necessary: true,
      analytics: Boolean(parsed.analytics),
      embeds: Boolean(parsed.embeds),
      ts: Number(parsed.ts) || 0,
      v: CONSENT_VERSION,
    };
  } catch {
    return null;
  }
}

export function serializeConsent(state: ConsentState): string {
  return encodeURIComponent(JSON.stringify(state));
}

/* ---- helpers client ---- */

export function readConsentCookie(): ConsentState | null {
  if (typeof document === 'undefined') return null;
  const entry = document.cookie
    .split('; ')
    .find((c) => c.startsWith(`${CONSENT_COOKIE}=`));
  if (!entry) return null;
  return parseConsent(entry.slice(CONSENT_COOKIE.length + 1));
}

export function writeConsentCookie(state: ConsentState): void {
  if (typeof document === 'undefined') return;
  const secure =
    typeof location !== 'undefined' && location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${CONSENT_COOKIE}=${serializeConsent(state)}; path=/; max-age=${CONSENT_MAX_AGE}; SameSite=Lax${secure}`;
}
