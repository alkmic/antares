'use client';
/**
 * /admin/rendez-vous — liste / calendrier des RDV.
 *
 * DESIGN INTENT
 *   - Toggle table ↔ calendrier (topbar)
 *   - Filter bar : pills Période · Avocat (mini-avatar) · Lieu · Statut
 *   - Vue calendrier semaine — grille 6 col (heure + 5 jours ouvrés), today en antarès
 *   - Appointments couleur : visio antarès · cabinet or · terminé/entretien vert
 *   - Selected · fond encre + filet or
 *   - Drawer latéral 380px sur sélection
 *   - 5 blocs drawer : Client · RDV · Statut (select éditable) · Demande initiale · Notes post-RDV (textarea + autosave)
 *   - Actions drawer : Visio · Email · Marquer terminé · Annuler (danger)
 */
import { useState } from 'react';
import { AdminLayout, AdminPageHead, Italic } from '@/components/admin';
import type { Booking } from '@/components/types';

interface Props { bookings: Booking[] }

export default function BookingsPage({ bookings }: Props) {
  const [view, setView] = useState<'table' | 'calendar'>('calendar');
  const [selected, setSelected] = useState<Booking | null>(null);
  return (
    <AdminLayout active="rendez-vous">
      <AdminPageHead
        title={<>Rendez-vous · <Italic>cette semaine</Italic></>}
        subtitle="⌗ 11 RDV programmés · semaine 21 · 18 → 24 mai 2026"
        actions={
          <div role="group" aria-label="Vue" className="flex bg-bone-warm rounded-md p-[3px]">
            <button onClick={() => setView('table')}    className={`px-s-4 py-s-2 rounded-sm font-mono text-[10px] uppercase tracking-wider ${view === 'table' ? 'bg-card text-ink shadow-e-1' : 'text-muted'}`}>Table</button>
            <button onClick={() => setView('calendar')} className={`px-s-4 py-s-2 rounded-sm font-mono text-[10px] uppercase tracking-wider ${view === 'calendar' ? 'bg-card text-ink shadow-e-1' : 'text-muted'}`}>Calendrier</button>
          </div>
        }
      />
      {/* Calendar / table view + Drawer · voir admin/rendez-vous-list.html */}
    </AdminLayout>
  );
}
