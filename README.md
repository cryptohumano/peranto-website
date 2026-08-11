# Peranto — Landing

Sitio bilingüe (ES/EN) para [Peranto](https://peranto.app): Astro SSR (Node), formularios de contacto, notificaciones Telegram y punto de entrada al laboratorio Ghost.

## Requisitos

- Node.js ≥ 22.12
- Docker (Postgres local)

## Desarrollo

```bash
nvm use
cp .env.example .env
npm install
npm run db:up
npx prisma migrate deploy
npm run dev
```

- Español: http://localhost:4321/es/
- English: http://localhost:4321/en/
- Contacto: http://localhost:4321/es/contacto
- Health: http://localhost:4321/api/health

## Configuración

Copia `.env.example` a `.env`. Variables clave:

| Variable | Uso |
|----------|-----|
| `DATABASE_URL` | Postgres (local: puerto **5438**) |
| `CONTACT_TO_EMAIL` | Destino Resend (`outreach@peranto.app`) |
| `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` / `TELEGRAM_WEBHOOK_SECRET` | Bot admin |
| `PUBLIC_GHOST_URL` / `GHOST_CONTENT_API_KEY` | Explorar / Laboratorio |
| `PUBLIC_ANALYTICS_*` | Plausible / Umami |

Edita `src/config/site.ts` para URLs de GitHub, email y proyectos.

Más detalle: [docs/DATABASE.md](./docs/DATABASE.md) · [docs/AGENT-FORMS-TELEGRAM.md](./docs/AGENT-FORMS-TELEGRAM.md)

## Build / start (producción)

```bash
npm run build
npm run start   # migrate deploy + node dist/server/entry.mjs
```

## Deploy en Railway (producción recomendada)

Formularios y Telegram requieren Node. Guía: **[RAILWAY.md](./RAILWAY.md)**.

1. Servicio landing (este repo) + plugin Postgres
2. Variables de `.env.example` (sobre todo `DATABASE_URL=${{Postgres.DATABASE_URL}}`)
3. Dominio `peranto.app` → Railway
4. Registrar webhook Telegram

## GitHub Pages (legacy / preview)

El workflow de Pages publica un build estático **sin** APIs. No uses Pages como producción si necesitas `/api/contact` o Telegram. Para preview visual del marketing, Pages puede seguir existiendo; el cutover DNS de `peranto.app` debe apuntar a Railway.

## Plausible local (Docker / VPS)

```bash
cd plausible && cp .env.example .env && cp compose.override.yml.example compose.override.yml
npm run plausible:up
```

Ver [plausible/README.md](./plausible/README.md).

## Estructura

```
src/
  components/      # Secciones + ContactPage
  config/site.ts   # URLs y email
  i18n/ui.ts       # Copy ES/EN
  lib/             # leads, telegram, env, db…
  pages/es|en/     # Home + contacto
  pages/api/       # contact, telegram, health
prisma/            # Schema + migraciones
docs/              # DATABASE, AGENT brief
```
