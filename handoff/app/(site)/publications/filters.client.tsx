'use client';
/**
 * Filtres /publications — client component (état URL synchronisé).
 * Sticky sous nav, 2 niveaux (chips expertises + search) puis (selects auteur/tri/période).
 */
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useTransition } from 'react';
import type { Expertise, Avocat } from '@/components/types';

interface Props {
  expertises: Expertise[];
  authors: Avocat[];
  initial: { expertise?: string; author?: string; sort?: string; q?: string };
  total: number;
  page: number;
}

export function PublicationsFilters({ expertises, authors, initial, total, page }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [pending, start] = useTransition();

  function setParam(key: string, value: string | null) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value); else next.delete(key);
    next.delete('page');
    start(() => router.push(`${pathname}?${next.toString()}`));
  }

  return (
    <div className="sticky top-[64px] z-40 bg-bone/95 backdrop-blur-xl border-b border-line">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-s-6 items-center py-s-5">
          <div className="flex gap-s-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            <button
              onClick={() => setParam('expertise', null)}
              className={cn(
                'font-mono text-[10px] uppercase tracking-wider px-s-3 py-s-2 rounded-full whitespace-nowrap border',
                !initial.expertise ? 'bg-ink text-bone border-ink' : 'bg-transparent text-ink-soft border-line-strong hover:border-ink'
              )}
            >⌗ Toutes</button>
            {expertises.map((e) => (
              <button
                key={e.id}
                onClick={() => setParam('expertise', e.slug)}
                className={cn(
                  'font-mono text-[10px] uppercase tracking-wider px-s-3 py-s-2 rounded-full whitespace-nowrap border',
                  initial.expertise === e.slug ? 'bg-ink text-bone border-ink' : 'bg-transparent text-ink-soft border-line-strong hover:border-ink'
                )}
              >{e.name}</button>
            ))}
          </div>
          <input
            type="search"
            defaultValue={initial.q}
            placeholder="Rechercher un sujet, un texte, une décision…"
            onChange={(e) => setParam('q', e.target.value || null)}
            aria-label="Recherche"
            className="bg-card border border-line-strong rounded-md px-s-4 py-s-3 font-body text-[13px] text-ink outline-none focus:border-antares"
          />
        </div>
        {/* ligne 2 : selects auteur/tri/période + compteur */}
      </div>
    </div>
  );
}

// import utilitaire
function cn(...c: (string | undefined | false)[]) { return c.filter(Boolean).join(' '); }
