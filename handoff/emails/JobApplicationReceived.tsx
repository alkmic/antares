/**
 * GENERATED FROM emails/*.html
 * React Email — composants à compiler avec `@react-email/render`.
 * Variables Handlebars-style {{accolades}} — à remplacer par des props typées.
 */
import { Html, Head, Preview, Body, Container, Section, Heading, Text, Button, Link } from '@react-email/components';

export interface JobApplicationReceivedProps {
  candidatInitials: string;
  candidatPrenom: string;
  candidatNom: string;
  candidatEmail: string;
  candidatPhone: string;
  posteVise: string;
  expertiseCible: string;
  anneesExp: number;
  cabinetPrecedent: string;
  sourceIp: string;
  linkedinUrl?: string;
  linkedinPhoto?: string;
  lettreExtrait120chars: string;
  cvUrl: string;
  reviewUrl: string;
  archiveUrl: string;
  notifSettingsUrl: string;
}

/**
 * DESIGN INTENT
 *   - Carte candidat blanche : avatar initiales 56px · nom Fraunces 22px · poste/expertise mono
 *   - Photo LinkedIn affichée si disponible (lien externe)
 *   - Méta KV · email · téléphone · expérience · source IP
 *   - Extrait lettre · italique Fraunces filet ink
 *   - 3 CTA · Voir CV (ink) · Marquer en cours (ghost) · Archiver (text)
 *   - Délai usage 10 j ouvrés mis en évidence
 */
export default function JobApplicationReceived(props: JobApplicationReceivedProps) {
  return (
    <Html lang="fr">
      <Head />
      <Preview>Candidature reçue · {props.candidatPrenom} {props.candidatNom} · {props.posteVise}</Preview>
      <Body style={{ margin: 0, padding: 0, background: '#EBE3D4', fontFamily: 'Manrope, Arial, sans-serif' }}>
        <Container style={{ width: '100%', maxWidth: 600, background: '#F4EFE6', margin: '24px auto' }}>
          {/* Voir emails/03-job-application-received.html pour structure intégrale */}
          <Section style={{ padding: '36px 32px 28px' }}>
            <Heading style={{ fontFamily: 'Fraunces, Georgia, serif', fontWeight: 300, fontSize: 34, lineHeight: 1.1, color: '#0B1426' }}>
              Un dossier <em style={{ fontFamily: '"Instrument Serif", Georgia, serif', color: '#A23B2E', fontWeight: 400 }}>à examiner</em>.
            </Heading>
            <Button href={props.cvUrl} style={{ background: '#0B1426', color: '#F4EFE6', padding: '12px 18px', textDecoration: 'none', marginTop: 24, marginRight: 8, fontFamily: 'Manrope, Arial, sans-serif', fontSize: 12, fontWeight: 500 }}>
              Voir le CV (PDF) →
            </Button>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
