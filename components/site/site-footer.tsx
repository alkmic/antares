import Link from 'next/link';
import { Brand } from '@/components/ui';
import { NewsletterForm } from './newsletter-form.client';

interface FooterColProps {
  title: string;
  links: { href: string; label: string }[];
}
function FooterCol({ title, links }: FooterColProps) {
  return (
    <div>
      <h4 className="font-mono text-mono-label uppercase text-gold mb-s-5 font-medium">⌗ {title}</h4>
      <ul className="flex flex-col gap-s-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-bone/80 no-underline text-[13px] hover:text-gold transition-colors"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-ink text-bone pt-s-9 pb-s-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-s-7 pb-s-7 border-b border-bone/15">
          <div>
            <Brand variant="bone" />
            <p className="font-display italic text-[16px] text-bone/70 max-w-[280px] leading-snug mt-s-5">
              L&apos;étoile la plus brillante de la constellation du Scorpion. Et le partenaire
              juridique de votre entreprise.
            </p>
          </div>
          <FooterCol
            title="Cabinet"
            links={[
              { href: '/cabinet', label: 'Qui sommes-nous' },
              { href: '/avocats', label: 'Équipe' },
              { href: '/carrieres', label: 'Carrières' },
            ]}
          />
          <FooterCol
            title="Expertises"
            links={[
              { href: '/expertises/droit-des-societes', label: 'Droit des sociétés' },
              { href: '/expertises/droit-social', label: 'Droit social' },
              { href: '/expertises/propriete-intellectuelle', label: 'Propriété intellectuelle' },
              { href: '/expertises', label: 'Voir tout →' },
            ]}
          />
          <NewsletterForm />
        </div>
        <div className="pt-s-6 flex flex-wrap justify-between gap-s-4 font-mono text-[11px] tracking-wider text-bone/50">
          <div>© 2026 Antares Avocats · Ordre des avocats de Paris</div>
          <div className="flex gap-s-5">
            <Link href="/mentions-legales" className="text-bone/50 hover:text-gold no-underline">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="text-bone/50 hover:text-gold no-underline">
              Confidentialité
            </Link>
            <Link href="/cookies" className="text-bone/50 hover:text-gold no-underline">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
