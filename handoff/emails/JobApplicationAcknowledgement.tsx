/**
 * GENERATED FROM emails/*.html
 * React Email — composants à compiler avec `@react-email/render`.
 * Variables Handlebars-style {{accolades}} — à remplacer par des props typées.
 */
import { Html, Head, Preview, Body, Container, Section, Heading, Text, Link } from '@react-email/components';

export interface JobApplicationAcknowledgementProps {
  candidatPrenom: string;
  posteVise: string;
  expertiseCible: string;
  associeReferent: string;
  dateSoumission: string;
  cvFilename: string;
  ref: string;
  mentionsUrl: string;
  privacyUrl: string;
}

/**
 * DESIGN INTENT
 *   - Titre "Bien reçue, {prenom}" — chaleureux mais court
 *   - 3 paragraphes · accusé · délai 10 j ouvrés · contact si retenu
 *   - Récap dossier KV filet antarès
 *   - Mention RGPD explicite "conservé 24 mois · suppression sur demande dpo@"
 *   - Signature italique "L'équipe Antares"
 */
export default function JobApplicationAcknowledgement(props: JobApplicationAcknowledgementProps) {
  return (
    <Html lang="fr">
      <Head />
      <Preview>Candidature {props.ref} · accusé de réception · réponse sous 10 j ouvrés</Preview>
      <Body style={{ margin: 0, padding: 0, background: '#EBE3D4', fontFamily: 'Manrope, Arial, sans-serif' }}>
        <Container style={{ width: '100%', maxWidth: 600, background: '#F4EFE6', margin: '24px auto' }}>
          <Section style={{ padding: '36px 32px 12px' }}>
            <Heading style={{ fontFamily: 'Fraunces, Georgia, serif', fontWeight: 300, fontSize: 34, lineHeight: 1.1, color: '#0B1426' }}>
              Bien reçue, <em style={{ fontFamily: '"Instrument Serif", Georgia, serif', color: '#A23B2E', fontWeight: 400 }}>{props.candidatPrenom}</em>.
            </Heading>
            <Text style={{ fontFamily: 'Manrope, Arial, sans-serif', fontSize: 15, lineHeight: 1.65, color: '#1F2A3D' }}>
              Votre dossier va être examiné par <strong>{props.associeReferent}</strong>. Réponse sous <strong>10 jours ouvrés</strong>.
            </Text>
          </Section>
          <Section style={{ background: '#EBE3D4', padding: '22px 32px', borderTop: '1px solid rgba(11,20,38,0.1)' }}>
            <Text style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: '#5E6573', lineHeight: 1.7, margin: 0 }}>
              ⌗ Données conservées 24 mois max · suppression sur demande à <Link href="mailto:dpo@antares-avocats.fr" style={{ color: '#0B1426' }}>dpo@antares-avocats.fr</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
