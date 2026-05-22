# Antares · Design Intent

> Document de référence pour préserver la grammaire visuelle du système.
> À lire **avant** toute modification de composant.

---

## 01 — Choix forts à préserver

### Palette stricte
- **Quatre couleurs principales seulement** : ivoire `#F4EFE6` · encre `#0B1426` · antarès `#A23B2E` · or `#B8915C`.
- **L'or est réservé aux fonds encre.** Jamais sur ivoire.
- **L'antarès n'est jamais utilisé en grande surface** sauf bouton CTA et fond hover.
- Les deux couleurs système (`success` vert, `warning` ambre) sont strictement utilitaires — tags, deltas, badges. Aucune communication ne s'appuie dessus.
- **Aucun gradient.** Jamais. Le radial encre→antarès sur les cartes CTA est l'unique exception tolérée, à `opacity: 0.3` maximum.

### Typographie à quatre voix
| Famille          | Rôle                                              | Fallback        |
|------------------|---------------------------------------------------|-----------------|
| Fraunces         | Titres, displays, lectures longues                | `Georgia, serif`|
| Instrument Serif | **Italiques d'accent — 1 à 3 mots par section**   | `Georgia, serif`|
| Manrope          | Corps, UI                                         | `Arial`         |
| JetBrains Mono   | Labels, métadonnées, numérotation ⌗               | `monospace`     |

> **Règle des italiques d'accent.** Un titre = au plus une expression italique antarès. Elle souligne un verbe-clé, un nom commun chargé, un substantif. **Jamais sur un nom propre ou une donnée chiffrée.**

### Numérotation ⌗ obligatoire
Le glyphe `⌗` (U+2317 — *viewdata square*) précède chaque label structurel : section, sous-section, eyebrow, ch-sub de dashboard, header transactionnel d'email.
- C'est l'index visuel du système, sa signature.
- Toujours suivi d'un espace insécable `&nbsp;` avant le label.

### Grain à 4 %
- Filtre `feTurbulence` SVG, multiplié à 4 % d'opacité.
- `position: fixed`, `inset: 0`, `pointer-events: none`, `z-index: 200`.
- Présent partout **sauf à l'intérieur des emails** (compatibilité clients).

### Asymétrie obligatoire
- **Section heading toujours en grille 2 colonnes** — label mono à gauche (200 px), titre Fraunces à droite.
- **Ne jamais centrer un titre de section.** La diagonale visuelle entre le label et le titre est la signature.
- Hero : asymétrie 1.1fr / 380px sur desktop. Jamais centré.

---

## 02 — Anti-patterns à éviter

### Visuels
- ❌ **Gradient bleu/violet** ou tout gradient saturé. Le système est plat.
- ❌ **Bordures bleues d'IA** (`box-shadow: 0 0 0 3px rgba(59,130,246,...)`). Utiliser le ring antarès.
- ❌ **Emojis** dans l'interface. On a la numérotation ⌗ pour structurer.
- ❌ **Couleurs sémantiques inventées.** Pas de rouge "error", on utilise antarès. Pas de bleu "info".
- ❌ **Border-radius par défaut** sur le site public. Le radius par défaut est `0`.
- ❌ **Cartes blanches sur ivoire** dans le site public — réservées à l'admin.
- ❌ **Centrage des titres de section.** La grammaire est asymétrique.

### Typographiques
- ❌ **Italique Fraunces.** Les italiques d'accent passent par **Instrument Serif**, c'est non négociable.
- ❌ **Italiques sur plus de 3 mots.** L'accent doit rester ponctuel.
- ❌ **Italiques sur un nom propre ou un chiffre.** "Antoine *Baudart*" ou "*15* avocats" : non.
- ❌ **Police système** (`-apple-system`) — toujours référencer Fraunces/Manrope explicitement.
- ❌ **Tracking serré sur Fraunces 300.** Les titres respirent en `-0.025em` minimum.

### Copywriting
- ❌ **Ton corporate** — "synergies", "solutions à 360°", "experts passionnés". Antares parle comme un magazine d'idées.
- ❌ **Mots majuscules accentués** : utiliser É et non E. "PRÉVENIR" pas "PREVENIR".
- ❌ **Promesses creuses.** Toute affirmation chiffrée doit être vérifiable (4 j ouvrés, 32 clients > 10 ans, etc.).
- ❌ **Anglicismes inutiles** — préférer "encart" à "callout", "objectif" à "target", sauf jargon technique légitime.

---

## 03 — Breakpoints

```ts
sm: '380px',   // mobile
md: '768px',   // tablet
lg: '1100px',  // desktop  ← breakpoint principal
xl: '1440px',  // wide · container max
```

### Patterns responsive
| Élément             | Mobile                     | Desktop                |
|---------------------|----------------------------|------------------------|
| Container padding   | 24 px                      | 56 px                  |
| Grille de section   | 1 col                      | 2 cols (200 + 1fr)     |
| Hero                | stack vertical             | asymétrie 1.1fr / 380px|
| Cards               | stack                      | 3 ou 4 cols            |
| Sidebar admin       | masquée (hamburger)        | 240 px fixe            |
| Panel droit éditeur | bottom sheet               | 320 px fixe            |
| Display-1           | `clamp(48px, 8vw, 96px)`   | 96 px                  |

---

## 04 — Accessibilité

### Contrastes (WCAG AA minimum)
| Combinaison              | Ratio   | Statut |
|--------------------------|---------|--------|
| `ink` sur `bone`         | 16.8:1  | AAA    |
| `ink-soft` sur `bone`    | 11.2:1  | AAA    |
| `antares` sur `bone`     | 5.4:1   | AA     |
| `muted` sur `bone`       | 4.6:1   | AA     |
| `gold` sur `ink`         | 5.8:1   | AA     |
| `bone` sur `ink`         | 16.8:1  | AAA    |

> ⚠️ **Le rouge `antares` sur `bone` ne passe pas AA pour le texte < 18 px en regular.** Réservé aux labels mono uppercase (où la graisse compense) et aux liens soulignés.

### Focus states
- **Tous les éléments interactifs ont un focus visible.**
- Pattern par défaut : `outline: 2px solid var(--antares); outline-offset: 2px;`
- Boutons primaires sur fond ivoire : `outline: 2px solid var(--antares)` autour de la forme.
- Boutons primaires sur fond encre : `outline: 2px solid var(--gold)`.
- Inputs : `border-color: var(--antares); box-shadow: 0 0 0 3px rgba(162,59,46,0.12);`.
- **Ne jamais retirer le focus** avec `outline: none` sans le remplacer.

### Texte alternatif
- Toute image décorative : `alt=""` (vide, pas omis).
- Toute image porteuse de sens : `alt` descriptif, **français**, sans "image de" ou "photo de".
- Logo Antarès : `alt="Antares Avocats"` (jamais "logo").
- Photos d'avocats : `alt="{prénom nom}, {rôle} du cabinet"`.
- Cover article : `alt` reprenant le titre de l'article.

### Sémantique
- **Une seule `<h1>` par page** (titre principal du hero).
- Structure `<h2>` → `<h3>` sans saut de niveau.
- Liens vs boutons : `<a href>` pour la navigation, `<button>` pour les actions.
- Formulaires : `<label for>` toujours, jamais de placeholder seul.
- Tableaux admin : `<th scope="col">` sur les en-têtes.

### Navigation clavier
- `Tab` parcourt dans l'ordre logique du DOM.
- `Escape` ferme modales, drawers, slash menus, bottom sheets.
- `Enter`/`Space` activent les chips et toggles.
- Le focus est rendu après fermeture d'un overlay au déclencheur.

### Réduction de mouvement
- Respecter `prefers-reduced-motion: reduce` :
  - Désactiver l'animation `pulse` du brand-mark.
  - Désactiver les transitions de `padding` sur hover (cards expertise).
  - Conserver les transitions de couleur (information utile).

---

## 05 — Densité

| Univers      | Padding carte | Line-height | Radius   | Ombres        |
|--------------|---------------|-------------|----------|---------------|
| Site public  | aéré · 32-48px| généreux 1.6| `0`      | aucune        |
| Admin        | resserré · 20-24px | resserré 1.5 | `6-8px` | discrètes     |
| Email        | 24-32px       | 1.55-1.65   | `0`      | `e-2` (cards) |

> **Les deux univers ne se mélangent pas.** Pas de carte blanche admin sur le site public, pas d'ivoire grain dans l'admin.

---

## 06 — Métadonnées en mono

Toute donnée structurelle passe en **JetBrains Mono** :
- Date, durée, chemin URL, ID, état système, nom d'auteur en méta-card.
- Tracking +6 à +18 %.
- Uppercase pour les labels, casse normale pour les valeurs.
- Précédée systématiquement de `⌗ `.

```tsx
// Bon
<span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
  ⌗ Publié le <b className="normal-case tracking-normal text-ink">02.05.2026</b>
</span>

// Mauvais — perd le pattern signature
<span className="text-xs text-gray-500">Publié le 02.05.2026</span>
```
