'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  CONSENT_VERSION,
  defaultConsent,
  readConsentCookie,
  writeConsentCookie,
  type ConsentState,
} from '@/lib/consent';

interface ConsentContextValue {
  consent: ConsentState;
  /** Une bannière doit-elle s'afficher (aucun choix encore enregistré) ? */
  bannerOpen: boolean;
  /** Le gestionnaire granulaire est-il ouvert (rouvert depuis /cookies par ex.) ? */
  managerOpen: boolean;
  acceptAll: () => void;
  refuseAll: () => void;
  save: (choices: { analytics: boolean; embeds: boolean }) => void;
  openManager: () => void;
  closeManager: () => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error('useConsent doit être utilisé dans <ConsentProvider>');
  return ctx;
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState>(defaultConsent);
  const [hydrated, setHydrated] = useState(false);
  const [hasChoice, setHasChoice] = useState(false);
  const [managerOpen, setManagerOpen] = useState(false);

  useEffect(() => {
    const stored = readConsentCookie();
    if (stored) {
      setConsent(stored);
      setHasChoice(true);
    }
    setHydrated(true);
  }, []);

  const persist = useCallback((next: ConsentState) => {
    writeConsentCookie(next);
    setConsent(next);
    setHasChoice(true);
    setManagerOpen(false);
  }, []);

  const acceptAll = useCallback(
    () => persist({ necessary: true, analytics: true, embeds: true, ts: Date.now(), v: CONSENT_VERSION }),
    [persist],
  );
  const refuseAll = useCallback(
    () => persist({ necessary: true, analytics: false, embeds: false, ts: Date.now(), v: CONSENT_VERSION }),
    [persist],
  );
  const save = useCallback(
    (choices: { analytics: boolean; embeds: boolean }) =>
      persist({
        necessary: true,
        analytics: choices.analytics,
        embeds: choices.embeds,
        ts: Date.now(),
        v: CONSENT_VERSION,
      }),
    [persist],
  );

  const value = useMemo<ConsentContextValue>(
    () => ({
      consent,
      bannerOpen: hydrated && !hasChoice,
      managerOpen,
      acceptAll,
      refuseAll,
      save,
      openManager: () => setManagerOpen(true),
      closeManager: () => setManagerOpen(false),
    }),
    [consent, hydrated, hasChoice, managerOpen, acceptAll, refuseAll, save],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}
