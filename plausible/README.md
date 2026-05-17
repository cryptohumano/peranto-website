# Plausible self-hosted (Peranto)

Analytics para [peranto.app](https://peranto.app) sin cookies de marketing.

## ¿Railway o Docker?

| Entorno | Cómo |
|---------|------|
| **Railway** (recomendado si ya usas Railway) | [RAILWAY.md](../RAILWAY.md) — plantilla [Deploy Plausible](https://railway.com/template/mzYEXO) en el mismo proyecto que la landing. **No uses** este `compose.yml` en Railway. |
| **VPS / local** | Este directorio + `npm run plausible:up` (abajo). |

Basado en [Plausible Community Edition v3.2.0](https://github.com/plausible/community-edition).

## Requisitos

- Docker y Docker Compose v2
- ~4 GB RAM recomendados (ClickHouse + PostgreSQL)
- Subdominio DNS → tu servidor, p. ej. `analytics.peranto.app`

## Arranque rápido

```bash
cd plausible
cp .env.example .env
# Edita BASE_URL y SECRET_KEY_BASE (openssl rand -base64 48)
cp compose.override.yml.example compose.override.yml
cd ..
npm run plausible:up
```

1. Abre `BASE_URL` en el navegador y crea el primer usuario.
2. En Plausible → **Settings → General**, añade el sitio `peranto.app` (y `www` si aplica).
3. Pon `DISABLE_REGISTRATION=true` en `plausible/.env` y reinicia: `npm run plausible:down && npm run plausible:up`.

## Proxy inverso (HTTPS)

Plausible escucha en `127.0.0.1:8000`. Ejemplo Caddy:

```caddy
analytics.peranto.app {
  reverse_proxy 127.0.0.1:8000
}
```

## Conectar la landing

En el `.env` de la raíz del proyecto (build/deploy del sitio):

```env
PUBLIC_ANALYTICS_PROVIDER=plausible
PUBLIC_PLAUSIBLE_DOMAIN=peranto.app
PUBLIC_PLAUSIBLE_SCRIPT_URL=https://analytics.peranto.app/js/script.outbound-links.tagged-events.js
```

Eventos custom del repo: `CTA *`, `CTA Demo`, `Project Panel`.

## Comandos (desde la raíz del repo)

| Comando | Acción |
|---------|--------|
| `npm run plausible:up` | Levantar stack |
| `npm run plausible:down` | Detener |
| `npm run plausible:logs` | Ver logs |

## Notas

- En **Railway**, usa la plantilla oficial (3 servicios gestionados), no este compose.
- En **Netlify/Cloudflare Pages** solo va la landing estática; Plausible siempre en otro servicio.
