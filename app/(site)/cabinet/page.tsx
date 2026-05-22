import type { Metadata } from 'next';
import Link from 'next/link';
import type { Avocat } from '@/payload-types';
import { Eyebrow, Italic, Dot, SectionHead, AvocatCard } from '@/components/ui';
import { JsonLd } from '@/components/seo/json-ld';
import { offices } from '@/lib/offices';
import { clientReferences } from '@/lib/references';
import { getPartners } from '@/lib/api';
import { legalServiceJsonLd } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'Le cabinet',
  description:
    '15 avocats, 3 cabinets, 18 ans de pratique. Conseil et contentieux pour les directions qui anticipent.',
  alternates: { canonical: '/cabinet' },
  openGraph: {
    url: '/cabinet',
    title: 'Le cabinet · Antares Avocats',
    description: 'Quinze avocats, trois implantations, dix-huit ans de pratique.',
  },
};

// ISR : le teaser équipe est piloté par données (Payload).
export const revalidate = 600;

const REPERES = [
  { v: '2008', l: 'Fondation' },
  { v: '15', l: 'Avocats' },
  { v: '3', l: 'Implantations' },
  { v: '2018', l: 'ISO 9001' },
];

const PILIERS = [
  {
    n: 'A',
    k: 'Expertise',
    d: 'Des spécialités pointues plutôt qu’une généralité diluée. Chaque dossier confié à qui le maîtrise.',
  },
  {
    n: 'B',
    k: 'Disponibilité',
    d: 'Un interlocuteur qui répond. Quatre jours ouvrés de délai moyen sur les demandes urgentes.',
  },
  {
    n: 'C',
    k: 'Partenariat',
    d: 'Une relation dans la durée, pas une prestation ponctuelle. Nous connaissons votre entreprise.',
  },
  {
    n: 'D',
    k: 'Méthode',
    d: 'Anticiper, documenter, sécuriser. Le contentieux n’est qu’un recours, jamais une fin.',
  },
];

function partnerCardProps(a: Avocat) {
  const specialty = Array.isArray(a.expertises)
    ? a.expertises
        .map((e) => (e && typeof e === 'object' ? e.name : null))
        .filter(Boolean)
        .join(' · ')
    : '';
  const photoUrl = a.photo && typeof a.photo === 'object' ? (a.photo.url ?? undefined) : undefined;
  return {
    href: `/avocats/${a.slug}`,
    initials: `${a.firstName?.[0] ?? ''}${a.lastName?.[0] ?? ''}`,
    role: a.role ?? 'Associé',
    fullName: `${a.firstName} ${a.lastName}`,
    specialty,
    photoUrl,
  };
}

export default async function CabinetPage() {
  const partners = await getPartners();

  return (
    <>
      <JsonLd data={legalServiceJsonLd()} />

      {/* HERO MANIFESTE */}
      <section className="container py-s-9 lg:py-s-10 border-b border-line relative overflow-hidden">
        <Eyebrow withRule>Le cabinet · depuis 2008</Eyebrow>
        <h1 className="font-display font-light text-[clamp(64px,11vw,192px)] leading-[0.92] tracking-[-0.04em] mt-s-7">
          <span className="block">
            Prévenir
            <Dot />
          </span>
          <span className="block">
            Accompagner
            <Dot />
          </span>
          <span className="block">
            <Italic>Défendre.</Italic>
          </span>
        </h1>
        <span
          aria-hidden
          className="absolute bottom-s-5 right-s-7 font-mono text-[11px] tracking-[0.3em] text-muted opacity-40"
        >
          α SCORPII
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-s-7 lg:gap-s-9 items-end mt-s-9 pt-s-6 border-t border-line">
          <p className="font-display font-light text-[22px] leading-[1.5] text-ink-soft max-w-[720px]">
            Trois verbes, dans cet <Italic>ordre</Italic>. Le cabinet ne croit pas au contentieux
            comme premier réflexe — mais quand il faut défendre, il défend.
          </p>
          <aside className="flex items-center gap-s-5 p-s-5 border border-line bg-bone-warm">
            <div className="w-14 h-14 rounded-full bg-ink text-gold flex items-center justify-center font-display font-medium text-[13px] relative shrink-0">
              ISO
              <span aria-hidden className="absolute inset-1 border border-gold rounded-full" />
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted leading-relaxed">
              <b className="block font-display text-[16px] text-ink normal-case tracking-normal font-normal">
                ISO 9001 · v2015
              </b>
              ⌗ Certifié depuis 2018 · Bureau Veritas
            </div>
          </aside>
        </div>
      </section>

      {/* HISTOIRE */}
      <section className="container py-s-10 border-b border-line">
        <SectionHead
          num="01"
          label="Histoire"
          title={
            <>
              Dix-huit ans de pratique, <Italic>quinze visages</Italic>, une même méthode.
            </>
          }
        />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-s-8 lg:gap-s-9 items-start">
          <div className="font-body text-[16px] leading-[1.7] text-ink-soft space-y-s-5 max-w-[680px]">
            <p>
              Antares naît en 2008, à Paris, d’une conviction simple : un cabinet d’affaires se juge
              d’abord à ce qu’il évite à ses clients. Prévenir, avant de défendre.
            </p>
            <p>
              En dix-huit ans, le cabinet a grandi sans se diluer — quinze avocats, trois
              implantations, et le même soin porté à chaque dossier qu’au premier jour.
            </p>
            <p>
              Du conseil quotidien aux contentieux à fort enjeu, Antares accompagne grands groupes
              et ETI dans la durée. Trente-deux d’entre eux nous font confiance depuis plus de dix
              ans.
            </p>
          </div>
          <aside className="lg:sticky lg:top-[96px] border border-line bg-bone-warm p-s-6">
            <div className="font-mono text-mono-label uppercase text-muted mb-s-5">⌗ Repères</div>
            <dl className="space-y-s-4">
              {REPERES.map((r) => (
                <div key={r.l} className="flex items-baseline justify-between gap-s-4 border-b border-line pb-s-3 last:border-0">
                  <dt className="font-display text-[28px] font-light text-ink leading-none">{r.v}</dt>
                  <dd className="font-mono text-[10px] uppercase tracking-widest text-muted">{r.l}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      {/* MÉTHODE — 4 piliers, fond encre */}
      <section className="bg-ink text-bone py-s-10">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-s-5 lg:gap-s-7 items-start">
            <span className="font-mono text-mono-label uppercase text-gold pt-s-4 border-t border-ink-line inline-block">
              ⌗ 02 — Méthode
            </span>
            <div>
              <h2 className="font-display font-light text-[clamp(32px,4.5vw,52px)] leading-[1.05] tracking-tight max-w-[760px]">
                Quatre <Italic className="text-gold">piliers</Italic>, et le reste est conversation.
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink-line border border-ink-line mt-s-9">
                {PILIERS.map((p) => (
                  <div key={p.k} className="bg-ink p-s-6">
                    <div className="font-mono text-mono-label uppercase text-gold mb-s-3">
                      ⌗ {p.n} — {p.k}
                    </div>
                    <p className="font-body text-[14.5px] leading-relaxed text-bone/75">{p.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ÉQUIPE TEASER */}
      <section className="container py-s-10 border-b border-line">
        <SectionHead
          num="03"
          label="Équipe"
          title={
            <>
              Les <Italic>associés</Italic> fondateurs.
            </>
          }
        />
        {partners.length > 0 ? (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-s-6">
              {partners.map((p) => (
                <AvocatCard key={p.id} {...partnerCardProps(p)} />
              ))}
            </div>
            <p className="mt-s-7">
              <Link
                href="/avocats"
                className="font-italic italic text-antares text-[22px] border-b border-antares pb-1 no-underline"
              >
                Découvrir toute l’équipe →
              </Link>
            </p>
          </>
        ) : (
          <div className="border border-line bg-bone-warm p-s-7">
            <p className="font-display font-light text-[20px] text-ink-soft max-w-[560px]">
              Quatre associés fondateurs et onze collaborateurs, présentés bientôt.
            </p>
            <Link
              href="/avocats"
              className="inline-block mt-s-4 font-italic italic text-antares text-[18px] border-b border-antares pb-1 no-underline"
            >
              Voir l’équipe →
            </Link>
          </div>
        )}
      </section>

      {/* IMPLANTATIONS */}
      <section className="container py-s-10 border-b border-line">
        <SectionHead
          num="04"
          label="Implantations"
          title={
            <>
              Trois <Italic>adresses</Italic>, une seule équipe.
            </>
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line border border-line">
          {offices.map((o) => (
            <div key={o.slug} className="bg-bone p-s-6">
              <div className="font-mono text-mono-label uppercase text-antares mb-s-3">⌗ {o.city}</div>
              <p className="font-display text-[20px] text-ink leading-snug">{o.streetAddress}</p>
              <p className="font-body text-[14px] text-muted mt-s-2">
                {o.postalCode} {o.addressLocality}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* RÉFÉRENCES */}
      <section className="bg-bone-warm border-t border-line py-s-10">
        <div className="container">
          <SectionHead
            num="05"
            label="Ils nous font confiance"
            title={
              <>
                Grands groupes, ETI, <Italic>institutions</Italic>.
              </>
            }
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-l border-t border-line">
            {clientReferences.map((name) => (
              <div
                key={name}
                className="aspect-[1.5/1] border-r border-b border-line bg-bone flex items-center justify-center p-s-5 font-display italic text-[18px] text-muted text-center hover:bg-card hover:text-ink transition-colors"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
