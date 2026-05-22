# CLAUDE.md — Antares Avocats

## Pourquoi ce projet existe
Refonte du site antares-avocats.fr, cabinet d'avocats d'affaires français (15 avocats, 3 implantations Paris/Massy/Nice, clients Accor, Heineken, Puy du Fou, Paul Bocuse). Le nouveau site est un vitrine éditorial + un admin unifié où les avocats publient des articles, suivent les RDV (Calendly), traitent les candidatures, et voient les statistiques — dans un seul tableau de bord.

## Stack
- Next.js 15 (App Router, RSC, Server Actions)
- Payload CMS 3.x intégré
- PostgreSQL via Neon (Frankfurt)
- Drizzle ORM (utilisé par Payload)
- Tailwind CSS
- React Email + Resend
- Plausible Cloud + API serveur
- Cloudflare Turnstile (captcha)
- Vercel CDG

## Commandes
pnpm dev / pnpm build / pnpm payload generate:types / pnpm db:push / pnpm test / pnpm test:e2e / pnpm email:dev

## Conventions
- Server Components par défaut. "use client" UNIQUEMENT si nécessaire.
- Server Actions pour les mutations. API routes seulement pour webhooks externes (Calendly, Resend).
- Composants : /components/ui/ (atomiques) /components/site/ /components/admin/
- Tokens dans tailwind.config.ts uniquement, pas de duplication
- i18n : FR défaut, EN en /en/ (Payload localization)
- Accessibilité : focus visibles, alt sur images, labels sur formulaires
- RGPD : aucun cookie tiers sans consentement (sauf strictement nécessaires)

## Anti-patterns
- Pas de Inter / Roboto / system-ui. Fraunces / Instrument Serif / Manrope / JetBrains Mono uniquement.
- Pas de purple gradients, pas de "law firm" navy+or.
- Pas de useState pour la donnée serveur — RSC + revalidation.
- Pas de useEffect pour fetch — RSC ou route handlers.
- Pas de "any" TypeScript. Utiliser les types générés par Payload.

## Workflow par feature
1. LIRE le code existant pertinent (grep, glob, view)
2. PROPOSER un plan (fichiers, ordre, vérifications)
3. ATTENDRE validation
4. IMPLÉMENTER par petits pas avec diffs
5. COMMIT atomique (feat:, fix:, refactor:)

## Secrets (.env.local jamais commité)
DATABASE_URL, PAYLOAD_SECRET, RESEND_API_KEY, PLAUSIBLE_API_KEY, CALENDLY_WEBHOOK_SIGNING_KEY, CLOUDFLARE_TURNSTILE_SECRET, NEXT_PUBLIC_PLAUSIBLE_DOMAIN, CRON_SECRET.
Quand un secret manque : ARRÊTER, le demander, NE JAMAIS inventer ni hardcoder.

## Références
./handoff/ · ./handoff/design-intent.md · ./handoff/blueprint-antares-v2-revise.md
