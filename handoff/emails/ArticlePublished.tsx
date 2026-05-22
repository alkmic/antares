/**
 * GENERATED FROM emails/*.html
 * React Email — composants à compiler avec `@react-email/render`.
 * Variables Handlebars-style {{accolades}} — à remplacer par des props typées.
 */
import { Html, Head, Preview, Body, Container, Section, Heading, Text, Button, Img } from '@react-email/components';

export interface ArticlePublishedProps {
  coauteurPrenom: string;
  auteurPrincipal: string;
  articleType: string;
  expertise: string;
  articleSlug: string;
  articleTitle: string;
  articleSubtitle: string;
  articleUrl: string;
  coverImageUrl: string;
  linkedinShareUrl: string;
  auteursListe: string;
  readingTime: number;
  datePub: string;
  vuesInitiales: number;
  partagesInitiaux: number;
  notifSettingsUrl: string;
}

/**
 * DESIGN INTENT
 *   - Cover 220h gradient antarès striped (ou photo réelle)
 *   - Titre article Fraunces 26px + sous-titre Instrument Serif italique
 *   - Méta · co-auteurs · temps lecture · date
 *   - 2 CTA côte-à-côte · Voir l'article (ink) + Partager LinkedIn (ink)
 *   - Stats premières heures
 */
export default function ArticlePublished(props: ArticlePublishedProps) {
  return (
    <Html lang="fr">
      <Head />
      <Preview>Article publié · "{props.articleTitle}" — par {props.auteursListe}</Preview>
      <Body style={{ margin: 0, padding: 0, background: '#EBE3D4', fontFamily: 'Manrope, Arial, sans-serif' }}>
        <Container style={{ width: '100%', maxWidth: 600, background: '#F4EFE6', margin: '24px auto' }}>
          <Section style={{ padding: '24px 32px 0' }}>
            <Img src={props.coverImageUrl} alt={props.articleTitle} width="536" height="220" style={{ width: '100%', height: 220, objectFit: 'cover' }} />
          </Section>
          <Section style={{ padding: '28px 32px 16px' }}>
            <Heading style={{ fontFamily: 'Fraunces, Georgia, serif', fontWeight: 400, fontSize: 26, lineHeight: 1.2, color: '#0B1426' }}>
              <a href={props.articleUrl} style={{ color: '#0B1426', textDecoration: 'none' }}>{props.articleTitle}</a>
            </Heading>
            <Text style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontStyle: 'italic', fontSize: 17, color: '#A23B2E', lineHeight: 1.4 }}>{props.articleSubtitle}</Text>
            <Button href={props.linkedinShareUrl} style={{ background: '#0B1426', color: '#F4EFE6', padding: '14px 22px', textDecoration: 'none', marginTop: 16, fontFamily: 'Manrope, Arial, sans-serif', fontSize: 13, fontWeight: 500 }}>
              Partager sur LinkedIn →
            </Button>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
