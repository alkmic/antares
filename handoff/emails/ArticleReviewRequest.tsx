/**
 * GENERATED FROM emails/*.html
 * React Email — composants à compiler avec `@react-email/render`.
 * Variables Handlebars-style {{accolades}} — à remplacer par des props typées.
 */
import { Html, Head, Preview, Body, Container, Section, Heading, Text, Button } from '@react-email/components';

export interface ArticleReviewRequestProps {
  auteurPrenom: string;
  auteurNom: string;
  deadline: string;
  deadlineRelative: string;
  articleType: string;
  expertise: string;
  articleTitle: string;
  articleSubtitle: string;
  nbMots: number;
  readingTime: number;
  instructionsAuteur: string;
  editorUrl: string;
  previewUrl: string;
  notifSettingsUrl: string;
}

/**
 * DESIGN INTENT
 *   - Article card blanche · titre + sous-titre + badge "En attente de relecture"
 *   - Stats mots/temps 2 cols
 *   - Citation instructions auteur · italique Fraunces filet ink
 *   - 2 CTA · Ouvrir éditeur (ink) + Aperçu (ghost)
 *   - Deadline block · filet or rappel délai
 */
export default function ArticleReviewRequest(props: ArticleReviewRequestProps) {
  return (
    <Html lang="fr">
      <Head />
      <Preview>{props.auteurPrenom} {props.auteurNom} vous demande de relire un article avant le {props.deadline}</Preview>
      <Body style={{ margin: 0, padding: 0, background: '#EBE3D4', fontFamily: 'Manrope, Arial, sans-serif' }}>
        <Container style={{ width: '100%', maxWidth: 600, background: '#F4EFE6', margin: '24px auto' }}>
          <Section style={{ padding: '36px 32px 16px' }}>
            <Heading style={{ fontFamily: 'Fraunces, Georgia, serif', fontWeight: 300, fontSize: 32, lineHeight: 1.1, color: '#0B1426' }}>
              Un article a besoin de votre <em style={{ fontFamily: '"Instrument Serif", Georgia, serif', color: '#A23B2E', fontWeight: 400 }}>œil expert</em>.
            </Heading>
            <Button href={props.editorUrl} style={{ background: '#0B1426', color: '#F4EFE6', padding: '14px 22px', textDecoration: 'none', marginTop: 20, fontFamily: 'Manrope, Arial, sans-serif', fontSize: 13, fontWeight: 500 }}>
              Ouvrir dans l'éditeur →
            </Button>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
