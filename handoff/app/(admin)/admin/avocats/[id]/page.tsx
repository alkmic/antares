'use client';
/**
 * /admin/avocats/[id] — fiche avocat éditable (2 colonnes 360 + 1fr).
 *
 * DESIGN INTENT
 *   - Col gauche · 4 cards : Photo 4:5 (actions overlay) · Identité · Contact · Profil
 *   - Col droite · 6 cards : Bio courte · Bio longue rich-text · Expertises multi-select · Ordre drag · Toggles · Publish encre
 *   - Rich-text bio : toolbar inline avec rendu live des italiques d'accent Instrument Serif
 *   - Drag-handle ⠿ react-dnd · current row antarès light
 *   - 5 toggles : is_partner · is_published · active_calendly · notify_bookings · legacy
 */
import { useState } from 'react';
import { AdminLayout, AdminPageHead, Italic } from '@/components/admin';
import { Input, Button, FieldLabel } from '@/components';
import type { Avocat, Expertise } from '@/components/types';
import { updateAvocat } from './actions';

export default function AvocatEditPage({ avocat, allExpertises, allAvocats }: { avocat: Avocat; allExpertises: Expertise[]; allAvocats: Avocat[] }) {
  const [draft, setDraft] = useState(avocat);
  return (
    <AdminLayout active="avocats">
      <AdminPageHead
        title={<>Fiche · <Italic>{draft.firstName} {draft.lastName}</Italic></>}
        subtitle={`⌗ ${draft.role} · publié · ${draft.publicationsCount} publications signées`}
        actions={
          <>
            <span className="font-mono text-[10px] uppercase tracking-wider text-success flex items-center gap-s-2">
              <span className="w-[7px] h-[7px] rounded-full bg-success" />⌗ Enregistré il y a 4 s
            </span>
            <a href={`/avocats/${draft.slug}`} target="_blank" rel="noopener" className="btn btn-ghost btn-sm">↗ Voir sur le site</a>
            <Button onClick={() => updateAvocat(draft)}>Enregistrer</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-s-6">
        <div className="space-y-s-5">
          {/* Card 01 — Photo 4/5 avec overlay actions */}
          {/* Card 02 — Identité (prénom · nom · slug · rôle) */}
          {/* Card 03 — Contact (email pro · téléphone direct · calendly URL · LinkedIn) */}
          {/* Card 04 — Profil (barreau · formation · langues pills) */}
        </div>
        <div className="space-y-s-5">
          {/* Card 05 — Bio courte (textarea + compteur 240) */}
          {/* Card 06 — Bio longue rich-text (Lexical editor avec floating toolbar) */}
          {/* Card 07 — Expertises rattachées (multi-select pills) */}
          {/* Card 08 — Ordre d'affichage (drag-handle ⠿ react-dnd) */}
          {/* Card 09 — Réglages (5 toggles) */}
          {/* Card 10 — Publish card encre */}
        </div>
      </div>
    </AdminLayout>
  );
}
