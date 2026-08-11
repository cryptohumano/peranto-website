# Base de datos Peranto (leads / contacto)

## Local (Docker Compose)

```bash
cp .env.example .env
npm run db:up          # Postgres en localhost:5438
npm run db:migrate     # aplica migraciones (dev) — o: npx prisma migrate deploy
npm run dev
```

`DATABASE_URL` por defecto:

```
postgresql://peranto:peranto@localhost:5438/peranto?schema=public
```

> El puerto **5438** evita choques con otros Postgres locales.

Admin SCRM: `/admin` con `ADMIN_PASSWORD` + `ADMIN_SECRET`  
Contacto: `http://localhost:4321/es/contacto`  
Health: `http://localhost:4321/api/health`

## Railway

1. Add Postgres plugin al proyecto
2. En el servicio **landing**, Variables → `DATABASE_URL=${{Postgres.DATABASE_URL}}` (referencia **privada**, no localhost ni `DATABASE_PUBLIC_URL`)
3. Build: `prisma generate && astro build` (ya en `npm run build`)
4. Start: `scripts/start.sh` → `prisma migrate deploy` + Node SSR
5. Comprueba: `GET /api/health` → `{ "ok": true, "db": "up", "schema": "up", "adminConfigured": true }`

Variables del servicio landing:

```
DATABASE_URL=${{Postgres.DATABASE_URL}}
SITE_URL=https://peranto.app
PUBLIC_SITE_URL=https://peranto.app
CONTACT_TO_EMAIL=outreach@peranto.app
CONTACT_FROM_EMAIL="Peranto Web <onboarding@resend.dev>"
RESEND_API_KEY=...          # opcional
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...
TELEGRAM_WEBHOOK_SECRET=...
ADMIN_PASSWORD=...
ADMIN_SECRET=...            # string largo aleatorio
```

### `DATABASE_URL` vs `DATABASE_PUBLIC_URL`

| Variable | Qué es | Cuándo usarla |
|---|---|---|
| `Postgres.DATABASE_URL` | Postgres por red privada (`*.railway.internal`) | **Siempre** en el servicio landing de Railway |
| `Postgres.DATABASE_PUBLIC_URL` | Proxy TCP público de Postgres | Solo desde tu laptop / clientes externos |

## Qué guarda hoy (fase 1)

- Leads de `/es/contacto` y `/en/contacto`: nombre, email, teléfono/WhatsApp, empresa, interés, mensaje, canal preferido
- Notificación Telegram + email Resend opcional a `outreach@peranto.app`
- Comandos bot: `/resumen`, `/nuevos`, `/help`
- Panel CRM: `/admin` (login, listado, detalle, pipeline, notas, actividades)

Newsletter broadcast admin = pendiente (opcional).
