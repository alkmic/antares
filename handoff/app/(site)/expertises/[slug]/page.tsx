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
import { Brand, Eyebrow, Italic, Dot, SectionHead, Callout, PullQuote, LegalCite, AvocatCard, ArticleCard, Button, SiteNav, SiteFooter } from '@/components';
import { getExpertise, getRelatedArticles } from '@/lib/api';

interface PageProps { params: { slug: string } }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const expertise = await getExpertise(params.slug);
  if (!expertise) return {};
  return {
    title: `${expertise.name} — Antares Avocats`,
    description: expertise.lede,
    alternates: { canonical: `/expertises/${params.slug}` },
  };
}

/**
 * /expertises/[slug] — page expertise (exemple : droit-social).
 *
 * DESIGN INTENT
 *   - Hero asymétrique 1.1fr / 380px · italiques d'accent 1-3 mots
 *   - Bandeau scope sous hero : 4 cellules méta sur ivoire chaud
 *   - 6 sections H2 numérotées avec callouts À retenir / Point de vigilance
 *   - Pull-quote jurisprudentielle stylée
 *   - TOC sticky droite desktop, accordion mobile
 *   - Avocats référents (4 cards) + publications associées (3 cards encre) + CTA RDV
 */
export default async function ExpertisePage({ params }: PageProps) {
  const expertise = await getExpertise(params.slug);
  if (!expertise) notFound();

  const relatedArticles = await getRelatedArticles({ expertiseId: expertise.id, limit: 3 });

  return (
    <>
      <SiteNav active="/expertises" />

      {/* BREADCRUMB */}
      <nav aria-label="Fil d'Ariane" className="border-b border-line">
        <div className="container py-s-3 font-mono text-[10px] uppercase tracking-widest text-muted">
          <a href="/" className="text-muted no-underline hover:text-antares">Accueil</a>
          <span aria-hidden className="mx-s-3 text-ink/25">/</span>
          <a href="/expertises" className="text-muted no-underline hover:text-antares">Expertises</a>
          <span aria-hidden className="mx-s-3 text-ink/25">/</span>
          <b className="text-ink font-medium">{expertise.name}</b>
        </div>
      </nav>

      {/* HERO ASYMÉTRIQUE */}
      <section className="container py-s-10 lg:py-s-11">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-s-9 lg:gap-s-10 items-end">
          <div>
            <Eyebrow withRule num="02">Expertise · {expertise.slug}</Eyebrow>
            <h1 className="font-display font-light text-[clamp(56px,9vw,128px)] leading-[0.92] tracking-[-0.035em] mt-s-7">
              Le {expertise.name.toLowerCase()},<br />
              <Italic className="block">au plus près</Italic>
              du terrain<Dot />
            </h1>
          </div>
          <aside className="pb-s-3">
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted mb-s-4 pb-s-3 border-b border-line">
              ⌗ Périmètre &nbsp;·&nbsp; <b className="text-ink font-medium">Employeurs · ETI · dirigeants</b>
            </div>
            <p className="font-display font-light text-[22px] leading-relaxed text-ink-soft mb-s-5">
              Conseil et contentieux pour les <Italic>directions</Italic> qui anticipent.
            </p>
            <div className="flex gap-s-3 flex-wrap">
              <Button variant="antares" asChild><a href="#cta">Prendre rendez-vous <span className="font-mono">→</span></a></Button>
              <Button variant="ghost" asChild><a href="#equipe">Avocats référents</a></Button>
            </div>
          </aside>
        </div>
      </section>

      {/* SCOPE BAR */}
      <div className="bg-bone-warm border-t border-b border-line py-s-6">
        <div className="container grid grid-cols-2 lg:grid-cols-4 gap-s-7">
          {/* 4 cellules : Clients · Équipe · Délai · Modes — voir maquette pour contenu */}
        </div>
      </div>

      {/* CORPS + TOC STICKY */}
      <div className="container py-s-10 grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-s-9 lg:gap-s-10">
        <article className="max-w-[720px] space-y-s-9">
          {/* 6 H2 numérotées : 01 Notre approche · 02 Relations individuelles · 03 Relations collectives · 04 Contentieux · 05 Restructurations · 06 Protection sociale */}
          <section id="approche">
            <h2 className="font-display font-light text-h1">
              <span className="block font-mono text-mono-label uppercase text-antares mb-s-3">⌗ 01</span>
              Notre <Italic>approche</Italic>.
            </h2>
            <p>Le droit social ne se résume pas à un code et à une jurisprudence. C&apos;est un <strong>équilibre</strong>…</p>
            <Callout title={<>80 % des contentieux <Italic>prud&apos;homaux</Italic> trouvent leur cause dans un acte posé deux à trois ans plus tôt.</>}>
              Une bonne pratique du droit social commence par la rédaction du contrat de travail…
            </Callout>
            <PullQuote>« L&apos;employeur dispose d&apos;un pouvoir de direction qu&apos;il exerce dans le respect des <Italic>libertés individuelles</Italic>. »</PullQuote>
            <LegalCite reference="Cass. soc. 28 mai 2003 · n° 02-40.273">
              L&apos;employeur dispose d&apos;un pouvoir de direction qu&apos;il exerce dans le respect des libertés individuelles.
            </LegalCite>
          </section>
          {/* … sections 02 → 06 (voir maquette HTML) */}
        </article>

        <aside className="lg:sticky lg:top-[100px] h-fit">
          {/* TOC scrollspy — composant client à créer dans /components/Toc.client.tsx */}
        </aside>
      </div>

      {/* AVOCATS RÉFÉRENTS */}
      <section id="equipe" className="bg-bone-warm border-t border-b border-line py-s-10">
        <div className="container">
          <SectionHead num="07" label="Équipe" title={<>Quatre <Italic>visages</Italic> pour vos dossiers de {expertise.name.toLowerCase()}.</>} />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-s-6">
            {expertise.relatedAvocats.map((a) => (
              <AvocatCard
                key={a.id}
                href={`/avocats/${a.slug}`}
                initials={`${a.firstName[0]}${a.lastName[0]}`}
                role={a.role}
                fullName={`${a.firstName} ${a.lastName}`}
                specialty=""
                photoUrl={a.photo ?? undefined}
              />
            ))}
          </div>
        </div>
      </section>

      {/* PUBLICATIONS ASSOCIÉES — fond encre */}
      <section className="bg-ink py-s-10">
        <div className="container">
          <SectionHead num="08" label="Publications" title={<>Les <Italic>décryptages</Italic> de l&apos;équipe {expertise.name.toLowerCase()}.</>} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-s-6">
            {relatedArticles.map((a) => (
              <ArticleCard
                key={a.id}
                href={`/publications/${a.slug}`}
                category={a.expertise.name}
                date={a.publishedAt!.toLocaleDateString('fr-FR')}
                title={a.title}
                author={a.authors[0]?.firstName + ' ' + a.authors[0]?.lastName}
                readingTime={a.readingTime}
                variant="ink"
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL — voir cabinet.html pour pattern */}
      <SiteFooter />
    </>
  );
}
