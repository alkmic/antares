'use client';
/**
 * /admin/settings/global — réglages globaux du cabinet.
 *
 * DESIGN INTENT
 *   - 5 accordéons :
 *     01 Footer · tagline + newsletter + copyright
 *     02 Mentions légales · état "conforme · validé barreau"
 *     03 SEO par défaut · titre + desc + OG image + preview Google + schema.org LegalService
 *     04 Services connectés · Calendly (bleu) · Resend (noir) · Plausible (violet) · Cloudflare (orange) · Vercel (ink)
 *     05 Membres admin · table 6 utilisateurs · 3 rôles antarès/ink/or · MFA ON/OFF
 *   - Header accordéon : ⌗ num + titre italique + état dot + chevron rotatif
 *   - Comptes : action par service (Régénérer · Tester · Dashboard · Renouveler)
 *   - Cloudflare en état "warn" — token à renouveler avant 30.06.2026
 *   - Rappel permissions en encart ivoire chaud sous table membres
 */
import { useState } from 'react';
import { AdminLayout, AdminPageHead, Italic } from '@/components/admin';

export default function GlobalSettingsPage() {
  const [open, setOpen] = useState<Set<string>>(new Set(['01', '03', '04', '05']));
  return (
    <AdminLayout active="settings">
      <AdminPageHead
        title={<>Réglages <Italic>globaux</Italic> du cabinet</>}
        subtitle="⌗ Modifications visibles immédiatement sur antares-avocats.fr"
      />
      {/* 5 accordéons · voir admin/settings-global.html */}
    </AdminLayout>
  );
}
