'use client';
/**
 * /admin/medias — médiathèque.
 *
 * DESIGN INTENT
 *   - Dropzone pointillé · 52px ronde antarès · clic ou drag
 *   - Upload en cours : strip ivoire chaud avec barre progress %
 *   - Filtres chips : Tous · Utilisés · Non utilisés · 3 catégories + mois select + view toggle grille/liste
 *   - Layout split : panel détail 380px gauche + grille 16 tuiles droite
 *   - Tuiles : placeholder striped variantes (antarès / gold / ink / warm / cool) si pas de cover
 *   - Mini-badges : "utilisé · 2" success ou "⌗ inutilisé" warning
 *   - Hover tuile : overlay encre 70% + 3 boutons pastilles (zoom · éditer · supprimer)
 *   - Panel détail : preview 16/9 avec crop overlay (4 handles + cadre dashed) · meta · usages · URL publique copy-row · actions
 */
import { useState } from 'react';
import { AdminLayout, AdminPageHead, Italic } from '@/components/admin';
import type { MediaAsset } from '@/components/types';

export default function MediasPage({ medias }: { medias: MediaAsset[] }) {
  const [selected, setSelected] = useState<MediaAsset | null>(medias[0] ?? null);
  return (
    <AdminLayout active="medias">
      <AdminPageHead
        title={<>Médiathèque · <Italic>{medias.length} fichiers</Italic></>}
        subtitle="⌗ 384 Mo / 5 Go · stockage Vercel Blob · 2 non utilisés"
      />
      {/* Dropzone + upload strip + filtres + grid + detail panel · voir admin/mediatheque.html */}
    </AdminLayout>
  );
}
