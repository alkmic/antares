/**
 * GENERATED FROM emails/*.html
 * React Email — composants à compiler avec `@react-email/render`.
 * Variables Handlebars-style {{accolades}} — à remplacer par des props typées.
 */
import { Html, Head, Preview, Body, Container, Section, Heading, Text, Button, Link } from '@react-email/components';

export interface BookingClientConfirmationProps {
  clientPrenom: string;
  avocatNomComplet: string;
  avocatRole: string;
  dateComplete: string;
  dateCourte: string;
  heureDebut: string;
  heureFin: string;
  duree: number;
  visioOuCabinet: 'visio' | 'cabinet';
  cabinetAdresse?: string;
  joinUrl: string;
  rescheduleUrl: string;
  mentionsUrl: string;
  privacyUrl: string;
  heureDebutMinus5: string;
}

/**
 * DESIGN INTENT
 *   - Titre chaleureux "C'est confirmé, {clientPrenom}" italique antarès
 *   - 3 paragraphes Manrope · récap KV filet antarès
 *   - CTA "Rejoindre le rendez-vous" ink + lien actif à -5 min
 *   - Section "À préparer" · 3 puces ⌗ antarès
 *   - Annulation jusqu'à 24h via Calendly, au-delà téléphone
 */
export default function BookingClientConfirmation({ clientPrenom, avocatNomComplet, avocatRole, dateComplete, dateCourte, heureDebut, heureFin, duree, visioOuCabinet, cabinetAdresse, joinUrl, rescheduleUrl, mentionsUrl, privacyUrl, heureDebutMinus5 }: BookingClientConfirmationProps) {
  return (
    <Html lang="fr">
      <Head />
      <Preview>Votre rendez-vous avec {avocatNomComplet} est confirmé · {dateCourte}</Preview>
      <Body style={{ margin: 0, padding: 0, background: '#EBE3D4', fontFamily: 'Manrope, Arial, sans-serif' }}>
        <Container style={{ width: '100%', maxWidth: 600, background: '#F4EFE6', border: '1px solid rgba(11,20,38,0.08)', margin: '24px auto' }}>
          <Section style={{ background: '#0B1426', padding: '24px 32px' }}>
            <Text style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 18, fontWeight: 500, color: '#F4EFE6', margin: 0 }}>⌗ ANTARES</Text>
          </Section>
          <Section style={{ padding: '36px 32px 8px' }}>
            <Text style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#A23B2E', margin: '0 0 14px' }}>⌗ Votre rendez-vous</Text>
            <Heading as="h1" style={{ fontFamily: 'Fraunces, Georgia, serif', fontWeight: 300, fontSize: 34, lineHeight: 1.1, color: '#0B1426', margin: 0 }}>
              C'est <em style={{ fontFamily: '"Instrument Serif", Georgia, serif', color: '#A23B2E', fontWeight: 400 }}>confirmé</em>, {clientPrenom}.
            </Heading>
          </Section>
          {/* Récap KV · CTA join · À préparer · Annulation · Footer mentions */}
          {/* Voir emails/02-booking-client-confirmation.html pour structure complète */}
          <Section style={{ background: '#EBE3D4', padding: '22px 32px', borderTop: '1px solid rgba(11,20,38,0.1)' }}>
            <Text style={{ fontFamily: 'Manrope, Arial, sans-serif', fontSize: 11.5, color: '#0B1426', fontWeight: 600, margin: '0 0 6px' }}>Antares Avocats — Paris · Massy · Nice</Text>
            <Text style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: '#5E6573', lineHeight: 1.7, margin: 0 }}>
              ⌗ <Link href={mentionsUrl} style={{ color: '#5E6573', textDecoration: 'underline' }}>Mentions légales</Link> · <Link href={privacyUrl} style={{ color: '#5E6573', textDecoration: 'underline' }}>Confidentialité</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
