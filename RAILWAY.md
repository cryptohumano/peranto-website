# Desplegar Peranto en Railway

Un **proyecto Railway** con **tres bloques**:

| Servicio | Qué es | Origen |
|----------|--------|--------|
| **landing** | Astro SSR Node (`peranto.app`) | Este repo, raíz |
| **Postgres** | Leads / contacto | Plugin Railway Postgres |
| **plausible** | Analytics (`analytics.peranto.app`) | [Plantilla oficial](https://railway.com/template/mzYEXO) |

Ghost (`learn.peranto.app`), CriterIA y Yohualli siguen en sus URLs actuales.

> **Nota:** GitHub Pages ya no sirve para producción si usas formularios/Telegram (necesitan Node). Usa Railway (o un VPS) como host principal.

---

## 1. Landing SSR (este repositorio)

### Crear el servicio

1. [Railway](https://railway.app) → **New Project** → **Deploy from GitHub** → `landing-peranto`.
2. **Add Postgres** (plugin) al mismo proyecto.
3. **Settings → Root Directory**: vacío o `/` (no `plausible/`).
4. **Variables** (servicio landing):

| Variable | Ejemplo |
|----------|---------|
| `DATABASE_URL` | `${{Postgres.DATABASE_URL}}` (red privada) |
| `SITE_URL` | `https://peranto.app` |
| `PUBLIC_SITE_URL` | `https://peranto.app` |
| `CONTACT_TO_EMAIL` | `outreach@peranto.app` |
| `CONTACT_FROM_EMAIL` | `Peranto Web <onboarding@resend.dev>` |
| `RESEND_API_KEY` | (opcional) |
| `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` | … |
| `TELEGRAM_WEBHOOK_SECRET` | … |
| `ADMIN_PASSWORD` | password del panel `/admin` |
| `ADMIN_SECRET` | string largo aleatorio (firma cookie) |
| `PUBLIC_GHOST_URL` | `https://learn.peranto.app` |
| `GHOST_CONTENT_API_KEY` | tu key Ghost |
| `PUBLIC_ANALYTICS_PROVIDER` | `plausible` |
| `PUBLIC_PLAUSIBLE_DOMAIN` | `peranto.app` |
| `PUBLIC_PLAUSIBLE_SCRIPT_URL` | `https://analytics.peranto.app/js/script.outbound-links.tagged-events.js` |

5. **Settings → Networking** → **Generate Domain** + custom `peranto.app` / `www.peranto.app`.
6. Build/start: `railway.toml` → `npm run build` + `scripts/start.sh` (migrate + `dist/server/entry.mjs`).

### Telegram webhook (post-deploy)

```bash
curl "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/setWebhook" \
  -d "url=https://peranto.app/api/telegram/webhook" \
  -d "secret_token=$TELEGRAM_WEBHOOK_SECRET"
```

### Probar en local como Railway

```bash
cp .env.example .env
npm run db:up
npx prisma migrate deploy
npm run build
PORT=8080 npm run start
```

Health: `GET /api/health`

Ver también [docs/DATABASE.md](./docs/DATABASE.md).

---

## 2. Plausible (plantilla Railway, mismo proyecto)

El `docker-compose` en `/plausible` sirve para **VPS local**; en Railway usa la plantilla mantenida por Railway.

1. En el **mismo proyecto** Railway → **Add service** → **Deploy template** → [Plausible](https://railway.com/template/mzYEXO).
2. Crea usuario admin, añade sitio `peranto.app`, `DISABLE_REGISTRATION=true`.
3. Custom domain `analytics.peranto.app` y actualiza `PUBLIC_PLAUSIBLE_SCRIPT_URL` en landing.

---

## 3. Coste y recursos

- **Landing SSR**: Node + Postgres (leads); bajo tráfico ≈ pocos USD/mes.
- **Plausible**: app + Postgres + ClickHouse; varios USD/mes según pageviews.

---

## 4. Qué no va en este deploy

| Componente | Dónde |
|------------|--------|
| CMS Ghost | `learn.peranto.app` |
| CriterIA | `criteria.peranto.app` |
| Yohualli demo | otro servicio/repo |
| `plausible/` compose | Solo local/VPS |

---

## 5. Checklist post-deploy

- [ ] `https://peranto.app` → `/es/`
- [ ] `/es/contacto` y `/en/contacto` envían lead (Telegram o Resend)
- [ ] `GET /api/health` → `ok: true`
- [ ] Webhook Telegram responde; `/resumen` en chat autorizado
- [ ] Plausible recibe visitas

---

## Referencias

- [Astro on Railway](https://docs.astro.build/en/guides/deploy/railway/)
- [docs/DATABASE.md](./docs/DATABASE.md)
- [docs/AGENT-FORMS-TELEGRAM.md](./docs/AGENT-FORMS-TELEGRAM.md)
