/**
 * Antares · Composants admin partagés (sidebar, topbar, KPI, drawer, etc.)
 * À monter dans handoff/components/admin.tsx — exporté à part de components/index.tsx pour le code-splitting.
 */
import type { ReactNode } from 'react';
import { Brand, BrandMark } from '.';

const NAV_GROUPS = [
  { label: 'Pilotage',  items: [{ key: 'dashboard', label: 'Tableau de bord', href: '/admin' }, { key: 'stats', label: 'Statistiques', href: '/admin/stats' }] },
  { label: 'Contenu',   items: [{ key: 'publications', label: 'Publications', href: '/admin/publications', badge: 3 }, { key: 'avocats', label: 'Avocats', href: '/admin/avocats' }, { key: 'expertises', label: 'Expertises', href: '/admin/expertises' }, { key: 'medias', label: 'Médias', href: '/admin/medias' }] },
  { label: 'Relations', items: [{ key: 'rendez-vous', label: 'Rendez-vous', href: '/admin/rendez-vous', badge: 7 }, { key: 'candidatures', label: 'Candidatures', href: '/admin/candidatures', badge: 2 }, { key: 'newsletter', label: 'Newsletter', href: '/admin/newsletter' }] },
  { label: 'Système',   items: [{ key: 'settings', label: 'Réglages', href: '/admin/settings/global' }] },
] as const;

interface AdminLayoutProps { active: string; children: ReactNode }
export function AdminLayout({ active, children }: AdminLayoutProps) {
  return (
    <div className="grid grid-cols-[240px_1fr] h-screen overflow-hidden">
      <AdminSidebar active={active} />
      <main className="flex flex-col h-screen overflow-hidden bg-bone">
        <AdminTopbar />
        <div className="flex-1 overflow-y-auto p-s-6 lg:p-s-7">{children}</div>
      </main>
    </div>
  );
}

function AdminSidebar({ active }: { active: string }) {
  return (
    <aside className="bg-ink text-bone overflow-y-auto flex flex-col py-s-5">
      <div className="px-s-5 pb-s-5 border-b border-ink-line">
        <Brand variant="bone" />
      </div>
      {NAV_GROUPS.map((g) => (
        <nav key={g.label} className="px-s-3 pt-s-5" aria-label={g.label}>
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-bone/40 px-s-2 pb-s-2">⌗ {g.label}</div>
          <ul className="flex flex-col gap-px">
            {g.items.map((it) => (
              <li key={it.key}>
                <a
                  href={it.href}
                  className={`relative flex items-center gap-s-3 px-s-3 py-[9px] no-underline rounded-md text-[13px] font-medium transition-colors ${
                    active === it.key
                      ? 'bg-antares/[0.18] text-bone before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[2px] before:bg-antares before:rounded-r'
                      : 'text-bone/70 hover:bg-bone/[0.05] hover:text-bone'
                  }`}
                >
                  {it.label}
                  {'badge' in it && it.badge ? <span className="ml-auto bg-antares text-bone font-mono text-[9px] px-s-2 py-px rounded-full">{it.badge}</span> : null}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ))}
      <AdminUserFooter />
    </aside>
  );
}

function AdminUserFooter() {
  return (
    <div className="mt-auto px-s-5 py-s-4 border-t border-ink-line flex items-center gap-s-3">
      <div className="w-9 h-9 rounded-full bg-antares text-bone font-display text-[13px] flex items-center justify-center">AB</div>
      <div>
        <div className="text-[13px] font-semibold text-bone">Antoine Baudart</div>
        <div className="font-mono text-[9px] tracking-wider text-bone/50 uppercase">⌗ Associé · Admin</div>
      </div>
    </div>
  );
}

function AdminTopbar() {
  return (
    <header className="bg-bone border-b border-line px-s-7 py-s-3 flex justify-between items-center sticky top-0 z-10">
      {/* Breadcrumb auto-généré via segment.tsx ou next-breadcrumbs */}
      <nav aria-label="Fil d'Ariane" className="font-mono text-[10px] uppercase tracking-wider text-muted">/admin</nav>
      <div className="flex items-center gap-s-3">
        <button aria-label="Notifications" className="w-8 h-8 bg-card border border-line rounded-md flex items-center justify-center relative">
          <span className="absolute top-[5px] right-[5px] w-[7px] h-[7px] rounded-full bg-antares border-[1.5px] border-bone" />
        </button>
        <a href="/" aria-label="Voir le site" className="w-8 h-8 bg-card border border-line rounded-md flex items-center justify-center">↗</a>
      </div>
    </header>
  );
}

interface AdminPageHeadProps { title: ReactNode; subtitle?: string; actions?: ReactNode }
export function AdminPageHead({ title, subtitle, actions }: AdminPageHeadProps) {
  return (
    <header className="flex justify-between items-end gap-s-5 mb-s-6 flex-wrap">
      <div>
        <h1 className="font-display font-light text-[38px] leading-tight tracking-tight">{title}</h1>
        {subtitle && <div className="font-mono text-[11px] uppercase tracking-wider text-muted mt-s-2">{subtitle}</div>}
      </div>
      {actions && <div className="flex gap-s-2 items-center">{actions}</div>}
    </header>
  );
}

/** Re-export Italic depuis components/index.tsx */
export { Italic } from '.';
