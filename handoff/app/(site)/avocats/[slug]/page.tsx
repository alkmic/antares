/**
 * GENERATED FROM design-system/index.html · pages/{slug}-*.html
 * Conventions :
 *   - Server Component par défaut (RSC)
 *   - Data fetching via service Payload (à implémenter dans /lib/api)
 *   - Italiques d'accent via <Italic> uniquement
 *   - Aucune classe arbitraire hors tokens
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Brand, Eyebrow, Italic, Dot, SectionHead, Button, ArticleCard, SiteNav, SiteFooter } from '@/components';
import { getAvocat, getArticlesByAuthor } from '@/lib/api';

interface PageProps { params: { slug: string } }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const a = await getAvocat(params.slug);
  if (!a) return {};
  return {
    title: `${a.firstName} ${a.lastName} — Antares Avocats`,
    description: a.bioShort,
    alternates: { canonical: `/avocats/${params.slug}` },
  };
}

/**
 * /avocats/[slug] — fiche avocat (exemple : antoine-baudart).
 *
 * DESIGN INTENT
 *   - Hero asymétrique : photo 4/5 droite, à gauche label ⌗ + nom Fraunces XXL + tagline italique courte
 *   - Méta-tableau ivoire chaud : barreau · formation · langues · distinction
 *   - Bio en grande Fraunces 22px italiques d'accent
 *   - Liste expertises pattern asymétrique (du DS)
 *   - Publications signées · grille 2×2 filaire
 *   - CTA Calendly individuel · split encre/or
 */
export default async function AvocatPage({ params }: PageProps) {
  const avocat = await getAvocat(params.slug);
  if (!avocat) notFound();

  const articles = await getArticlesByAuthor({ avocatId: avocat.id, limit: 4 });

  return (
    <>
      <SiteNav active="/avocats" />

      {/* HERO ASYMÉTRIQUE photo droite */}
      <section className="container py-s-9 lg:py-s-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-s-9 lg:gap-s-10 items-end">
          <div className="pb-s-5">
            <Eyebrow withRule>{avocat.role} · depuis {avocat.barAdmissionYear}</Eyebrow>
            <h1 className="font-display font-light text-[clamp(56px,8vw,112px)] leading-[0.92] tracking-[-0.035em] my-s-7">
              {avocat.firstName}<br />{avocat.lastName}<Dot />
            </h1>
            <p className="font-italic italic text-[28px] leading-snug text-ink-soft max-w-[480px] mb-s-7">
              {/* Tagline courte — citation avocat sur sa pratique */}
              « La <Italic className="not-italic">propriété intellectuelle</Italic> est l&apos;endroit où le droit rencontre l&apos;innovation. »
            </p>
            <div className="flex gap-s-3 flex-wrap">
              <Button variant="antares" asChild><a href="#cta">Prendre rendez-vous <span className="font-mono">→</span></a></Button>
              <Button variant="ghost" asChild><a href={`mailto:${avocat.email}`}>Envoyer un mail</a></Button>
            </div>
          </div>

          {/* Photo 4/5 placeholder striped si pas de photo */}
          <div className="aspect-[4/5] bg-gradient-to-br from-bone-warm to-[#c1a87d] relative flex items-center justify-center">
            {avocat.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avocat.photo} alt={`${avocat.firstName} ${avocat.lastName}, ${avocat.role.toLowerCase()} du cabinet`} className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <span className="font-display font-light text-[180px] text-ink opacity-[0.18]">
                {avocat.firstName[0]}{avocat.lastName[0]}
              </span>
            )}
            <div className="absolute bottom-s-4 left-s-4 font-mono text-[10px] uppercase tracking-widest bg-ink/85 text-bone px-s-3 py-1 rounded-sm">
              ⌗ Crédit · Studio Lafayette
            </div>
          </div>
        </div>
      </section>

      {/* MÉTA TABLEAU */}
      <div className="bg-bone-warm border-t border-b border-line py-s-6">
        <div className="container grid grid-cols-2 lg:grid-cols-4 gap-s-7">
          {/* 4 cellules : Barreau · Formation · Langues · Distinction */}
        </div>
      </div>

      {/* BIO */}
      <section className="container py-s-10">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-s-7 lg:gap-s-10 items-start">
          <span className="font-mono text-mono-label uppercase text-muted pt-s-4 border-t border-ink inline-block lg:sticky lg:top-[100px]">⌗ 01 — Parcours</span>
          <div className="max-w-[680px] space-y-s-6">
            {/* Bio longue en Fraunces 22-26px avec italiques d'accent */}
            <p className="font-display font-light text-[22px] leading-relaxed">{avocat.bioShort}</p>
            {/* … contenu Lexical à rendre via lexical-react */}
            <a href="#" className="inline-flex items-center gap-s-3 font-body text-[13px] font-medium tracking-wider text-ink no-underline border-b border-antares pb-1">
              Lire la bio complète <span className="font-mono">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* EXPERTISES — pattern asymétrique */}
      {/* PUBLICATIONS SIGNÉES — grille 2×2 sur fond ivoire */}
      <section className="container py-s-10">
        <SectionHead num="03" label="Publications" title={<>Articles <Italic>signés</Italic> {avocat.firstName} {avocat.lastName}.</>} />
        <div className="grid grid-cols-1 lg:grid-cols-2 border border-line bg-line">
          {articles.map((a) => (
            <ArticleCard
              key={a.id}
              href={`/publications/${a.slug}`}
              category={a.expertise.name}
              date={a.publishedAt!.toLocaleDateString('fr-FR')}
              title={a.title}
              author=""
              readingTime={a.readingTime}
              variant="bone"
            />
          ))}
        </div>
      </section>

      {/* CTA CALENDLY INDIVIDUEL — split encre + slot or */}
      <SiteFooter />
    </>
  );
}
