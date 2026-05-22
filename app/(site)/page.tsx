import type { Metadata } from 'next';
import Link from 'next/link';
import type { Article } from '@/payload-types';
import { Eyebrow, Italic, Dot, BrandMark, SectionHead, ArticleCard } from '@/components/ui';
import { JsonLd } from '@/components/seo/json-ld';
import { site } from '@/lib/site';
import { clientReferences } from '@/lib/references';
import { getExpertises, getRecentArticles } from '@/lib/api';
import { readingTime } from '@/lib/lexical';

export const metadata: Metadata = {
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    url: '/',
    title: `${site.name} · Avocats d'affaires`,
    description: site.description,
  },
};

// ISR : la home est prérendue puis régénérée périodiquement pour refléter
// les nouvelles expertises / publications une fois la DB connectée.
export const revalidate = 600;

const STATS = [
  { n: '15', l: 'avocats' },
  { n: '3', l: 'cabinets' },
  { n: '18', l: 'ans' },
];

const PILIERS = [
  { k: 'Conseil', d: 'Sécuriser vos opérations en amont — structuration, contrats, gouvernance.' },
  { k: 'Anticipation', d: "Lire le risque avant qu'il ne devienne litige. Veille et cartographie." },
  { k: 'Contentieux', d: 'Quand la négociation échoue, une défense méthodique et tenace.' },
];

function authorName(a: Article): string {
  const first = Array.isArray(a.authors) ? a.authors[0] : undefined;
  if (first && typeof first === 'object') {
    return `${first.firstName?.[0] ?? ''}. ${first.lastName ?? ''}`.trim();
  }
  return 'Antares';
}

function categoryLabel(a: Article): string {
  return a.expertise && typeof a.expertise === 'object' ? a.expertise.name : 'Publication';
}

export default async function HomePage() {
  const [expertises, articles] = await Promise.all([getExpertises(), getRecentArticles(3)]);

  const legalService = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: site.name,
    description: site.description,
    url: site.url,
    areaServed: 'FR',
    knowsLanguage: ['fr', 'en'],
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: '3 square Lamartine',
        postalCode: '75116',
        addressLocality: 'Paris',
        addressCountry: 'FR',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: '7 allée du Mail',
        postalCode: '91300',
        addressLocality: 'Massy',
        addressCountry: 'FR',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: '9 avenue Henri Matisse',
        postalCode: '06200',
        addressLocality: 'Nice',
        addressCountry: 'FR',
      },
    ],
  };

  return (
    <>
      <JsonLd data={legalService} />

      {/* HERO — asymétrie 1.1fr / 380px, jamais centré */}
      <section className="container py-s-9 lg:py-s-10 border-b border-line">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_380px] gap-s-8 lg:gap-s-9 items-end">
          <div>
            <Eyebrow withRule>Avocats d&apos;affaires · Paris · Massy · Nice</Eyebrow>
            <h1 className="font-display font-light text-[clamp(56px,9vw,128px)] leading-[0.92] tracking-[-0.04em] mt-s-7">
              Le droit comme <Italic>avantage</Italic>
              <Dot />
            </h1>
            <p className="font-display font-light text-[clamp(18px,2.2vw,24px)] leading-[1.5] text-ink-soft max-w-[560px] mt-s-6">
              Conseil et contentieux pour les directions qui préfèrent <Italic>prévenir</Italic>.
              Quinze avocats, trois implantations, une même exigence.
            </p>
            <div className="flex flex-wrap items-center gap-s-4 mt-s-7">
              <Link
                href="/rendez-vous"
                className="inline-flex items-center gap-s-3 bg-antares text-bone px-s-5 py-s-3 text-[13px] font-medium tracking-wider no-underline hover:bg-antares-deep transition-colors"
              >
                Prendre rendez-vous <span className="font-mono">→</span>
              </Link>
              <Link
                href="/cabinet"
                className="inline-flex items-center gap-s-3 border border-line-strong text-ink px-s-5 py-s-3 text-[13px] font-medium tracking-wider no-underline hover:bg-ink hover:text-bone hover:border-ink transition-colors"
              >
                Le cabinet
              </Link>
            </div>
          </div>
          <aside className="lg:border-l lg:border-line lg:pl-s-7">
            <div className="flex items-center gap-s-3 font-mono text-[11px] tracking-[0.3em] uppercase text-muted">
              <BrandMark size={18} /> α Scorpii
            </div>
            <div className="grid grid-cols-3 gap-s-5 mt-s-6 pt-s-6 border-t border-line">
              {STATS.map((s) => (
                <div key={s.l}>
                  <div className="font-display font-light text-[clamp(32px,4vw,44px)] leading-none text-ink">
                    {s.n}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted mt-s-2">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* CLIENTS */}
      <section className="bg-bone-warm border-b border-line py-s-9">
        <div className="container">
          <div className="font-mono text-mono-label uppercase text-muted mb-s-6">
            ⌗ Ils nous font confiance
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-l border-t border-line">
            {clientReferences.map((name) => (
              <div
                key={name}
                className="aspect-[1.6/1] border-r border-b border-line bg-bone flex items-center justify-center p-s-4 font-display italic text-[16px] text-muted text-center hover:bg-card hover:text-ink transition-colors"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERTISES */}
      <section className="container py-s-10">
        <SectionHead
          num="01"
          label="Expertises"
          title={
            <>
              Des <Italic>spécialités</Italic>, pas des généralités.
            </>
          }
          intro="Le droit des affaires dans toutes ses dimensions — du conseil quotidien au contentieux à fort enjeu."
        />
        {expertises.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
              {expertises.map((e) => (
                <Link
                  key={e.id}
                  href={`/expertises/${e.slug}`}
                  className="group flex flex-col bg-bone p-s-6 min-h-[180px] no-underline text-ink hover:bg-bone-warm transition-colors"
                >
                  <h3 className="font-display text-[22px] leading-tight tracking-tight">{e.name}</h3>
                  {e.lede && (
                    <p className="font-body text-[14px] text-muted leading-relaxed mt-s-3 mb-auto">
                      {e.lede}
                    </p>
                  )}
                  <span className="font-mono text-[10px] uppercase tracking-widest text-antares mt-s-5">
                    ⌗ Découvrir →
                  </span>
                </Link>
              ))}
            </div>
            <p className="mt-s-6">
              <Link
                href="/expertises"
                className="font-mono text-[11px] uppercase tracking-widest text-antares border-b border-antares pb-1 no-underline"
              >
                Toutes les expertises →
              </Link>
            </p>
          </>
        ) : (
          <div className="border border-line bg-bone-warm p-s-7">
            <p className="font-display font-light text-[20px] text-ink-soft max-w-[560px]">
              Du droit des sociétés au contentieux des affaires, en passant par le droit social et
              la propriété intellectuelle.
            </p>
            <Link
              href="/expertises"
              className="inline-block mt-s-4 font-italic italic text-antares text-[18px] border-b border-antares pb-1 no-underline"
            >
              Découvrir nos expertises →
            </Link>
          </div>
        )}
      </section>

      {/* MÉTHODE — fond encre, accents or */}
      <section className="bg-ink text-bone py-s-10">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-s-5 lg:gap-s-7 items-start">
            <span className="font-mono text-mono-label uppercase text-gold pt-s-4 border-t border-ink-line inline-block">
              ⌗ Méthode
            </span>
            <div>
              <h2 className="font-display font-light text-[clamp(32px,4.5vw,52px)] leading-[1.05] tracking-tight max-w-[760px]">
                Le contentieux n&apos;est jamais le premier réflexe. Mais quand il faut{' '}
                <Italic className="text-gold">défendre</Italic>, nous défendons.
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-s-6 mt-s-9">
                {PILIERS.map((p) => (
                  <div key={p.k} className="border-t border-ink-line pt-s-4">
                    <h3 className="font-mono text-mono-label uppercase text-gold mb-s-3">⌗ {p.k}</h3>
                    <p className="font-body text-[14.5px] leading-relaxed text-bone/75">{p.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PUBLICATIONS */}
      <section className="container py-s-10">
        <SectionHead
          num="02"
          label="Publications"
          title={
            <>
              Derniers <Italic>décryptages</Italic>.
            </>
          }
        />
        {articles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line border border-line">
              {articles.map((a) => (
                <ArticleCard
                  key={a.id}
                  variant="bone"
                  href={`/publications/${a.slug}`}
                  category={categoryLabel(a)}
                  date={a.publishedAt ? new Date(a.publishedAt).toLocaleDateString('fr-FR') : ''}
                  title={a.title}
                  author={authorName(a)}
                  readingTime={readingTime(a.body, a.lede ?? '')}
                />
              ))}
            </div>
            <p className="mt-s-6">
              <Link
                href="/publications"
                className="font-mono text-[11px] uppercase tracking-widest text-antares border-b border-antares pb-1 no-underline"
              >
                Toutes les publications →
              </Link>
            </p>
          </>
        ) : (
          <div className="border border-line bg-bone-warm p-s-7">
            <p className="font-display font-light text-[20px] text-ink-soft max-w-[560px]">
              Les premières publications du cabinet arriveront prochainement.
            </p>
            <Link
              href="/publications"
              className="inline-block mt-s-4 font-italic italic text-antares text-[18px] border-b border-antares pb-1 no-underline"
            >
              Voir la rubrique →
            </Link>
          </div>
        )}
      </section>

      {/* CTA — fond encre, bouton or */}
      <section className="bg-ink text-bone py-s-10">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-s-7 lg:items-center">
            <div>
              <span className="font-mono text-mono-label uppercase text-gold">⌗ Premier échange</span>
              <h2 className="font-display font-light text-[clamp(32px,4.5vw,56px)] leading-[1.02] tracking-tight mt-s-4 max-w-[680px]">
                Parlons de votre <Italic className="text-gold">situation</Italic>.
              </h2>
              <p className="font-display font-light text-[18px] text-bone/75 leading-relaxed mt-s-5 max-w-[520px]">
                Un premier rendez-vous pour comprendre votre enjeu et la meilleure façon d&apos;y
                répondre.
              </p>
            </div>
            <div className="flex flex-col gap-s-4 lg:w-[280px]">
              <Link
                href="/rendez-vous"
                className="inline-flex items-center justify-center gap-s-3 bg-gold text-ink px-s-6 py-s-4 text-[13px] font-medium tracking-wider no-underline hover:bg-bone transition-colors"
              >
                Prendre rendez-vous <span className="font-mono">→</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-s-3 border border-bone/30 text-bone px-s-6 py-s-4 text-[13px] font-medium tracking-wider no-underline hover:border-gold hover:text-gold transition-colors"
              >
                Nous écrire
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
