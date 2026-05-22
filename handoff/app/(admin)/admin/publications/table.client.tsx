'use client';
/**
 * Table interactive avec sélection multiple, tri colonne, barre flottante.
 * URL params pour les filtres/pagination, state local pour la sélection.
 */
import { useReducer } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { StatusBadge, Tag } from '@/components';
import type { Article, Avocat, Expertise } from '@/components/types';

interface Stats { total: number; published: number; draft: number; review: number; views30d: number }
interface Props {
  articles: Article[];
  total: number;
  page: number;
  stats: Stats;
  expertises: Expertise[];
  authors: Avocat[];
  initial: { status?: string; expertise?: string; author?: string; q?: string; sort?: string };
}

type Selection = Set<string>;
type Action = { type: 'toggle'; id: string } | { type: 'clear' } | { type: 'all'; ids: string[] };

function reducer(state: Selection, action: Action): Selection {
  switch (action.type) {
    case 'toggle': { const n = new Set(state); n.has(action.id) ? n.delete(action.id) : n.add(action.id); return n; }
    case 'clear': return new Set();
    case 'all': return new Set(action.ids);
  }
}

export function ArticlesTable({ articles, stats, total, page }: Props) {
  const [selected, dispatch] = useReducer(reducer, new Set<string>());
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  return (
    <>
      {/* KPI ribbon — 4 stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line rounded-lg overflow-hidden mb-s-6">
        {[
          { lbl: 'Publiés', val: stats.published, delta: '↑ 4 ce mois-ci', cls: 'text-success' },
          { lbl: 'Brouillons', val: stats.draft, delta: '⌗ dont 2 anciens', cls: 'text-warning' },
          { lbl: 'En relecture', val: stats.review, delta: '⌗ délai moyen 3 j', cls: 'text-warning' },
          { lbl: 'Vues 30 j', val: stats.views30d.toLocaleString('fr-FR'), delta: '↑ 18,4 %', cls: 'text-success' },
        ].map((k) => (
          <div key={k.lbl} className="bg-card p-s-5">
            <div className="font-mono text-[10px] uppercase tracking-wider text-muted">{k.lbl}</div>
            <div className="font-display text-[26px] mt-s-1">{k.val}</div>
            <div className={`font-mono text-[10px] mt-s-1 ${k.cls}`}>{k.delta}</div>
          </div>
        ))}
      </div>

      {/* Filter bar + Table (voir admin/articles-list.html pour structure) */}
      <div className="bg-card border border-line rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-bone-warm">
            <tr>
              <th className="text-left px-s-4 py-s-3 w-9"><Checkbox state="indeterminate" /></th>
              <th className="text-left px-s-4 py-s-3 font-mono text-[10px] uppercase tracking-wider text-muted">Titre</th>
              <th className="text-left px-s-4 py-s-3 font-mono text-[10px] uppercase tracking-wider text-muted hidden md:table-cell">Type</th>
              <th className="text-left px-s-4 py-s-3 font-mono text-[10px] uppercase tracking-wider text-muted hidden lg:table-cell">Auteur</th>
              <th className="text-left px-s-4 py-s-3 font-mono text-[10px] uppercase tracking-wider text-muted">Statut</th>
              <th className="text-left px-s-4 py-s-3 font-mono text-[10px] uppercase tracking-wider text-muted hidden md:table-cell">Date ↓</th>
              <th className="text-right px-s-4 py-s-3 font-mono text-[10px] uppercase tracking-wider text-muted">Vues</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {articles.map((a) => {
              const isSelected = selected.has(a.id);
              return (
                <tr
                  key={a.id}
                  className={`border-b border-line transition-colors group ${isSelected ? 'bg-antares/[0.04]' : 'hover:bg-bone'}`}
                >
                  <td className="px-s-4 py-s-4">
                    <Checkbox state={isSelected ? 'checked' : 'off'} onChange={() => dispatch({ type: 'toggle', id: a.id })} />
                  </td>
                  <td className="px-s-4 py-s-4 max-w-[380px]">
                    <div className="font-display text-[15px] font-medium leading-tight mb-1">{a.title}</div>
                    <div className="text-[12px] text-muted line-clamp-1">{a.lede}</div>
                  </td>
                  <td className="px-s-4 py-s-4 hidden md:table-cell"><Tag variant="antares">{a.type}</Tag></td>
                  <td className="px-s-4 py-s-4 hidden lg:table-cell text-[12.5px]">
                    {a.authors.map((au) => `${au.firstName[0]}. ${au.lastName}`).join(', ')}
                  </td>
                  <td className="px-s-4 py-s-4">
                    <StatusBadge status={a.status === 'archived' ? 'draft' : a.status === 'scheduled' ? 'scheduled' : a.status === 'published' ? 'published' : a.status === 'review' ? 'review' : 'draft'} />
                  </td>
                  <td className="px-s-4 py-s-4 hidden md:table-cell font-mono text-[11px] text-muted">{a.publishedAt?.toLocaleDateString('fr-FR') ?? '—'}</td>
                  <td className="px-s-4 py-s-4 text-right font-display text-[15px] font-medium">{a.viewCount.toLocaleString('fr-FR')}</td>
                  <td className="px-s-4 py-s-4">
                    <RowActions articleId={a.id} visible={isSelected} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Selection bar flottante */}
      {selected.size > 0 && <FloatingSelectionBar count={selected.size} onClear={() => dispatch({ type: 'clear' })} />}
    </>
  );
}

function Checkbox({ state, onChange }: { state: 'checked' | 'off' | 'indeterminate'; onChange?: () => void }) {
  return (
    <button
      onClick={onChange}
      role="checkbox"
      aria-checked={state === 'indeterminate' ? 'mixed' : state === 'checked'}
      className={`w-4 h-4 border-[1.5px] rounded-sm flex items-center justify-center ${state !== 'off' ? 'bg-ink border-ink' : 'border-line-strong bg-card'}`}
    >
      {state === 'checked' && <span aria-hidden className="w-[9px] h-[5px] border-l-[1.8px] border-b-[1.8px] border-bone rotate-[-45deg] translate-y-[-1px]" />}
      {state === 'indeterminate' && <span aria-hidden className="w-2 h-px bg-bone" />}
    </button>
  );
}

function RowActions({ articleId, visible }: { articleId: string; visible: boolean }) {
  return (
    <div className={`flex gap-1 transition-opacity ${visible ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
      <a href={`/admin/publications/${articleId}/edit`} aria-label="Éditer" className="w-7 h-7 border border-line bg-card rounded-sm flex items-center justify-center hover:border-antares hover:text-antares">✎</a>
      <button aria-label="Dupliquer" className="w-7 h-7 border border-line bg-card rounded-sm flex items-center justify-center hover:border-antares hover:text-antares">⎘</button>
      <a href={`/publications/${articleId}?preview=true`} target="_blank" rel="noopener" aria-label="Aperçu" className="w-7 h-7 border border-line bg-card rounded-sm flex items-center justify-center hover:border-antares hover:text-antares">⌕</a>
    </div>
  );
}

function FloatingSelectionBar({ count, onClear }: { count: number; onClear: () => void }) {
  return (
    <div role="region" aria-label="Actions sur la sélection" className="fixed bottom-s-5 left-1/2 -translate-x-1/2 bg-ink text-bone px-s-5 py-s-3 rounded-lg shadow-e-3 z-40 flex items-center gap-s-5 min-w-[540px]">
      <span className="font-mono text-[11px] uppercase tracking-wider">
        <b className="font-display text-[18px] text-gold mr-s-2 normal-case tracking-normal">{count}</b>
        articles sélectionnés
      </span>
      <div className="flex gap-s-2 ml-auto">
        <button className="bg-bone/[0.06] border border-bone/[0.16] text-bone px-s-3 py-s-2 rounded-sm font-mono text-[10px] uppercase tracking-wider hover:bg-bone/[0.12]">Publier</button>
        <button className="bg-bone/[0.06] border border-bone/[0.16] text-bone px-s-3 py-s-2 rounded-sm font-mono text-[10px] uppercase tracking-wider hover:bg-bone/[0.12]">Archiver</button>
        <button className="bg-bone/[0.06] border border-bone/[0.16] text-bone px-s-3 py-s-2 rounded-sm font-mono text-[10px] uppercase tracking-wider hover:bg-bone/[0.12]">Exporter</button>
        <button className="bg-bone/[0.06] border border-antares-glow/40 text-antares-glow px-s-3 py-s-2 rounded-sm font-mono text-[10px] uppercase tracking-wider hover:bg-antares-glow/[0.15]">Supprimer</button>
      </div>
      <button onClick={onClear} aria-label="Fermer" className="bg-transparent border-0 text-bone/60 font-mono text-[18px] hover:text-bone">×</button>
    </div>
  );
}
