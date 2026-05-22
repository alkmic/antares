'use client';
/**
 * Formulaire candidature — 5 fieldsets · Cloudflare Turnstile · RGPD.
 * Server Action sur submit : valide via Zod, upload CV sur R2, crée JobApplication, envoie email.
 */
import { useState } from 'react';
import { FieldLabel, Input, Textarea, Button } from '@/components';
import { submitApplication } from './actions';

export function ApplicationForm({ positions }: { positions: { id: string; label: string }[] }) {
  const [pending, setPending] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  return (
    <section className="bg-ink text-bone py-s-10">
      <div className="container">
        <form
          action={async (fd: FormData) => {
            setPending(true);
            fd.set('turnstile_token', turnstileToken || '');
            await submitApplication(fd);
            setPending(false);
          }}
          className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-s-10"
        >
          <aside className="lg:sticky lg:top-[100px] h-fit">
            {/* Bonnes pratiques pour candidater */}
          </aside>
          <div className="bg-bone text-ink p-s-7 space-y-s-7">
            {/* 5 fieldsets : Identité · Poste · Motivation · CV · Vérification */}
            <fieldset>
              <legend className="font-mono text-[10px] uppercase tracking-widest text-antares mb-s-4 block">
                <span className="text-muted mr-s-2">01</span>⌗ Identité
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-s-4">
                <div><FieldLabel htmlFor="firstName">Prénom</FieldLabel><Input id="firstName" name="firstName" required /></div>
                <div><FieldLabel htmlFor="lastName">Nom</FieldLabel><Input id="lastName" name="lastName" required /></div>
              </div>
            </fieldset>
            {/* ...autres fieldsets */}
            <div className="flex justify-between items-center gap-s-4 flex-wrap">
              <div className="font-mono text-mono-label uppercase text-muted">
                <b className="text-ink">⌗ Réponse</b> · sous 7 jours ouvrés
              </div>
              <Button type="submit" variant="antares" disabled={pending || !turnstileToken}>
                Envoyer ma candidature <span className="font-mono">→</span>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
