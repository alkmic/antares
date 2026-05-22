/**
 * GENERATED FROM emails/*.html
 * React Email — composants à compiler avec `@react-email/render`.
 * Variables Handlebars-style {{accolades}} — à remplacer par des props typées.
 */
import { Html, Head, Preview, Body, Container, Section, Heading, Text, Button, Link } from '@react-email/components';

export interface PasswordResetProps {
  userPrenom: string;
  userEmail: string;
  resetUrl: string;
  expirationHeure: string;
  requestIp: string;
  requestBrowser: string;
  requestGeo: string;
  requestDatetime: string;
  mentionsUrl: string;
}

/**
 * DESIGN INTENT
 *   - Titre "Un nouveau mot de passe" italique antarès
 *   - CTA principal ink "Définir un nouveau mot de passe →"
 *   - Expiration "1 heure" en antarès mis en évidence
 *   - URL fallback copiable mono dans carte blanche
 *   - Encart antarès "Vous n'avez pas demandé ?" → security@
 *   - Méta technique IP / navigateur / géo / date pour audit
 *   - Email transactionnel · PAS de désabonnement
 */
export default function PasswordReset(props: PasswordResetProps) {
  return (
    <Html lang="fr">
      <Head />
      <Preview>Antares · réinitialisation de mot de passe · lien valide 1 h</Preview>
      <Body style={{ margin: 0, padding: 0, background: '#EBE3D4', fontFamily: 'Manrope, Arial, sans-serif' }}>
        <Container style={{ width: '100%', maxWidth: 600, background: '#F4EFE6', margin: '24px auto' }}>
          <Section style={{ background: '#0B1426', padding: '24px 32px' }}>
            <Text style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 18, fontWeight: 500, color: '#F4EFE6', margin: 0 }}>⌗ ANTARES · Sécurité</Text>
          </Section>
          <Section style={{ padding: '36px 32px 8px' }}>
            <Heading style={{ fontFamily: 'Fraunces, Georgia, serif', fontWeight: 300, fontSize: 34, lineHeight: 1.1, color: '#0B1426' }}>
              Un nouveau <em style={{ fontFamily: '"Instrument Serif", Georgia, serif', color: '#A23B2E', fontWeight: 400 }}>mot de passe</em>.
            </Heading>
            <Text style={{ fontFamily: 'Manrope, Arial, sans-serif', fontSize: 15, lineHeight: 1.65, color: '#1F2A3D' }}>
              Bonjour {props.userPrenom}, lien valable <strong>1 heure</strong> · expire à {props.expirationHeure}.
            </Text>
          </Section>
          <Section style={{ padding: '0 32px 16px', textAlign: 'center' }}>
            <Button href={props.resetUrl} style={{ background: '#0B1426', color: '#F4EFE6', padding: '14px 28px', textDecoration: 'none', fontFamily: 'Manrope, Arial, sans-serif', fontSize: 13, fontWeight: 500 }}>
              Définir un nouveau mot de passe →
            </Button>
          </Section>
          <Section style={{ padding: '16px 32px', borderTop: '1px solid rgba(11,20,38,0.1)' }}>
            <Text style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: '#5E6573', lineHeight: 1.7, margin: 0 }}>
              ⌗ Demande depuis {props.requestIp} · {props.requestBrowser} · {props.requestGeo} · {props.requestDatetime}<br />
              ⌗ Vous n'avez pas demandé ? Contactez <Link href="mailto:security@antares-avocats.fr" style={{ color: '#0B1426' }}>security@antares-avocats.fr</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
