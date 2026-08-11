# Agente: portar formularios + bot Telegram (desde Loxical)

**Workspace de trabajo:** `/home/edgar/landing-peranto` (este repo)  
**Referencia de implementación completa:** `/home/edgar/loxical`  
**Email de contacto / outreach:** `outreach@peranto.app` (ya actualizado en `src/config/site.ts` e i18n)

---

## Objetivo

Incorporar en Peranto el mismo patrón que Loxical usa hoy:

1. Formulario de contacto (persistencia + notificación)
2. Notificaciones y comandos por bot de Telegram
3. Email saliente / destino vía Resend hacia **`outreach@peranto.app`**
4. (Opcional fase 2) Newsletter + panel admin SCRM

Preservar el diseño bilingüe ES/EN, Ghost, Plausible y el look actual del landing. No reescribir la UI de marketing; solo añadir capabilities de captura de leads.

---

## Contexto: por qué no es un copy-paste

| | **landing-peranto (hoy)** | **loxical (referencia)** |
|--|---------------------------|--------------------------|
| Output | Estático (`astro build` → `dist/`) | SSR (`output: 'server'`) |
| Adapter | Ninguno | `@astrojs/node` standalone |
| Hosting | GitHub Pages (`serve` / Pages Actions) | Railway Node |
| DB | No | Postgres + Prisma 7 |
| Formularios | Solo `mailto:` | `POST /api/contact` + leads |
| Telegram | No | Webhook + `/resumen` `/nuevos` |
| Email | `mailto:` | Resend opcional |

Los formularios y el webhook de Telegram **requieren un runtime Node**. GitHub Pages no puede hospedar eso. Hay que migrar el deploy de la landing a **Railway (SSR)** (ya hay guía parcial en `RAILWAY.md`) o a un VPS con Node. Plausible puede seguir aparte.

---

## Decisiones ya tomadas (no reabrir)

- Email público y destino de contacto: **`outreach@peranto.app`**
- Marca / textos del bot: **Peranto** (no Loxical)
- Idioma del sitio: ES + EN; el admin y Telegram pueden ir en español
- Reusar el schema Prisma de Loxical (Lead / LeadNote / LeadActivity / NewsletterSubscriber) adaptando nombres de DB/user a `peranto`
- No meter React/shadcn del admin de Loxical en la **fase 1** (MVP). El admin SCRM completo es **fase 2**.

---

## Fase 1 — MVP (hacer primero)

### 1.1 Infra Astro SSR

1. Instalar deps (versiones alineadas a Loxical donde aplique):
   - `@astrojs/node`
   - `@prisma/client` + `prisma` (v7)
   - `@prisma/adapter-pg` + `pg` + `@types/pg`
   - `dotenv`, `resend`, `undici` (Telegram IPv4)
2. En `astro.config.mjs`:
   - `output: 'server'`
   - `adapter: node({ mode: 'standalone' })`
   - `security.allowedDomains` con `peranto.app`, `www.peranto.app`, `**.up.railway.app`
   - Mantener i18n ES/EN y redirects existentes
3. Cambiar scripts:
   - `build`: `prisma generate && astro build`
   - `start`: script tipo `/home/edgar/loxical/scripts/start.sh` (`prisma migrate deploy` + `node ./dist/server/entry.mjs` + `NODE_OPTIONS=--dns-result-order=ipv4first`)
4. Actualizar `railway.toml` / `RAILWAY.md`: dejar de usar `serve dist`; usar entry SSR.
5. **Deprecar GitHub Pages** como host de producción (o dejarlo solo como preview estático sin forms). Documentar el cutover DNS → Railway.

### 1.2 Base de datos

Copiar y adaptar desde Loxical:

| Origen Loxical | Destino Peranto |
|----------------|-----------------|
| `prisma/schema.prisma` | igual (enums Lead*, Newsletter*) |
| `prisma.config.ts` | igual |
| `docker-compose.yml` | user/db `peranto`, puerto libre (ej. `5438`) |
| `src/lib/db.ts` | igual |
| `src/lib/env.ts` | igual |
| `docs/DATABASE.md` | adaptar nombres |

`DATABASE_URL` local ejemplo:

```
postgresql://peranto:peranto@localhost:5438/peranto?schema=public
```

En Railway: plugin Postgres + `DATABASE_URL=${{Postgres.DATABASE_URL}}` (red privada).

### 1.3 Libs a portar (adaptar strings Loxical → Peranto)

Copiar desde `/home/edgar/loxical` y renombrar marca:

| Archivo | Notas |
|---------|--------|
| `src/lib/env.ts` | sin cambios de lógica |
| `src/lib/crypto-safe.ts` | webhook secret |
| `src/lib/db.ts` | sin cambios |
| `src/lib/leads.ts` | sin cambios de lógica |
| `src/lib/telegram.ts` | `siteBaseUrl` → `https://peranto.app`; títulos «Peranto»; botones SCRM solo si existe admin (fase 2: omitir o link a mailto) |
| `src/lib/rate-limit.ts` | si se usa en APIs |
| `src/pages/api/contact.ts` | `CONTACT_TO_EMAIL` default `outreach@peranto.app`; redirect a rutas i18n |
| `src/pages/api/telegram/webhook.ts` | igual |
| `src/pages/api/health.ts` | útil en Railway |

Defaults de email:

```
CONTACT_TO_EMAIL=outreach@peranto.app
CONTACT_FROM_EMAIL=Peranto <onboarding@resend.dev>   # o dominio verificado en Resend
```

### 1.4 UI de formulario (bilingüe)

Hoy `Collaborate.astro` usa `mailto:`. En MVP:

1. Añadir página o sección de contacto con form HTML `method="POST" action="/api/contact"`:
   - Campos mínimos alineados a Loxical: `name`, `email`, `phone`, `message`, `preferredChannel`, `interest` (opcional), `company` (opcional)
   - Hidden: `topic`, `sourcePath`, `ref` (útil para CTAs de research/support/Lumo)
2. Rutas sugeridas:
   - `/es/contacto` y `/en/contacto` **o** formulario embebido en `#colaborar`
3. Sustituir CTAs `mailto:` de research/support/Lumo por enlaces al form con query prefill (ver `loxical/src/lib/contact-intent.ts`)
4. Copy i18n: éxito / error missing / error db (como `loxical/src/pages/contacto.astro`)
5. Mantener `outreach@peranto.app` visible como fallback

### 1.5 Telegram

Env:

```
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=          # uno o varios: "123,456"
TELEGRAM_WEBHOOK_SECRET=   # obligatorio
```

Registrar webhook (producción):

```bash
curl "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/setWebhook" \
  -d "url=https://peranto.app/api/telegram/webhook" \
  -d "secret_token=$TELEGRAM_WEBHOOK_SECRET"
```

Comandos fase 1 (con DB): `/help`, `/resumen`, `/nuevos` — copiar handler de `telegram.ts`.  
Si aún no hay `/admin`, en botones inline usar solo WhatsApp (omitir «Abrir en SCRM»).

### 1.6 `.env.example` (añadir bloque)

```env
SITE_URL=https://peranto.app
PUBLIC_SITE_URL=https://peranto.app

DATABASE_URL="postgresql://peranto:peranto@localhost:5438/peranto?schema=public"

RESEND_API_KEY=
CONTACT_TO_EMAIL=outreach@peranto.app
CONTACT_FROM_EMAIL=Peranto Web <onboarding@resend.dev>

TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
TELEGRAM_WEBHOOK_SECRET=change-me-telegram-webhook
```

(Mantener las vars Ghost/Plausible existentes.)

### 1.7 Checklist de verificación fase 1

- [ ] `npm run db:up && npm run db:migrate && npm run dev`
- [ ] POST contacto guarda Lead y redirige con `?enviado=1`
- [ ] Sin DB: Telegram aún notifica y redirect `?error=db` (comportamiento Loxical)
- [ ] Con Resend: correo a `outreach@peranto.app`
- [ ] Webhook Telegram responde 200; `/resumen` y `/nuevos` en chat autorizado
- [ ] Chat no autorizado recibe rechazo
- [ ] `GET /api/health` → db up
- [ ] Build SSR en Railway; forms funcionan en `peranto.app`
- [ ] Emails visibles en footer / collaborate / JSON-LD = `outreach@peranto.app`
- [ ] ES y EN del form OK

---

## Fase 2 — SCRM + newsletter (después del MVP)

Portar desde Loxical solo si se necesita panel interno:

- `src/pages/api/newsletter.ts` + `src/lib/subscribers.ts`
- Admin: `src/pages/admin/**`, `src/lib/admin-auth.ts`, APIs `api/admin/**`
- React + shadcn (deps y componentes UI del admin) — **solo para admin**, no para el landing
- `ADMIN_PASSWORD`, `ADMIN_SECRET`
- Middleware de auth (`src/middleware.ts`)
- Botones Telegram «Abrir en SCRM» → `/admin/leads/:id`
- Sync Ghost Members opcional (`GHOST_ADMIN_API_KEY` / `learn.peranto.app`)

No es obligatorio para capturar leads; fase 1 ya notifica por Telegram + email.

---

## Archivos de referencia exactos en Loxical

```
/home/edgar/loxical/prisma/schema.prisma
/home/edgar/loxical/prisma.config.ts
/home/edgar/loxical/docker-compose.yml
/home/edgar/loxical/scripts/start.sh
/home/edgar/loxical/astro.config.mjs
/home/edgar/loxical/.env.example
/home/edgar/loxical/src/lib/{env,db,leads,telegram,crypto-safe,contact-intent,rate-limit,subscribers}.ts
/home/edgar/loxical/src/pages/api/contact.ts
/home/edgar/loxical/src/pages/api/telegram/webhook.ts
/home/edgar/loxical/src/pages/api/newsletter.ts
/home/edgar/loxical/src/pages/api/health.ts
/home/edgar/loxical/src/pages/contacto.astro
/home/edgar/loxical/docs/DATABASE.md
/home/edgar/loxical/docs/CUTOVER.md
```

---

## Qué NO hacer

- No romper i18n ni las secciones Hero/Research/Explore existentes
- No dejar el deploy en GitHub Pages esperando que `/api/*` funcione
- No hardcodear tokens de Telegram/Resend en el repo
- No usar `hola@peranto.app` (reemplazado por `outreach@peranto.app`)
- No portar el blog/Ghost CMS de Loxical; Peranto ya tiene `learn.peranto.app`
- No copiar el design system navy/sky de Loxical; adaptar forms al paper/ink/deep de Peranto

---

## Orden de commits sugerido

1. `chore: SSR Node adapter + Prisma scaffold`
2. `feat: contact API + Telegram notify/webhook`
3. `feat: bilingual contact form UI (replace mailto CTAs)`
4. `docs: Railway SSR cutover + env`
5. (fase 2) `feat: admin SCRM + newsletter`

---

## Prompt corto para pegar al agente

```
Trabaja en /home/edgar/landing-peranto. Sigue docs/AGENT-FORMS-TELEGRAM.md fase 1.
Referencia de código: /home/edgar/loxical (contact, telegram, prisma, leads).
Email: outreach@peranto.app. Migrar de estático/GitHub Pages a Astro SSR + Railway.
No implementes admin SCRM todavía (fase 2). Preserva diseño i18n ES/EN del landing.
```
