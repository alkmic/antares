/**
 * GENERATED FROM design-system/index.html · pages/{slug}-*.html
 * Conventions :
 *   - Server Component par défaut (RSC)
 *   - Data fetching via service Payload (à implémenter dans /lib/api)
 *   - Italiques d'accent via <Italic> uniquement
 *   - Aucune classe arbitraire hors tokens
 */

import type { Metadata } from 'next';
import { Italic, Eyebrow, SiteNav, SiteFooter, Button } from '@/components';
import { BookingFlow } from './flow.client';
import { getExpertises } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Prendre rendez-vous — Antares Avocats',
  description: 'Premier contact en 15 minutes. Visioconférence ou cabinet. Disponibilité sous 48 heures.',
};

/**
 * /rendez-vous — pris de rendez-vous via Calendly.
 *
 * DESIGN INTENT
 *   - Hero promesse "Premier contact en 15 minutes" italiques d'accent
 *   - Promise strip 4 cellules (sans engagement · confidentiel · visio/cabinet · 48h)
 *   - Steps bar : 3 étapes — done / active / à venir
 *   - Sélecteur expertise + carte avocat suggéré (composant client BookingFlow)
 *   - Slot Calendly custom (mini calendrier + créneaux)
 *   - FAQ 5 questions accordéon
 */
export default async function RendezVousPage({ searchParams }: { searchParams: { expertise?: string; avocat?: string } }) {
  const expertises = await getExpertises();
  return (
    <>
      <SiteNav active="/rendez-vous" />

      <section className="container py-s-9">
        <Eyebrow withRule>Prise de rendez-vous</Eyebrow>
        <h1 className="font-display font-light text-[clamp(48px,7vw,96px)] leading-[0.95] tracking-[-0.03em] my-s-7">
          Premier <Italic>contact</Italic><br />en 15 minutes.
        </h1>
        <p className="font-display font-light text-[22px] leading-relaxed text-ink-soft max-w-[720px]">
          Échange préliminaire <Italic>confidentiel</Italic> et sans engagement avec l&apos;avocat le plus pertinent pour votre dossier.
        </p>
        {/* Promise strip — 4 cellules */}
      </section>

      <BookingFlow expertises={expertises} preselectedExpertise={searchParams.expertise} preselectedAvocat={searchParams.avocat} />

      {/* FAQ — composant client FaqAccordion */}
      <SiteFooter />
    </>
  );
}
