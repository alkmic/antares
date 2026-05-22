/**
 * GENERATED FROM design-system/index.html · pages/{slug}-*.html
 * Conventions :
 *   - Server Component par défaut (RSC)
 *   - Data fetching via service Payload (à implémenter dans /lib/api)
 *   - Italiques d'accent via <Italic> uniquement
 *   - Aucune classe arbitraire hors tokens
 */

import type { Metadata } from 'next';
import { Brand, BrandMark, Eyebrow, Italic, Dot, SectionHead, AvocatCard, SiteNav, SiteFooter } from '@/components';
import { getOffices, getPartners, getReferences } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Le cabinet — Antares Avocats',
  description: '15 avocats, 3 cabinets, 18 ans de pratique. Conseil et contentieux pour les directions qui anticipent.',
  alternates: { canonical: '/cabinet' },
};

/**
 * /cabinet — page manifeste.
 *
 * DESIGN INTENT
 *   - Hero "Prévenir. Accompagner. Défendre." en Fraunces XXL (clamp 64-192px).
 *     Les deux premiers verbes en encre, le troisième en Instrument Serif italique antarès.
 *     Annotation "α SCORPII" en bas-droite — mono muted, métadonnée stellaire.
 *   - Histoire en layout 3 colonnes : timeline sticky · corps long · aside facts.
 *   - 4 piliers sur fond encre — italiques d'accent or.
 *   - Bandeau références ivoire chaud + ISO 9001.
 */
export default async function CabinetPage() {
  const [partners, references] = await Promise.all([getPartners(), getReferences()]);

  return (
    <>
      <SiteNav active="/cabinet" />

      {/* HERO MANIFESTE — typographie monumentale */}
      <section className="container py-s-9 lg:py-s-10 border-b border-line relative overflow-hidden">
        <Eyebrow withRule>Le cabinet · depuis 2008</Eyebrow>
        <h1 className="font-display font-light text-[clamp(64px,11vw,192px)] leading-[0.92] tracking-[-0.04em]">
          <span className="block">Prévenir<Dot /></span>
          <span className="block">Accompagner<Dot /></span>
          <span className="block"><Italic>Défendre.</Italic></span>
        </h1>
        <span aria-hidden className="absolute bottom-s-5 right-s-7 font-mono text-[11px] tracking-[0.3em] text-muted opacity-40">α SCORPII</span>

        {/* Manifeste + ISO 9001 — split asymétrique */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-s-9 items-end mt-s-9 pt-s-6 border-t border-line">
          <p className="font-display font-light text-[22px] leading-[1.5] text-ink-soft max-w-[720px]">
            Trois verbes, dans cet <Italic>ordre</Italic>. Le cabinet ne croit pas au contentieux comme premier réflexe — mais quand il faut défendre, il défend.
          </p>
          <aside className="flex items-center gap-s-5 p-s-5 border border-line bg-bone-warm">
            <div className="w-14 h-14 rounded-full bg-ink text-gold flex items-center justify-center font-display font-medium text-[13px] relative">
              ISO
              <span aria-hidden className="absolute inset-1 border border-gold rounded-full" />
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted leading-relaxed">
              <b className="block font-display text-[16px] text-ink normal-case tracking-normal font-normal">ISO 9001 · v2015</b>
              ⌗ Certifié depuis 2018 · Bureau Veritas
            </div>
          </aside>
        </div>
      </section>

      {/* HISTOIRE — timeline sticky · corps long · facts */}
      <section className="container py-s-10">
        <SectionHead
          num="01"
          label="Histoire"
          title={<>Dix-huit ans de pratique, <Italic>quinze visages</Italic>, une même méthode.</>}
        />
        {/* Layout 3 col implémenté dans <HistoireSection /> — extrait pour la concision du handoff */}
        {/* Voir pages/cabinet.html pour le contenu intégral à transposer */}
      </section>

      {/* PILIERS — fond encre, 4 cards */}
      <section className="bg-ink text-bone py-s-10">
        <div className="container">
          <SectionHead num="02" label="Méthode" title={<>Quatre <Italic>piliers</Italic>, et le reste est conversation.</>} />
          {/* Grille 4 piliers : Expertise · Disponibilité · Partenariat · Méthode */}
        </div>
      </section>

      {/* ÉQUIPE TEASER */}
      <section className="container py-s-10">
        <SectionHead num="03" label="Équipe" title={<>Les <Italic>quatre associés</Italic>.</>} />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-s-6">
          {partners.map((p) => (
            <AvocatCard
              key={p.id}
              href={`/avocats/${p.slug}`}
              initials={`${p.firstName[0]}${p.lastName[0]}`}
              role={p.role}
              fullName={`${p.firstName} ${p.lastName}`}
              specialty={p.expertises.map((e) => e.name).join(' · ')}
              photoUrl={p.photo ?? undefined}
            />
          ))}
        </div>
        <p className="text-center mt-s-7">
          <a href="/avocats" className="font-italic italic text-antares text-[22px] border-b border-antares pb-1 no-underline">
            Découvrir les onze collaborateurs →
          </a>
        </p>
      </section>

      {/* RÉFÉRENCES — grille 6×2 italique */}
      <section className="bg-bone-warm border-t border-b border-line py-s-10">
        <div className="container">
          <SectionHead num="04" label="Ils nous font confiance" title={<>Grands groupes, ETI, <Italic>institutions</Italic>.</>} />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-l border-t border-line">
            {references.map((ref) => (
              <div key={ref.slug} className="aspect-[1.5/1] border-r border-b border-line bg-bone flex items-center justify-center p-s-5 font-display italic text-[19px] text-muted hover:bg-card hover:text-ink transition-colors">
                {ref.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
