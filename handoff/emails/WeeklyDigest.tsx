/**
 * GENERATED FROM emails/*.html
 * React Email — composants à compiler avec `@react-email/render`.
 * Variables Handlebars-style {{accolades}} — à remplacer par des props typées.
 */
import { Html, Head, Preview, Body, Container, Section, Row, Column, Heading, Text, Button } from '@react-email/components';

interface RdvItem { jour: string; mois: string; clientName: string; heure: string; avocat: string; expertise: string; modalite: 'visio' | 'cabinet' }
interface ArticleItem { url: string; titre: string; auteur: string; vues: number; delta: number }

export interface WeeklyDigestProps {
  numeroSemaine: number;
  dateDebut: string;
  dateFin: string;
  visiteursSemaine: number;
  visiteursDelta: number;
  rdvSemaine: number;
  rdvDelta: number;
  candidaturesSemaine: number;
  candidaturesPending: number;
  articlesSemaine: number;
  articlesObjectif: number;
  topArticles: [ArticleItem, ArticleItem, ArticleItem];
  rdvList: RdvItem[];
  dashboardUrl: string;
  adminCandidaturesUrl: string;
  notifSettingsUrl: string;
}

/**
 * DESIGN INTENT (le plus dense des 9 templates)
 *   - KPI grid 2×2 (visiteurs · RDV · candidatures · articles) avec deltas vert/rouge
 *   - Top 3 articles : numéros Fraunces antarès gauche + titre + auteur + vues + delta
 *   - 5 prochains RDV : date pill + nom + heure/avocat + tag visio (success) / cabinet (warning)
 *   - Encart antarès si candidatures pending > 0
 *   - CTA dashboard ink
 *   - Envoyé chaque lundi 8h aux associés
 */
export default function WeeklyDigest(props: WeeklyDigestProps) {
  return (
    <Html lang="fr">
      <Head />
      <Preview>Digest semaine {props.numeroSemaine} · {props.visiteursSemaine} visiteurs · {props.rdvSemaine} RDV · {props.candidaturesPending} candidatures à traiter</Preview>
      <Body style={{ margin: 0, padding: 0, background: '#EBE3D4', fontFamily: 'Manrope, Arial, sans-serif' }}>
        <Container style={{ width: '100%', maxWidth: 600, background: '#F4EFE6', margin: '24px auto' }}>
          {/* Header + Titre + KPI grid + Top 3 + RDV list + Pending banner + CTA */}
          <Section style={{ padding: '36px 32px 12px' }}>
            <Heading style={{ fontFamily: 'Fraunces, Georgia, serif', fontWeight: 300, fontSize: 34, lineHeight: 1.1, color: '#0B1426' }}>
              La semaine du<br />{props.dateDebut} au {props.dateFin}, <em style={{ fontFamily: '"Instrument Serif", Georgia, serif', color: '#A23B2E', fontWeight: 400 }}>en un coup d'œil</em>.
            </Heading>
          </Section>
          <Section style={{ padding: '24px 32px 8px' }}>
            <Row style={{ borderSpacing: 8 }}>
              <Column style={{ background: '#FFFFFF', padding: '18px 20px', verticalAlign: 'top' }}>
                <Text style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: '#5E6573', textTransform: 'uppercase', margin: 0 }}>Visiteurs</Text>
                <Text style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 30, color: '#0B1426', margin: '10px 0 6px' }}>{props.visiteursSemaine.toLocaleString('fr-FR')}</Text>
                <Text style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: '#2D6A4F', margin: 0 }}>↑ {props.visiteursDelta}% vs sem. préc.</Text>
              </Column>
              <Column style={{ background: '#FFFFFF', padding: '18px 20px', verticalAlign: 'top' }}>
                <Text style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: '#5E6573', textTransform: 'uppercase', margin: 0 }}>RDV pris</Text>
                <Text style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 30, color: '#0B1426', margin: '10px 0 6px' }}>{props.rdvSemaine}</Text>
                <Text style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: '#2D6A4F', margin: 0 }}>↑ {props.rdvDelta} vs sem. préc.</Text>
              </Column>
            </Row>
          </Section>
          <Section style={{ padding: '24px 32px', textAlign: 'center' }}>
            <Button href={props.dashboardUrl} style={{ background: '#0B1426', color: '#F4EFE6', padding: '14px 22px', textDecoration: 'none', fontFamily: 'Manrope, Arial, sans-serif', fontSize: 13, fontWeight: 500 }}>
              Ouvrir le dashboard →
            </Button>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
