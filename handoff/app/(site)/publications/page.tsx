/**
 * GENERATED FROM design-system/index.html · pages/{slug}-*.html
 * Conventions :
 *   - Server Component par défaut (RSC)
 *   - Data fetching via service Payload (à implémenter dans /lib/api)
 *   - Italiques d'accent via <Italic> uniquement
 *   - Aucune classe arbitraire hors tokens
 */

import type { Metadata } from 'next';
import { Italic, Eyebrow, ArticleCard, SiteNav, SiteFooter } from '@/components';
import { PublicationsFilters } from './filters.client';
import { getArticles, getExpertises, getAuthors } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Publications — Antares Avocats',
  description: '147 articles signés par les avocats du cabinet. Décryptages, alertes, analyses.',
};

/**
 * /publications — index blog.
 *
 * DESIGN INTENT
 *   - Hero éditorial · titre Fraunces XXL + 3 stats droite
 *   - Filtres sticky 2 niveaux (chips expertises · search · selects auteur/tri/période)
 *   - Article phare carte split encre · 3-col grid · pagination
 */
interface SearchParams { expertise?: string; author?: string; sort?: string; page?: string; q?: string }
export default async function PublicationsPage({ searchParams }: { searchParams: SearchParams }) {
  const page = Number(searchParams.page ?? 1);
  const [{ articles, total, featured }, expertises, authors] = await Promise.all([
    getArticles({
      page,
      expertise: searchParams.expertise,
      author: searchParams.author,
      sort: searchParams.sort,
      q: searchParams.q,
    }),
    getExpertises(),
    getAuthors(),
  ]);

  return (
    <>
      <SiteNav active="/publications" />

      <section className="container py-s-10 border-b border-line">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-s-9 items-end">
          <div>
            <Eyebrow withRule>Décryptages · alertes · analyses</Eyebrow>
            <h1 className="font-display font-light text-[clamp(56px,8.5vw,120px)] leading-[0.92] tracking-[-0.035em] mt-s-7">
              Les <Italic className="block">publications</Italic>
              du cabinet<span className="text-antares">.</span>
            </h1>
          </div>
          <aside className="border-l border-line-strong pl-s-7 pb-s-4">
            <div className="font-mono text-mono-label uppercase text-muted mb-s-4">⌗ Ligne éditoriale</div>
            <p className="font-display text-[19px] font-light leading-relaxed text-ink-soft">
              Chaque mois, nos <Italic>décryptages</Italic> sur l&apos;actualité juridique des affaires.
            </p>
            <dl className="flex gap-s-6 mt-s-5 font-mono text-mono-label text-muted">
              <div><dt className="font-display text-[22px] text-ink mb-1 normal-case tracking-normal">{total}</dt>publications</div>
              <div><dt className="font-display text-[22px] text-ink mb-1 normal-case tracking-normal">{authors.length}</dt>auteurs</div>
              <div><dt className="font-display text-[22px] text-ink mb-1 normal-case tracking-normal">{expertises.length}</dt>expertises</div>
            </dl>
          </aside>
        </div>
      </section>

      {/* Filtres en composant client — gère search + state URL */}
      <PublicationsFilters expertises={expertises} authors={authors} initial={searchParams} total={total} page={page} />

      {/* Article phare */}
      {featured && (
        <section className="container py-s-9">
          <a href={`/publications/${featured.slug}`} className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-s-8 bg-ink text-bone p-s-8 no-underline relative overflow-hidden">
            <div className="aspect-[4/3] bg-antares" />
            <div className="relative z-10">
              <span className="font-mono text-mono-label uppercase text-gold border border-gold px-s-3 py-1 inline-block mb-s-5">⌗ À la une</span>
              <h2 className="font-display font-light text-[clamp(28px,3.6vw,44px)] leading-tight mb-s-4 text-bone">{featured.title}</h2>
              <p className="font-display text-[17px] text-bone/85 leading-relaxed mb-s-6">{featured.lede}</p>
            </div>
          </a>
        </section>
      )}

      {/* Grille articles + pagination */}
      <section className="container pb-s-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
          {articles.map((a) => (
            <ArticleCard
              key={a.id}
              href={`/publications/${a.slug}`}
              category={`${a.expertise.name} · ${a.type}`}
              date={a.publishedAt!.toLocaleDateString('fr-FR')}
              title={a.title}
              author={`${a.authors[0]?.firstName[0]}. ${a.authors[0]?.lastName}`}
              readingTime={a.readingTime}
              variant="bone"
            />
          ))}
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
