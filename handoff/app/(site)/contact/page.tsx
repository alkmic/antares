/**
 * GENERATED FROM design-system/index.html · pages/{slug}-*.html
 * Conventions :
 *   - Server Component par défaut (RSC)
 *   - Data fetching via service Payload (à implémenter dans /lib/api)
 *   - Italiques d'accent via <Italic> uniquement
 *   - Aucune classe arbitraire hors tokens
 */

import type { Metadata } from 'next';
import { Italic, Eyebrow, SiteNav, SiteFooter, Input, Textarea, FieldLabel, Button } from '@/components';
import { sendContactMessage } from './actions';

export const metadata: Metadata = { title: 'Contact — Antares Avocats' };

const OFFICES = [
  { slug: 'paris',  name: 'Paris 16ᵉ',  address: '3 square Lamartine, 75116 Paris', phone: '+33 (0)1 53 53 98 98', email: 'paris@antares-avocats.fr', access: 'M° La Muette · Rue de la Pompe' },
  { slug: 'massy',  name: 'Massy',      address: '7 allée du Mail, 91300 Massy',     phone: '+33 (0)1 53 53 98 98', email: 'massy@antares-avocats.fr', access: 'RER B Massy-Palaiseau · 8 min' },
  { slug: 'nice',   name: 'Nice',       address: '9 avenue Henri Matisse, 06200 Nice', phone: '+33 (0)4 97 25 90 10', email: 'nice@antares-avocats.fr', access: 'Tramway L2 Magnan' },
];

/** DESIGN INTENT : 3 cabinets avec mini-carte SVG abstraite gauche · formulaire encre court droite · bande RDV ivoire chaud. */
export default function ContactPage() {
  return (
    <>
      <SiteNav active="/contact" />
      <section className="container py-s-9">
        <Eyebrow withRule>Contact · trois cabinets, une porte d&apos;entrée</Eyebrow>
        <h1 className="font-display font-light text-[clamp(48px,7vw,96px)] leading-[0.95] tracking-[-0.03em] mt-s-7">
          Une question, <Italic>une porte</Italic><br />d&apos;entrée<span className="text-antares">.</span>
        </h1>
      </section>

      <section className="container py-s-7 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-s-10 items-start">
        <div>
          {OFFICES.map((o) => (
            <article key={o.slug} className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-s-7 py-s-6 border-b border-line">
              <div className="aspect-square bg-bone-warm relative">
                {/* SVG abstrait personnalisé par ville */}
                <span aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-antares shadow-[0_0_0_4px_rgba(162,59,46,0.2),0_0_16px_#A23B2E]" />
              </div>
              <div>
                <div className="font-mono text-mono-label uppercase text-antares mb-s-2">
                  ⌗ {o.name} &nbsp;·&nbsp; <b className="text-ink normal-case tracking-normal">Siège</b>
                </div>
                <div className="font-display text-[23px] leading-snug mb-s-4">{o.address}</div>
                <div className="space-y-1 font-mono text-[12px] text-ink-soft">
                  <div><span className="text-muted">Téléphone</span> <a href={`tel:${o.phone.replace(/\s/g, '')}`} className="text-ink no-underline hover:text-antares">{o.phone}</a></div>
                  <div><span className="text-muted">Email</span> <a href={`mailto:${o.email}`} className="text-ink no-underline hover:text-antares">{o.email}</a></div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <form action={sendContactMessage} className="bg-ink text-bone p-s-7 relative overflow-hidden">
          <span className="font-mono text-mono-label uppercase text-gold mb-s-4 block">⌗ 02 — Écrivez-nous</span>
          <h2 className="font-display font-light text-[clamp(32px,4vw,44px)] leading-tight mb-s-7">
            Ou utilisez ce <Italic>formulaire</Italic>.
          </h2>
          <div className="space-y-s-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-s-5">
              <div><FieldLabel htmlFor="name">Nom complet</FieldLabel><Input id="name" name="name" required /></div>
              <div><FieldLabel htmlFor="email">Email</FieldLabel><Input id="email" name="email" type="email" required /></div>
            </div>
            <div><FieldLabel htmlFor="subject">Sujet</FieldLabel>
              <select id="subject" name="subject" required className="w-full bg-transparent border-0 border-b border-bone/30 text-bone py-s-3 focus:border-gold outline-none">
                <option>Demande de premier rendez-vous</option>
                <option>Renseignement sur une expertise</option>
                <option>Autre</option>
              </select>
            </div>
            <div><FieldLabel htmlFor="message">Message</FieldLabel><Textarea id="message" name="message" required /></div>
            {/* Slot Cloudflare Turnstile */}
            <Button type="submit" variant="antares" className="bg-gold text-ink border-gold hover:bg-bone">
              Envoyer le message <span className="font-mono">→</span>
            </Button>
          </div>
        </form>
      </section>

      <SiteFooter />
    </>
  );
}
