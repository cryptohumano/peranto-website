# Peranto — Landing

Sitio estático bilingüe (ES/EN) para [Peranto](https://peranto.app). Punto de entrada hacia el laboratorio Ghost y el trabajo abierto en GitHub.

## Requisitos

- Node.js ≥ 22.12

## Desarrollo

Requiere **Node.js ≥ 22.12** (Astro 6 y `sharp` para imágenes no funcionan en Node 18).

```bash
nvm use
npm install
npm run dev
```

Si ves `Could not find Sharp`, casi siempre es porque el servidor corre con Node 18. Para el entorno correcto:

```bash
nvm use 22
npm install
npm run dev
```

- Español: http://localhost:4321/es/
- English: http://localhost:4321/en/

## Configuración

Copia `.env.example` a `.env` y ajusta:

| Variable | Uso |
|----------|-----|
| `PUBLIC_GHOST_URL` | URL del CMS Ghost (subdominio) |
| `GHOST_CONTENT_API_KEY` | Content API key para listar posts en «Explorar» |

Edita `src/config/site.ts` para URLs de GitHub, email y enlaces de proyectos.

## Logos

- `src/assets/logo-full.png` — cabecera
- `src/assets/logo-icon.png` — favicon y pie
- `public/favicon.png` — copia del icono para el navegador

## Build

```bash
npm run build
npm run preview
```

## Deploy en GitHub Pages (producción)

Repositorio: [cryptohumano/peranto-website](https://github.com/cryptohumano/peranto-website).

1. **Obligatorio antes del primer deploy:** [Settings → Pages](https://github.com/cryptohumano/peranto-website/settings/pages) → **Build and deployment** → Source: **GitHub Actions** (no «Deploy from a branch»). Sin esto, el job `deploy-pages` falla con `HttpError: Not Found`.
2. Push a la rama `main` (el workflow `.github/workflows/deploy-pages.yml` construye y publica `dist/`).
3. **Secrets** (opcionales, se pueden añadir después): mismos nombres que en `.env.example` → Settings → Secrets and variables → Actions.
4. **Dominio custom** `peranto.app`: el archivo `public/CNAME` ya está en el repo. En Cloudflare (o tu DNS):
   - Registro **A** `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - O **CNAME** `@` / `www` según tu proveedor (Cloudflare: CNAME a `cryptohumano.github.io` con proxy desactivado para Pages, o usar las IPs de GitHub)
   - En GitHub → Pages → **Custom domain** → `peranto.app` y activar HTTPS.

Plausible en Railway (no en este repo estático): [plantilla](https://railway.com/template/mzYEXO) → `analytics.peranto.app`; luego añade los secrets `PUBLIC_ANALYTICS_*`.

## Deploy en Railway (alternativo)

Solo si prefieres servir la landing desde Railway en lugar de Pages. Guía: **[RAILWAY.md](./RAILWAY.md)**.

## Plausible local (Docker / VPS)

Para desarrollo o un VPS propio, no Railway:

```bash
cd plausible && cp .env.example .env && cp compose.override.yml.example compose.override.yml
npm run plausible:up
```

Ver [plausible/README.md](./plausible/README.md).

## Estructura

```
src/
  assets/          # Logos
  components/      # Secciones del landing
  config/site.ts   # URLs y proyectos
  i18n/ui.ts       # Copy ES/EN
  layouts/
  lib/ghost.ts     # Integración opcional Ghost
  pages/es|en/
```
