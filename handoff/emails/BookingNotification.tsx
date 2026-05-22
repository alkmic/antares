/**
 * GENERATED FROM emails/*.html
 * React Email — composants à compiler avec `@react-email/render`.
 * Variables Handlebars-style {{accolades}} — à remplacer par des props typées.
 */
import { Html, Head, Preview, Body, Container, Section, Row, Column, Heading, Text, Button, Hr, Link } from '@react-email/components';

export interface BookingNotificationProps {
  avocatPrenom: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientSociete?: string;
  jourSemaine: string;     // ex: "VENDREDI"
  jour: string;            // ex: "22"
  mois: string;            // ex: "MAI"
  heureDebut: string;
  heureFin: string;
  visioOuCabinet: 'visio' | 'cabinet';
  cabinetVille?: string;
  expertise: string;
  sujetCourt: string;
  calendlyUrl: string;
  blockAgendaUrl: string;
  notifSettingsUrl: string;
}

/**
 * DESIGN INTENT
 *   - Tuile date proéminente split antarès (jour 48px) / encre (heure)
 *   - Info block KV filet antarès
 *   - 2 CTA · Calendly ink + Bloquer agenda ghost
 *   - PAS de désabonnement (notification opérationnelle, conforme art. 21 RGPD)
 */
export default function BookingNotification({
  avocatPrenom, clientName, clientEmail, clientPhone, clientSociete,
  jourSemaine, jour, mois, heureDebut, heureFin, visioOuCabinet, cabinetVille,
  expertise, sujetCourt, calendlyUrl, blockAgendaUrl, notifSettingsUrl,
}: BookingNotificationProps) {
  return (
    <Html lang="fr">
      <Head />
      <Preview>{clientName} a réservé un échange · {jourSemaine} {jour} {mois} à {heureDebut}</Preview>
      <Body style={{ margin: 0, padding: 0, background: '#EBE3D4', fontFamily: 'Manrope, Arial, sans-serif' }}>
        <Container style={{ width: '100%', maxWidth: 600, background: '#F4EFE6', border: '1px solid rgba(11,20,38,0.08)', margin: '24px auto' }}>
          {/* HEADER */}
          <Section style={{ background: '#0B1426', padding: '24px 32px' }}>
            <Row>
              <Column>
                <Text style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 18, fontWeight: 500, color: '#F4EFE6', margin: 0, letterSpacing: '0.04em' }}>
                  ⌗ ANTARES
                </Text>
              </Column>
              <Column align="right">
                <Text style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: '#B8915C', letterSpacing: '0.14em', textTransform: 'uppercase', margin: 0 }}>
                  ⌗ Calendly · webhook
                </Text>
              </Column>
            </Row>
          </Section>

          {/* TITRE */}
          <Section style={{ padding: '36px 32px 8px' }}>
            <Text style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#A23B2E', margin: '0 0 14px' }}>
              ⌗ Nouveau rendez-vous
            </Text>
            <Heading as="h1" style={{ fontFamily: 'Fraunces, Georgia, serif', fontWeight: 300, fontSize: 34, lineHeight: 1.1, letterSpacing: '-0.02em', color: '#0B1426', margin: 0 }}>
              {clientName} vient de réserver<br />un{' '}
              <em style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontStyle: 'italic', color: '#A23B2E', fontWeight: 400 }}>premier échange.</em>
            </Heading>
          </Section>

          {/* LEDE */}
          <Section style={{ padding: '18px 32px 8px' }}>
            <Text style={{ fontFamily: 'Manrope, Arial, sans-serif', fontSize: 15, lineHeight: 1.65, color: '#1F2A3D', margin: 0 }}>
              Bonjour {avocatPrenom}, un client vient de prendre un créneau sur votre Calendly pour un échange de 15 minutes en <strong>{expertise}</strong>.
            </Text>
          </Section>

          {/* TUILE DATE proéminente */}
          <Section style={{ padding: '28px 32px 0' }}>
            <Row style={{ background: '#0B1426' }}>
              <Column width={120} align="center" style={{ padding: '24px 0', background: '#A23B2E', color: '#F4EFE6' }}>
                <Text style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#F4EFE6', opacity: 0.85, margin: 0 }}>
                  {jourSemaine}
                </Text>
                <Text style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 48, fontWeight: 300, lineHeight: 1, letterSpacing: '-0.03em', color: '#F4EFE6', margin: '6px 0 4px' }}>
                  {jour}
                </Text>
                <Text style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#F4EFE6', opacity: 0.85, margin: 0 }}>
                  {mois}
                </Text>
              </Column>
              <Column style={{ padding: '20px 24px', color: '#F4EFE6' }}>
                <Text style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 24, fontWeight: 400, lineHeight: 1.15, color: '#F4EFE6', margin: 0 }}>
                  {heureDebut} — {heureFin}
                </Text>
                <Text style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#B8915C', margin: '8px 0 0' }}>
                  ⌗ {visioOuCabinet}{cabinetVille ? ' · ' + cabinetVille : ''}
                </Text>
              </Column>
            </Row>
          </Section>

          {/* INFO KV */}
          <Section style={{ padding: '28px 32px 8px' }}>
            <table style={{ width: '100%', borderLeft: '2px solid #A23B2E', background: '#EBE3D4', borderCollapse: 'collapse' }}>
              <tbody>
                <tr><td style={{ width: 120, fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5E6573', padding: '5px 22px' }}>Client</td>
                    <td style={{ fontFamily: 'Manrope, Arial, sans-serif', fontSize: 14, color: '#0B1426', fontWeight: 500, padding: '5px 22px 5px 0' }}>{clientName}{clientSociete ? ' · ' + clientSociete : ''}</td></tr>
                <tr><td style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5E6573', padding: '5px 22px' }}>Email</td>
                    <td style={{ padding: '5px 22px 5px 0' }}><Link href={'mailto:' + clientEmail} style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 13, color: '#0B1426', textDecoration: 'underline', textDecorationColor: '#A23B2E' }}>{clientEmail}</Link></td></tr>
                <tr><td style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5E6573', padding: '5px 22px' }}>Sujet</td>
                    <td style={{ fontFamily: 'Manrope, Arial, sans-serif', fontSize: 13.5, color: '#1F2A3D', padding: '5px 22px 5px 0', lineHeight: 1.5 }}>{sujetCourt}</td></tr>
              </tbody>
            </table>
          </Section>

          {/* CTA */}
          <Section style={{ padding: '28px 32px 16px', textAlign: 'center' }}>
            <Button href={calendlyUrl} style={{ display: 'inline-block', background: '#0B1426', color: '#F4EFE6', fontFamily: 'Manrope, Arial, sans-serif', fontSize: 13, fontWeight: 500, letterSpacing: '0.04em', padding: '14px 22px', textDecoration: 'none', marginRight: 8 }}>
              Voir dans Calendly →
            </Button>
            <Button href={blockAgendaUrl} style={{ display: 'inline-block', background: 'transparent', color: '#0B1426', fontFamily: 'Manrope, Arial, sans-serif', fontSize: 13, fontWeight: 500, letterSpacing: '0.04em', padding: '13px 22px', textDecoration: 'none', border: '1px solid rgba(11,20,38,0.25)' }}>
              Bloquer mon agenda
            </Button>
          </Section>

          {/* FOOTER */}
          <Section style={{ background: '#EBE3D4', padding: '22px 32px', borderTop: '1px solid rgba(11,20,38,0.1)' }}>
            <Text style={{ fontFamily: 'Manrope, Arial, sans-serif', fontSize: 11.5, color: '#0B1426', fontWeight: 600, margin: '0 0 6px' }}>Antares Avocats</Text>
            <Text style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: '0.06em', color: '#5E6573', lineHeight: 1.7, margin: '0 0 12px' }}>
              3 square Lamartine · 75116 Paris · +33 (0)1 53 53 98 98
            </Text>
            <Text style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: '0.06em', color: '#5E6573', lineHeight: 1.7, margin: 0 }}>
              ⌗ Vous recevez cet email comme avocat assigné. <Link href={notifSettingsUrl} style={{ color: '#0B1426', textDecoration: 'underline' }}>Modifier mes préférences</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
