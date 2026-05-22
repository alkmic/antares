# Antares Avocats · Handoff Bundle

> Bundle de handoff complet pour **Claude Code** — site public + admin + emails.
> Direction artistique : magazine éditorial contemporain (Le 1 hebdo, XXI, Esprit). PAS de "law firm classique" navy + or.

---

## 📦 Contenu

```
handoff/
├── README.md                     # ce fichier
├── tokens.json                   # design tokens (couleurs, typo, espacements, radius, shadows)
├── tailwind.config.ts            # config Tailwind importable directement
├── design-intent.md              # règles à préserver, anti-patterns, breakpoints, a11y
├── assets-required.md            # liste des assets à fournir côté humain (photos, logos, favicon)
│
├── lib/
│   └── cn.ts                     # helper clsx + tailwind-merge
│
├── components/
│   ├── types.ts                  # interfaces TypeScript (Avocat, Article, Booking, etc.)
│   ├── index.tsx                 # composants atomiques partagés
│   └── admin.tsx                 # composants admin (sidebar, topbar, layout)
│
├── app/
│   ├── (site)/                   # site public
│   │   ├── cabinet/page.tsx
│   │   ├── expertises/[slug]/page.tsx
│   │   ├── avocats/[slug]/page.tsx
│   │   ├── publications/
│   │   │   ├── page.tsx
│   │   │   ├── filters.client.tsx
│   │   │   └── [slug]/
│   │   │       ├── page.tsx
│   │   │       ├── reading-progress.client.tsx
│   │   │       ├── toc.client.tsx
│   │   │       └── share.client.tsx
│   │   ├── rendez-vous/
│   │   │   ├── page.tsx
│   │   │   └── flow.client.tsx
│   │   ├── carrieres/
│   │   │   ├── page.tsx
│   │   │   ├── application-form.client.tsx
│   │   │   └── actions.ts
│   │   └── contact/
│   │       ├── page.tsx
│   │       └── actions.ts
│   │
│   └── (admin)/admin/            # cockpit /admin
│       ├── publications/
│       │   ├── page.tsx          # liste
│       │   ├── table.client.tsx
│       │   └── [id]/edit/page.tsx  # éditeur (écran central)
│       ├── avocats/[id]/page.tsx
│       ├── rendez-vous/page.tsx
│       ├── candidatures/[id]/page.tsx
│       ├── settings/
│       │   ├── notifications/page.tsx
│       │   └── global/page.tsx
│       └── medias/page.tsx
│
└── emails/                       # React Email · 9 templates
    ├── BookingNotification.tsx
    ├── BookingClientConfirmation.tsx
    ├── JobApplicationReceived.tsx
    ├── JobApplicationAcknowledgement.tsx
    ├── ArticlePublished.tsx
    ├── ArticleReviewRequest.tsx
    ├── WeeklyDigest.tsx
    ├── NewsletterMonthly.tsx
    └── PasswordReset.tsx
```

---

## 🚀 Démarrage rapide

### 1. Installation

```bash
pnpm install
pnpm add tailwind-merge clsx
pnpm add @react-email/components react-email
pnpm add @vercel/blob resend
```

### 2. Wire up Tailwind

Copier `tailwind.config.ts` à la racine du projet, ajuster les chemins `content[]` si différents de `app/**/*.tsx`.

### 3. Charger les polices

Dans `app/layout.tsx` :

```tsx
import { Fraunces, Instrument_Serif, Manrope, JetBrains_Mono } from 'next/font/google';

const fraunces = Fraunces({ subsets: ['latin'], weight: ['300','400','500'], variable: '--font-fraunces' });
const instrument = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal','italic'], variable: '--font-instrument' });
const manrope = Manrope({ subsets: ['latin'], weight: ['400','500','600','700'], variable: '--font-manrope' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400','500'], variable: '--font-mono' });

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${instrument.variable} ${manrope.variable} ${mono.variable}`}>
      <body className="font-body bg-bone text-ink">
        <GrainOverlay />
        {children}
      </body>
    </html>
  );
}
```

Puis ajuster `tailwind.config.ts` pour utiliser les variables :

```ts
fontFamily: {
  display: ['var(--font-fraunces)', 'Georgia', 'serif'],
  italic:  ['var(--font-instrument)', 'Georgia', 'serif'],
  body:    ['var(--font-manrope)', 'Arial', 'sans-serif'],
  mono:    ['var(--font-mono)', 'monospace'],
},
```

### 4. Layer API

Les pages `.tsx` consomment un service `@/lib/api` qu'il faut implémenter — voir `components/types.ts` pour les contrats. Stack recommandée :

- **CMS** : Payload 3.x (génère `/admin/avocats`, `/admin/publications`, etc. automatiquement)
- **ORM** : Drizzle (utilisé par Payload, lisible par Claude Code)
- **DB** : Postgres (Neon · région Frankfurt)
- **Auth** : Payload natif (sessions chiffrées + MFA TOTP)

### 5. Emails (Resend + React Email)

```ts
// lib/email.ts
import { Resend } from 'resend';
import { render } from '@react-email/render';
import BookingNotification from '@/emails/BookingNotification';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBookingNotification(to: string, props: BookingNotificationProps) {
  const html = await render(BookingNotification(props));
  return resend.emails.send({
    from: 'Antares <notifications@antares-avocats.fr>',
    to,
    subject: `Nouveau RDV · ${props.clientName} · ${props.jour} ${props.mois}`,
    html,
  });
}
```

Preview en dev : `npx react-email dev --dir emails` → ouvre sur `localhost:3000`.

---

## 🎨 Lecture obligatoire avant tout commit

1. **`design-intent.md`** — les choix forts à préserver, les anti-patterns à éviter.
   - Italiques d'accent : 1-3 mots max par section, Instrument Serif uniquement.
   - Numérotation ⌗ partout sur les labels structurels.
   - Grain SVG 4 % en `position: fixed`.
   - Asymétrie obligatoire : pas de centrage de titre.

2. **`tokens.json`** — la palette est verrouillée à 4 couleurs principales.
   - Ne PAS ajouter de couleur sans validation.
   - L'or `#B8915C` ne sort jamais d'un fond encre.

3. **`assets-required.md`** — 32 fichiers minimum côté humain.
   - Tant que les photos d'équipe ne sont pas livrées, les placeholders striped antarès restent en place. Ne pas les remplacer par des photos stock.

---

## ✅ Mappage maquettes ↔ code

Chaque page `.tsx` référence sa maquette HTML d'origine en commentaire pour les détails de contenu/structure que le scaffold n'expose pas verbatim :

| Page TSX                                          | Maquette HTML source                          |
|---------------------------------------------------|-----------------------------------------------|
| `app/(site)/cabinet/page.tsx`                     | `pages/cabinet.html`                          |
| `app/(site)/expertises/[slug]/page.tsx`           | `pages/expertise-droit-social.html`           |
| `app/(site)/avocats/[slug]/page.tsx`              | `pages/avocat-antoine-baudart.html`           |
| `app/(site)/publications/page.tsx`                | `pages/publications-index.html`               |
| `app/(site)/publications/[slug]/page.tsx`         | `pages/publication-ia-generative.html`        |
| `app/(site)/rendez-vous/page.tsx`                 | `pages/rendez-vous.html`                      |
| `app/(site)/carrieres/page.tsx`                   | `pages/carrieres.html`                        |
| `app/(site)/contact/page.tsx`                     | `pages/contact.html`                          |
| `app/(admin)/admin/publications/[id]/edit/page.tsx` | `admin/editor-article.html`                 |
| `app/(admin)/admin/publications/page.tsx`         | `admin/articles-list.html`                    |
| `app/(admin)/admin/avocats/[id]/page.tsx`         | `admin/avocat-edit.html`                      |
| `app/(admin)/admin/rendez-vous/page.tsx`          | `admin/rendez-vous-list.html`                 |
| `app/(admin)/admin/candidatures/[id]/page.tsx`    | `admin/candidature-detail.html`               |
| `app/(admin)/admin/settings/notifications/page.tsx` | `admin/settings-notifications.html`         |
| `app/(admin)/admin/medias/page.tsx`               | `admin/mediatheque.html`                      |
| `app/(admin)/admin/settings/global/page.tsx`      | `admin/settings-global.html`                  |
| `emails/*.tsx`                                    | `emails/01-09-*.html`                         |

Les maquettes HTML restent la source de vérité pour le **détail visuel** (espacements précis, ordre des éléments, exemples de contenus). Les `.tsx` capturent l'**intention de structure**, les props, et les composants à utiliser.

---

## ⌗ Convention de commit

Préfixer chaque commit par le niveau touché :

```
public:   landing droit social — TOC scrollspy + callout réforme RC
admin:    editor — slash menu blocs personnalisés
email:    booking notification — variables {{cabinet_ville}}
ds:       components — Italic accepte className
tokens:   ajout success-soft pour les états hover
```

---

## 📞 Contact design

Si quelque chose ne colle pas avec le design system, ne pas inventer. Demander.

— *L'équipe design*
