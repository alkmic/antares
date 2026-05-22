'use client';
/**
 * /admin/publications/[id]/edit — Éditeur d'article (écran central).
 *
 * DESIGN INTENT — inspirations iA Writer / Ghost
 *   - 3 chips de type (Décryptage/Alerte/Actualité), Décryptage actif en ink
 *   - Titre Fraunces 48px input plein écran sans bordure
 *   - Sous-titre Instrument Serif italique antarès (l'italique d'accent devient une fonction d'édition)
 *   - Cover drag-drop avec deux états : vide / rempli (overlay actions recadrer/remplacer/supprimer)
 *   - Toolbar flottante au-dessus de la sélection (B / I / U / lien / H2 / H3 / quote / ⌗ Bloc)
 *   - Slash menu : 2 catégories ⌗ Blocs personnalisés (À retenir, Vigilance, Citation légale) + ⌗ Structure (H2, Image)
 *   - Bloc inline À retenir rendu en preview directe (handle drag révélé au hover)
 *   - Panel droit 320px en accordéons : Statut · Auteurs · Expertise · Tags · Cover · SEO
 *   - Bouton Publier disabled tant que champs requis manquent (tooltip "⌗ Champs manquants · image cover")
 *   - Autosave pill animée + status bar bas (mots / temps lecture / blocs / mode focus)
 *   - Mobile : panel droit converti en bottom sheet drag-up
 */
import { useState, useTransition } from 'react';
import { AdminLayout, AdminPageHead, Italic } from '@/components/admin';
import { Button } from '@/components';
import type { Article, Avocat, Expertise } from '@/components/types';
import { saveDraft, publishArticle } from './actions';

interface Props { article: Article; allAvocats: Avocat[]; allExpertises: Expertise[] }

export default function ArticleEditorPage({ article, allAvocats, allExpertises }: Props) {
  const [doc, setDoc] = useState(article);
  const [pending, start] = useTransition();
  const missing = !doc.coverImage ? 'image cover' : !doc.title ? 'titre' : null;
  const canPublish = !missing;

  return (
    <AdminLayout active="publications">
      <header className="flex justify-between items-center gap-s-3 -mt-s-7 -mx-s-7 px-s-7 py-s-3 border-b border-line bg-bone">
        <nav aria-label="Fil d'Ariane" className="font-mono text-[10px] uppercase tracking-wider text-muted">
          /admin / publications / <b className="text-ink">{doc.title.slice(0, 40)}…</b>
        </nav>
        <div className="flex items-center gap-s-3">
          <span aria-live="polite" className="font-mono text-[10px] uppercase tracking-wider text-muted">⌗ Enregistré il y a 12 s</span>
          <Button variant="ghost" size="sm">Aperçu ↗</Button>
          <Button variant="ghost" size="sm" onClick={() => start(() => saveDraft(doc))}>Enregistrer brouillon</Button>
          <div className="relative group">
            <Button
              variant="ink"
              size="sm"
              disabled={!canPublish}
              onClick={() => start(() => publishArticle(doc))}
            >
              Publier <span className="font-mono">→</span>
            </Button>
            {!canPublish && (
              <div role="tooltip" className="absolute top-full mt-s-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-ink text-bone px-s-3 py-s-2 rounded-md font-mono text-[10px] uppercase tracking-wider whitespace-nowrap shadow-e-2 pointer-events-none">
                ⌗ Champs manquants · <b className="text-gold">{missing}</b>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] flex-1 -mx-s-7 -mb-s-7 overflow-hidden">
        {/* ÉDITEUR */}
        <section className="overflow-y-auto bg-bone py-s-7 px-s-7">
          <div className="max-w-[760px] mx-auto">
            <fieldset aria-label="Type d'article" className="flex gap-s-2 mb-s-7">
              {(['decryptage', 'alerte', 'actualite'] as const).map((t) => (
                <button key={t} onClick={() => setDoc({ ...doc, type: t })} className={`font-mono text-[10px] uppercase tracking-widest px-s-3 py-s-2 rounded-full border ${doc.type === t ? 'bg-ink text-bone border-ink' : 'border-line-strong text-ink-soft hover:border-ink'}`}>
                  ⌗ {t === 'decryptage' ? 'Décryptage' : t === 'alerte' ? 'Alerte' : 'Actualité'}
                </button>
              ))}
            </fieldset>

            <input
              aria-label="Titre de l'article"
              value={doc.title}
              onChange={(e) => setDoc({ ...doc, title: e.target.value })}
              placeholder="Titre de l'article"
              className="w-full bg-transparent border-0 outline-none font-display font-light text-[48px] leading-[1.05] tracking-tight pb-s-3 placeholder:text-ink/25"
            />
            <input
              aria-label="Sous-titre italique d'accent"
              value={doc.subtitle}
              onChange={(e) => setDoc({ ...doc, subtitle: e.target.value })}
              placeholder="Sous-titre italique d'accent"
              className="w-full bg-transparent border-0 outline-none font-italic italic text-[24px] leading-snug text-antares pb-s-7 placeholder:text-antares/35"
            />

            {/* Cover drag-drop · LexicalEditor avec floating toolbar et slash menu */}
            {/* Voir admin/editor-article.html pour le pattern complet de chaque sous-composant */}
          </div>
        </section>

        {/* PANEL DROITE — accordéons */}
        <aside aria-label="Réglages article" className="border-l border-line bg-bone overflow-y-auto flex flex-col">
          {/* Statut · Auteurs · Expertise · Tags · Cover · SEO */}
        </aside>
      </div>
    </AdminLayout>
  );
}
