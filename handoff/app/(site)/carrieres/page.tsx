/**
 * GENERATED FROM design-system/index.html · pages/{slug}-*.html
 * Conventions :
 *   - Server Component par défaut (RSC)
 *   - Data fetching via service Payload (à implémenter dans /lib/api)
 *   - Italiques d'accent via <Italic> uniquement
 *   - Aucune classe arbitraire hors tokens
 */

import type { Metadata } from 'next';
import { Italic, Eyebrow, SiteNav, SiteFooter } from '@/components';
import { ApplicationForm } from './application-form.client';
import { getOpenPositions } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Carrières — Antares Avocats',
  description: 'Le cabinet recrute chaque année deux à quatre collaborateurs et stagiaires. Pas de pyramide à gravir.',
};

/**
 * /carrieres — page recrutement.
 *
 * DESIGN INTENT
 *   - Hero "Rejoindre Antares, c'est écrire avec nous le droit d'après" — italiques d'accent
 *   - 4 piliers sur fond ivoire chaud (Responsabilité · Heures · Formation · Transparence)
 *   - Liste filaire des postes ouverts (3) avec tags CDI/stage
 *   - Formulaire candidature complet : 5 fieldsets · file upload · Cloudflare Turnstile · RGPD
 */
export default async function CarrieresPage() {
  const positions = await getOpenPositions();
  return (
    <>
      <SiteNav active="/carrieres" />
      <section className="container py-s-10">
        <Eyebrow withRule>Carrières · cabinet à taille humaine</Eyebrow>
        <h1 className="font-display font-light text-[clamp(56px,9vw,128px)] leading-[0.92] tracking-[-0.035em] my-s-7">
          Rejoindre Antares,<br />c&apos;est <Italic>écrire</Italic> avec nous<br />le droit d&apos;après<span className="text-antares">.</span>
        </h1>
      </section>
      {/* Piliers + postes + ApplicationForm */}
      <ApplicationForm positions={positions} />
      <SiteFooter />
    </>
  );
}
