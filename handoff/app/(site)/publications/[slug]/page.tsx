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
import { Brand, Italic, Callout, PullQuote, LegalCite, ArticleCard, SiteNav, SiteFooter } from '@/components';
import { ReadingProgressBar } from './reading-progress.client';
import { ArticleToc } from './toc.client';
import { ShareButtons } from './share.client';
import { getArticle, getRelatedArticles } from '@/lib/api';

interface PageProps { params: { slug: string } }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const a = await getArticle(params.slug);
  if (!a) return {};
  return {
    title: a.seoTitle,
    description: a.seoDescription,
    alternates: { canonical: `/publications/${params.slug}` },
    openGraph: {
      title: a.title,
      description: a.lede,
      images: a.coverImage ? [{ url: a.coverImage, width: 1200, height: 630 }] : [],
      type: 'article',
      publishedTime: a.publishedAt?.toISOString(),
      authors: a.authors.map((au) => `${au.firstName} ${au.lastName}`),
    },
  };
}

/**
 * /publications/[slug] — long-read SEO critique.
 *
 * DESIGN INTENT (le plus important)
 *   - Progress bar fixe haut (2px antarès glow)
 *   - Header monumental · titre Fraunces 88px + sous-titre Instrument italique 32px
 *   - Byline avec stats lectures/partages/références
 *   - Cover 21:9 full-width
 *   - Corps 720px max · drop cap 88px Fraunces antarès sur premier para
 *   - H2 numérotés via data-num CSS attr (⌗ 01 — Cadre juridique)
 *   - Dek italique muet sous chaque H2 (style Esprit / Diplo)
 *   - Callouts À retenir (filet antarès) + Point de vigilance (filet or)
 *   - Citation légale bloc encre + guillemet rouge
 *   - Pull-quote serif 28px filet ink
 *   - TOC sticky droite (scrollspy)
 *   - Fin : signature + share + à lire aussi + newsletter inline
 */
export default async function ArticlePage({ params }: PageProps) {
  const article = await getArticle(params.slug);
  if (!article) notFound();

  const related = await getRelatedArticles({ articleId: article.id, limit: 3 });
  const author = article.authors[0];

  return (
    <>
      <ReadingProgressBar />
      <SiteNav active="/publications" />

      {/* Breadcrumb */}
      <nav aria-label="Fil d'Ariane" className="border-b border-line">
        <div className="container py-s-3 font-mono text-[10px] uppercase tracking-widest text-muted">
          <a href="/" className="no-underline text-muted hover:text-antares">Accueil</a>
          <span aria-hidden className="mx-s-3 text-ink/25">/</span>
          <a href="/publications" className="no-underline text-muted hover:text-antares">Publications</a>
          <span aria-hidden className="mx-s-3 text-ink/25">/</span>
          <b className="text-ink font-medium">{article.title}</b>
        </div>
      </nav>

      {/* HEADER */}
      <header className="py-s-8 lg:py-s-9 border-b border-line">
        <div className="container">
          <div className="max-w-[920px] mx-auto">
            <div className="flex gap-s-4 mb-s-7 font-mono text-mono-label uppercase text-muted">
              <span className="bg-antares text-bone px-s-3 py-1">⌗ {article.type}</span>
              <span>{article.expertise.name}</span>
              <span>{article.publishedAt!.toLocaleDateString('fr-FR')}</span>
              <span>{article.readingTime} min de lecture</span>
            </div>
            <h1 className="font-display font-light text-[clamp(40px,6.5vw,88px)] leading-[0.98] tracking-[-0.03em] mb-s-5">
              {article.title}
            </h1>
            <p className="font-italic italic text-[clamp(22px,2.6vw,32px)] leading-snug text-antares mb-s-7 max-w-[800px]">
              {article.subtitle}
            </p>
            {/* BYLINE */}
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-s-7 items-center pt-s-6 border-t border-line">
              <div className="flex items-center gap-s-4">
                <div className="w-13 h-13 rounded-full bg-gradient-to-br from-bone-warm to-[#c1a87d] flex items-center justify-center font-display font-light text-[19px] text-ink">
                  {author?.firstName[0]}{author?.lastName[0]}
                </div>
                <div>
                  <div className="font-display text-[18px] font-medium">{author?.firstName} {author?.lastName}</div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-muted">⌗ {author?.role}</div>
                </div>
              </div>
              <div />
              <dl className="hidden md:flex gap-s-7 font-mono text-mono-label text-muted">
                <div><dt className="font-display text-[17px] font-medium text-ink normal-case tracking-normal">{article.viewCount}</dt>lectures</div>
              </dl>
            </div>
          </div>
        </div>
      </header>

      {/* COVER 21:9 */}
      <div className="py-s-9">
        <div className="container">
          <div className="aspect-[21/9] bg-gradient-to-br from-antares-deep to-antares relative overflow-hidden">
            {article.coverImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={article.coverImage} alt={article.title} className="absolute inset-0 w-full h-full object-cover" />
            )}
          </div>
        </div>
      </div>

      {/* BODY GRID — corps + TOC sticky */}
      <div className="container pb-s-10 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-s-10 items-start">
        <main className="max-w-[720px] mx-auto lg:mx-0 lg:ml-auto font-body text-[18px] leading-[1.75] text-ink">
          {/* Rendu Lexical avec drop cap CSS sur :first-of-type::first-letter */}
          {/* Voir publication-ia-generative.html pour la structure des sections H2 numérotées, callouts, citation légale, pullquote */}
        </main>

        <aside className="lg:sticky lg:top-[100px] h-fit">
          <ArticleToc />
        </aside>
      </div>

      {/* FIN — SIGNATURE + SHARE */}
      <section className="border-t border-b border-line bg-bone-warm py-s-7">
        <div className="container max-w-[720px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto] gap-s-7 items-center">
          <div className="flex items-center gap-s-5">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-bone to-[#c1a87d] flex items-center justify-center font-display font-light text-[24px] text-ink">
              {author?.firstName[0]}{author?.lastName[0]}
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-antares">⌗ Article signé</div>
              <div className="font-display text-[21px]">{author?.firstName} {author?.lastName}</div>
            </div>
          </div>
          <ShareButtons slug={article.slug} title={article.title} />
        </div>
      </section>

      {/* À LIRE AUSSI + NEWSLETTER INLINE — voir publication-ia-generative.html */}
      <SiteFooter />
    </>
  );
}
