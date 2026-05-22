'use client';
/**
 * /admin/settings/notifications — préférences notifications par utilisateur.
 *
 * DESIGN INTENT
 *   - Settings nav tabs · Profil · Notifications (active) · Sécurité · Préférences · Globaux
 *   - Lede encart ivoire chaud filet antarès
 *   - Quick stats 3 KPI (emails 30j · 9/11 templates · provider Resend live)
 *   - 4 groupes thématiques : RDV · Éditorial · Recrutement · Digests
 *   - Header par groupe : ⌗ num + titre italique + master toggle
 *   - Rangée event · icône colorée + name italique + desc + template `BookingNotification.tsx` + stats reçus 30j + toggle
 *   - Disabled · opacité 0.5 + toggle off
 *   - Zone critique en bas : "Désactiver toutes les notifications · mode vacances" (bouton danger contour antarès)
 */
import { useState } from 'react';
import { AdminLayout, AdminPageHead, Italic } from '@/components/admin';
import type { NotificationPreferences } from '@/components/types';
import { savePreferences } from './actions';

export default function NotificationsSettingsPage({ initial }: { initial: NotificationPreferences }) {
  const [prefs, setPrefs] = useState(initial);

  function toggle<K extends keyof NotificationPreferences>(key: K) {
    const next = { ...prefs, [key]: !prefs[key] };
    setPrefs(next);
    void savePreferences(next); // autosave optimiste 300ms debounce
  }

  return (
    <AdminLayout active="settings">
      <nav aria-label="Sections de réglages" className="flex gap-s-2 mb-s-8 border-b border-line -mx-s-7 px-s-7">
        {[
          { href: '/admin/settings/profile',       label: 'Profil' },
          { href: '/admin/settings/notifications', label: 'Notifications', active: true },
          { href: '/admin/settings/security',      label: 'Sécurité & MFA' },
          { href: '/admin/settings/preferences',   label: 'Préférences' },
          { href: '/admin/settings/global',        label: 'Réglages globaux' },
        ].map((t) => (
          <a key={t.href} href={t.href} className={`font-mono text-[10.5px] uppercase tracking-wider px-s-4 py-s-3 -mb-px no-underline border-b-2 ${t.active ? 'border-antares text-antares' : 'border-transparent text-muted hover:text-ink'}`}>
            ⌗ {t.label}
          </a>
        ))}
      </nav>

      <AdminPageHead
        title={<>Notifications <Italic>email</Italic></>}
        subtitle="⌗ Antoine Baudart · associé · 9 templates actifs"
      />

      {/* 4 groupes accordéons · zone critique en bas */}
    </AdminLayout>
  );
}
