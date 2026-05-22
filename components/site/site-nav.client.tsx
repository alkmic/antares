'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Brand } from '@/components/ui';
import { cn } from '@/lib/cn';

const NAV_LINKS = [
  { href: '/cabinet', label: 'Le cabinet' },
  { href: '/expertises', label: 'Expertises' },
  { href: '/publications', label: 'Publications' },
  { href: '/avocats', label: 'Équipe' },
  { href: '/contact', label: 'Contact' },
];

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  // Ferme le menu mobile à la navigation et à l'Échap.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-bone/[0.92] backdrop-blur-xl border-b border-line">
      <div className="container">
        <div className="flex items-center justify-between py-s-5">
          <Brand />

          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex gap-s-7 text-[13px] font-medium tracking-wider">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={isActive(l.href) ? 'page' : undefined}
                    className={cn(
                      'py-1 no-underline transition-colors',
                      isActive(l.href)
                        ? 'text-antares border-b border-antares'
                        : 'text-ink hover:text-antares',
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link
            href="/rendez-vous"
            className="hidden lg:inline-flex items-center gap-s-2 bg-ink text-bone px-s-5 py-s-3 text-[12px] font-medium tracking-wider hover:bg-antares transition-colors no-underline"
          >
            Prendre rendez-vous <span className="font-mono">→</span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            className="lg:hidden inline-flex flex-col justify-center gap-[5px] p-s-2 -mr-s-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-antares"
          >
            <span
              className={cn(
                'block h-[1.5px] w-6 bg-ink transition-transform',
                open && 'translate-y-[6.5px] rotate-45',
              )}
            />
            <span className={cn('block h-[1.5px] w-6 bg-ink transition-opacity', open && 'opacity-0')} />
            <span
              className={cn(
                'block h-[1.5px] w-6 bg-ink transition-transform',
                open && '-translate-y-[6.5px] -rotate-45',
              )}
            />
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Navigation mobile" className="lg:hidden border-t border-line bg-bone">
          <ul className="container flex flex-col py-s-3">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? 'page' : undefined}
                  className={cn(
                    'block py-s-3 text-[15px] font-medium tracking-wider no-underline border-b border-line',
                    isActive(l.href) ? 'text-antares' : 'text-ink',
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-s-4">
              <Link
                href="/rendez-vous"
                className="inline-flex items-center gap-s-2 bg-ink text-bone px-s-5 py-s-3 text-[13px] font-medium tracking-wider no-underline"
              >
                Prendre rendez-vous <span className="font-mono">→</span>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
