/**
 * GENERATED FROM emails/*.html
 * React Email — composants à compiler avec `@react-email/render`.
 * Variables Handlebars-style {{accolades}} — à remplacer par des props typées.
 */
import { Html, Head, Preview, Body, Container, Section, Heading, Text, Button, Link } from '@react-email/components';

interface ArticleSummary { type: string; expertise: string; url: string; titre: string; excerpt: string; auteur: string; readingTime: number }

export interface NewsletterMonthlyProps {
  numero: number;
  mois: string;
  moisComplet: string;
  moisSuivant: string;
  nbArticles: number;
  nbPages: number;
  editoSignataire: string;
  editoRole: string;
  editoParagraphe1: string;
  editoParagraphe2: string;
  articles: ArticleSummary[];
  publicationsUrl: string;
  dateSouscription: string;
  unsubscribeUrl: string;
  preferencesUrl: string;
  mentionsUrl: string;
}

/**
 * DESIGN INTENT
 *   - Masthead Fraunces 52px centré "Les décryptages de {mois}"
 *   - Édito signé · 2 paragraphes Fraunces 17px · signature italique Instrument Serif à droite
 *   - 4 articles avec excerpts · type+expertise mono + titre serif + auteur/temps/lien
 *   - Pied newsletter bloc encre · citation "L'étoile la plus brillante…" or
 *   - Désabonnement RGPD EN UN CLIC en rouge antarès — c'est la NL marketing
 */
export default function NewsletterMonthly(props: NewsletterMonthlyProps) {
  return (
    <Html lang="fr">
      <Head />
      <Preview>Antares · Newsletter n°{props.numero} · {props.nbArticles} décryptages de {props.moisComplet}</Preview>
      <Body style={{ margin: 0, padding: 0, background: '#EBE3D4', fontFamily: 'Manrope, Arial, sans-serif' }}>
        <Container style={{ width: '100%', maxWidth: 600, background: '#F4EFE6', margin: '24px auto' }}>
          <Section style={{ padding: '48px 32px 32px', textAlign: 'center' }}>
            <Text style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#A23B2E', margin: '0 0 18px' }}>
              ⌗ Newsletter mensuelle
            </Text>
            <Heading style={{ fontFamily: 'Fraunces, Georgia, serif', fontWeight: 300, fontSize: 52, lineHeight: 0.95, letterSpacing: '-0.03em', color: '#0B1426', margin: 0 }}>
              Les <em style={{ fontFamily: '"Instrument Serif", Georgia, serif', color: '#A23B2E', fontWeight: 400 }}>décryptages</em><br />de {props.moisComplet}.
            </Heading>
          </Section>
          <Section style={{ padding: '0 32px 16px', borderTop: '2px solid #0B1426', marginTop: 16 }}>
            {/* Édito */}
            <Text style={{ fontFamily: 'Fraunces, Georgia, serif', fontWeight: 300, fontSize: 17, lineHeight: 1.6, color: '#0B1426' }}>{props.editoParagraphe1}</Text>
            <Text style={{ fontFamily: 'Fraunces, Georgia, serif', fontWeight: 300, fontSize: 17, lineHeight: 1.6, color: '#0B1426' }}>{props.editoParagraphe2}</Text>
            <Text style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontStyle: 'italic', textAlign: 'right', fontSize: 16, color: '#A23B2E' }}>{props.editoSignataire}</Text>
          </Section>
          {/* Articles list */}
          {/* Pied newsletter bloc encre */}
          <Section style={{ background: '#0B1426', padding: 32, textAlign: 'center' }}>
            <Text style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontStyle: 'italic', fontSize: 18, color: '#B8915C', lineHeight: 1.45, margin: '0 0 14px' }}>
              « L'étoile la plus brillante de la constellation du Scorpion. »
            </Text>
          </Section>
          {/* FOOTER — désabonnement RGPD en un clic */}
          <Section style={{ background: '#EBE3D4', padding: '22px 32px', borderTop: '1px solid rgba(11,20,38,0.1)' }}>
            <Text style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: '#5E6573', lineHeight: 1.7, margin: 0 }}>
              <Link href={props.unsubscribeUrl} style={{ color: '#A23B2E', textDecoration: 'underline' }}>⌗ Se désabonner en un clic</Link> · <Link href={props.preferencesUrl} style={{ color: '#5E6573' }}>Préférences</Link> · <Link href={props.mentionsUrl} style={{ color: '#5E6573' }}>Mentions légales</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
