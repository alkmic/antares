# Antares · Assets requis côté humain

> Liste exhaustive des fichiers à fournir par l'humain (Antoine Baudart / partenaires).
> Tant qu'ils ne sont pas livrés, les placeholders striped antarès du système restent en place.

---

## 01 — Photos d'équipe · 12 fichiers

**Format obligatoire :** 4 / 5 portrait · 1200 × 1500 px minimum · JPG ou WebP · max 600 Ko après compression.

**Direction artistique :**
- Studio · lumière douce latérale.
- Fond uni ivoire chaud ou encre — **jamais blanc froid** (pas du "law firm classique").
- Tenue : sobre, plutôt formelle, mais sans cravate forcée.
- Regard : caméra ou légèrement décalé. Pas de sourire ostentatoire.
- Cadrage : épaules + tête, marges respiratoires haut/bas.
- Crédit photographe à transmettre — apparaît en méta `⌗ Crédit · {studio}`.

**Convention de nommage :** `photo-{prenom}-{nom}.jpg` — slug minuscule, tirets.

| Slug                          | Rôle                | Status |
|-------------------------------|---------------------|--------|
| photo-antoine-baudart.jpg     | Associé fondateur   | ⌗ à fournir |
| photo-yann-cauchetier.jpg     | Associé fondateur   | ⌗ à fournir |
| photo-pierre-fortino.jpg      | Associé             | ⌗ à fournir |
| photo-pa-pascaud.jpg          | Associé             | ⌗ à fournir |
| photo-pauline-coniglio.jpg    | Collab. senior      | ⌗ à fournir |
| photo-laetitia-trentesaux.jpg | Collab. senior      | ⌗ à fournir |
| photo-marie-delcourt.jpg      | Collaboratrice      | ⌗ à fournir |
| photo-julien-vasseur.jpg      | Collaborateur       | ⌗ à fournir |
| photo-sophie-mercier.jpg      | Collaboratrice      | ⌗ à fournir |
| photo-thomas-rouxel.jpg       | Collaborateur       | ⌗ à fournir |
| photo-emma-deletrez.jpg       | Collaboratrice      | ⌗ à fournir |
| photo-romain-senechal.jpg     | Collaborateur       | ⌗ à fournir |

---

## 02 — Photos cabinets · 3 fichiers paysage

**Format :** 1920 × 1080 px (16/9) · JPG ou WebP · max 1 Mo.

**Direction artistique :**
- Vue extérieure ou intérieur signature (escalier, salle de réunion vide).
- Heure dorée · lumière naturelle.
- Pas de personnes identifiables.
- Pas de bureau encombré ou de matériel high-tech visible.

| Slug                       | Lieu                              | Status |
|----------------------------|-----------------------------------|--------|
| cabinet-paris-lamartine.jpg | 3 square Lamartine · 75116 Paris  | ⌗ à fournir |
| cabinet-massy-vilmorin.jpg  | 7 allée du Mail · 91300 Massy     | ⌗ à fournir |
| cabinet-nice-matisse.jpg    | 9 avenue Henri Matisse · 06200    | ⌗ à fournir |

---

## 03 — Logos clients · 12 fichiers SVG

**Format obligatoire :** SVG monochrome **noir** sur fond transparent.
- Le système les recolorise dynamiquement en `currentColor`.
- Hauteur de référence : 32 px lisible, viewBox proportionné.
- Pas d'effet, pas d'ombre, pas de texte décoratif autour.
- **Demander l'accord écrit** de chaque marque pour figurer sur le site (clause de référence client).

| Slug                  | Marque         | Accord  | Status |
|-----------------------|----------------|---------|--------|
| client-accor.svg      | Accor          | ⌗ à obtenir | ⌗ à fournir |
| client-heineken.svg   | Heineken       | ⌗ à obtenir | ⌗ à fournir |
| client-puydufou.svg   | Puy du Fou     | ⌗ à obtenir | ⌗ à fournir |
| client-paulbocuse.svg | Paul Bocuse    | ⌗ à obtenir | ⌗ à fournir |
| client-leduff.svg     | Le Duff        | ⌗ à obtenir | ⌗ à fournir |
| client-rbpartners.svg | RB Partners    | ⌗ à obtenir | ⌗ à fournir |
| client-nehs.svg       | Nehs           | ⌗ à obtenir | ⌗ à fournir |
| client-sunpi.svg      | Sun PI         | ⌗ à obtenir | ⌗ à fournir |
| client-malabar.svg    | Malabar        | ⌗ à obtenir | ⌗ à fournir |
| client-srami.svg      | Srami          | ⌗ à obtenir | ⌗ à fournir |
| client-ucommercants.svg | U-Commerçants | ⌗ à obtenir | ⌗ à fournir |
| client-henstler.svg   | Henstler       | ⌗ à obtenir | ⌗ à fournir |

---

## 04 — Identité de marque

### Favicon
**Format :** SVG + fallback PNG 32×32 et 192×192.
**Contenu :** brand-mark — cercle ink avec pastille antarès centrale.
**Fichiers attendus :**
- `favicon.svg`
- `favicon-32.png`
- `favicon-192.png` (PWA)
- `apple-touch-icon.png` (180 × 180)

### Open Graph image
**Format :** 1200 × 630 px JPG.
**Contenu :** brand-mark + "Antares Avocats" + tagline italique.
**Fichiers attendus :**
- `og-default.jpg` — partage par défaut.
- `og-publications.jpg` — partage articles (peut être généré dynamiquement par route).

### Logo signature email
**Format :** PNG 88 × 24 px sur fond transparent (variante pour fond ink).
- `email-logo-ink.png` — brand-mark + texte ANTARES blanc.
- `email-logo-bone.png` — variante sur fond clair (utilisée par certains clients mail anciens).

---

## 05 — Couvertures articles

**Format :** 1920 × 1080 px (16/9) JPG.
**Direction artistique :**
- Image documentaire ou photographique en lien avec le sujet.
- **Pas d'illustration vectorielle d'IA**. Pas de "main qui tient une balance".
- Préférer une photo de presse, un détail architectural, une trame typographique.

Chaque article publié doit avoir sa cover. Pour les articles existants en V2 :
- `cover-rupture-conv-2026.jpg`
- `cover-ia-droits-auteur.jpg`
- `cover-loi-finances-2026.jpg`
- `cover-forfait-jours.jpg`
- `cover-marques-diptyque.jpg`
- `cover-pactes-associes.jpg`

---

## 06 — Récapitulatif

| Catégorie         | Quantité | Format                | Priorité    |
|-------------------|----------|------------------------|-------------|
| Photos équipe     | 12       | JPG 4/5 1200×1500      | ⌗ critique  |
| Photos cabinets   | 3        | JPG 16/9 1920×1080     | ⌗ haute     |
| Logos clients     | 12       | SVG monochrome         | ⌗ haute (+ accords) |
| Favicon set       | 4        | SVG + PNG              | ⌗ critique  |
| OG image          | 1-2      | JPG 1200×630           | ⌗ haute     |
| Logo email        | 2        | PNG 88×24              | ⌗ moyenne   |
| Covers articles   | 6+       | JPG 16/9 1920×1080     | ⌗ moyenne (au fil de l'eau) |

**Total minimum pour mise en ligne :** 12 + 3 + 12 + 4 + 1 = **32 fichiers**.

---

## 07 — Hébergement

Tous les assets vont sur **Vercel Blob** (région CDG) avec URLs `cdn.antares-avocats.fr/...`.
Convention de chemin :
```
cdn.antares-avocats.fr/
  ├─ team/photo-{slug}.jpg
  ├─ offices/cabinet-{slug}.jpg
  ├─ clients/client-{slug}.svg
  ├─ covers/cover-{article-slug}.jpg
  ├─ og/og-{route}.jpg
  └─ brand/favicon.svg, email-logo-*.png
```
