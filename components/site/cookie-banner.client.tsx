'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui';
import { CONSENT_CATEGORIES } from '@/lib/consent';
import { cn } from '@/lib/cn';
import { useConsent } from './consent-provider.client';

function Toggle({
  checked,
  onChange,
  label,
  disabled,
}: {
  checked: boolean;
  onChange?: (v: boolean) => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={cn(
        'relative h-[22px] w-[40px] shrink-0 rounded-full border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-antares',
        checked ? 'bg-antares border-antares' : 'bg-card border-line-strong',
        disabled && 'opacity-50 cursor-not-allowed',
      )}
    >
      <span
        className={cn(
          'absolute top-1/2 -translate-y-1/2 h-[16px] w-[16px] rounded-full bg-bone transition-all',
          checked ? 'left-[21px]' : 'left-[3px]',
        )}
      />
    </button>
  );
}

export function CookieBanner() {
  const { consent, bannerOpen, managerOpen, acceptAll, refuseAll, save, closeManager } =
    useConsent();
  const [showManager, setShowManager] = useState(false);
  const [draft, setDraft] = useState({ analytics: false, embeds: false });

  // Le panneau granulaire s'ouvre soit via "Personnaliser", soit via /cookies (managerOpen).
  const panelOpen = showManager || managerOpen;

  useEffect(() => {
    if (panelOpen) setDraft({ analytics: consent.analytics, embeds: consent.embeds });
  }, [panelOpen, consent.analytics, consent.embeds]);

  if (!bannerOpen && !managerOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Gestion des cookies"
      className="fixed inset-x-0 bottom-0 z-[210] border-t border-ink bg-bone shadow-e-3"
    >
      <div className="container py-s-6">
        <div className="flex flex-col gap-s-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-[640px]">
            <p className="font-mono text-mono-label uppercase text-antares mb-s-3">⌗ Cookies</p>
            <p className="font-body text-[14px] leading-relaxed text-ink-soft">
              Nous utilisons uniquement les cookies strictement nécessaires au fonctionnement du
              site. Avec votre accord, nous activons aussi la mesure d&apos;audience et l&apos;affichage
              de contenus tiers (prise de rendez-vous). Vous pouvez refuser ou choisir précisément —
              et changer d&apos;avis à tout moment depuis la page{' '}
              <a href="/cookies" className="text-antares underline underline-offset-2">
                Cookies
              </a>
              .
            </p>
          </div>

          {!panelOpen && (
            <div className="flex flex-wrap items-center gap-s-3 lg:shrink-0">
              <Button variant="text" size="sm" onClick={() => setShowManager(true)}>
                Personnaliser
              </Button>
              <Button variant="ink" size="md" onClick={refuseAll}>
                Tout refuser
              </Button>
              <Button variant="ink" size="md" onClick={acceptAll}>
                Tout accepter
              </Button>
            </div>
          )}
        </div>

        {panelOpen && (
          <div className="mt-s-6 border-t border-line pt-s-5">
            <ul className="flex flex-col gap-s-4">
              <li className="flex items-start justify-between gap-s-5">
                <div>
                  <p className="font-body text-[14px] font-medium text-ink">Strictement nécessaires</p>
                  <p className="font-body text-[13px] text-muted leading-snug max-w-[560px]">
                    Indispensables au fonctionnement et à la sécurité du site. Toujours actifs.
                  </p>
                </div>
                <Toggle checked disabled label="Cookies strictement nécessaires (toujours actifs)" />
              </li>
              {CONSENT_CATEGORIES.map((cat) => (
                <li key={cat.key} className="flex items-start justify-between gap-s-5">
                  <div>
                    <p className="font-body text-[14px] font-medium text-ink">{cat.label}</p>
                    <p className="font-body text-[13px] text-muted leading-snug max-w-[560px]">
                      {cat.description}
                    </p>
                  </div>
                  <Toggle
                    checked={draft[cat.key]}
                    onChange={(v) => setDraft((d) => ({ ...d, [cat.key]: v }))}
                    label={cat.label}
                  />
                </li>
              ))}
            </ul>

            <div className="mt-s-6 flex flex-wrap items-center gap-s-3">
              <Button variant="ink" size="md" onClick={refuseAll}>
                Tout refuser
              </Button>
              <Button variant="antares" size="md" onClick={() => save(draft)}>
                Enregistrer mes choix
              </Button>
              <Button variant="ink" size="md" onClick={acceptAll}>
                Tout accepter
              </Button>
              {managerOpen && (
                <Button
                  variant="text"
                  size="sm"
                  onClick={() => {
                    setShowManager(false);
                    closeManager();
                  }}
                >
                  Fermer
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
