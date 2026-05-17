# Desplegar Peranto en Railway

Un **proyecto Railway** con **dos bloques** (no un solo contenedor):

| Servicio | Qué es | Origen |
|----------|--------|--------|
| **landing** | Sitio Astro (`peranto.app`) | Este repo, raíz del proyecto |
| **plausible** | Analytics (`analytics.peranto.app`) | [Plantilla oficial Railway](https://railway.com/template/mzYEXO) |

Ghost (`learn.peranto.app`), CriterIA y Yohualli siguen en sus URLs actuales; solo la landing y Plausible viven aquí.

---

## 1. Landing (este repositorio)

### Crear el servicio

1. [Railway](https://railway.app) → **New Project** → **Deploy from GitHub** → `landing-peranto`.
2. **Settings → Root Directory**: vacío o `/` (no `plausible/`).
3. **Variables** (pestaña del servicio landing):

| Variable | Ejemplo |
|----------|---------|
| `PUBLIC_GHOST_URL` | `https://learn.peranto.app` |
| `GHOST_CONTENT_API_KEY` | tu key Ghost |
| `PUBLIC_ANALYTICS_PROVIDER` | `plausible` |
| `PUBLIC_PLAUSIBLE_DOMAIN` | `peranto.app` |
| `PUBLIC_PLAUSIBLE_SCRIPT_URL` | `https://TU-PLAUSIBLE.up.railway.app/js/script.outbound-links.tagged-events.js` |
| `PUBLIC_GOOGLE_SITE_VERIFICATION` | (opcional) |

4. **Settings → Networking** → **Generate Domain** (ej. `landing-peranto.up.railway.app`).
5. **Custom Domain** → `peranto.app` y `www.peranto.app` (CNAME al dominio Railway).
6. Build: Nixpacks usa `railway.toml` (`npm run build` + `npm run start` con `serve`).

### Probar en local como Railway

```bash
npm run build
PORT=8080 npm run start
```

---

## 2. Plausible (plantilla Railway, mismo proyecto)

El `docker-compose` en `/plausible` sirve para **VPS local**; en Railway usa la plantilla mantenida por Railway (Postgres + ClickHouse + Plausible).

1. En el **mismo proyecto** Railway → **Add service** → **Deploy template**.
2. Busca **Plausible Analytics** o abre:  
   [https://railway.com/template/mzYEXO](https://railway.com/template/mzYEXO)
3. Completa variables (Railway genera secretos de DB).
4. Cuando esté arriba, abre la URL del servicio Plausible → crea tu usuario admin.
5. Añade el sitio **`peranto.app`** en el panel.
6. Pon **`DISABLE_REGISTRATION=true`** en las variables del servicio Plausible y redeploy.
7. **Custom domain** → `analytics.peranto.app` (opcional pero recomendado).
8. Copia la URL pública y actualiza en el servicio **landing**:

```env
PUBLIC_PLAUSIBLE_SCRIPT_URL=https://analytics.peranto.app/js/script.outbound-links.tagged-events.js
```

(Usa la URL `.up.railway.app` hasta tener el dominio propio.)

---

## 3. Coste y recursos

- **Landing**: poco consumo (sitio estático servido con Node + `serve`).
- **Plausible**: ~3 servicios (app + Postgres + ClickHouse); Railway cobra por uso; prevé **varios USD/mes** según tráfico (más si hay muchas pageviews).

ClickHouse en Railway no usa el `compose.yml` del repo; la plantilla ya trae la config ajustada.

---

## 4. Qué no va en este deploy

| Componente | Dónde |
|------------|--------|
| CMS Ghost | `learn.peranto.app` (aparte) |
| CriterIA | `criteria.peranto.app` |
| Yohualli demo | `yohualli.up.railway.app` (otro servicio/repo) |
| `plausible/` docker-compose | Solo desarrollo local o VPS |

---

## 5. Checklist post-deploy

- [ ] `https://peranto.app` → redirige a `/es/`
- [ ] `/en/` y `/es/` cargan
- [ ] Script Plausible en el HTML (view source → `script.outbound-links`)
- [ ] Panel Plausible recibe visitas de prueba
- [ ] Eventos custom (`Project Panel`, `CTA Demo`) en **Goals/Events** de Plausible

---

## Referencias

- [Astro on Railway](https://docs.astro.build/en/guides/deploy/railway/)
- [Plausible template Railway](https://github.com/railwayapp-templates/plausible)
- [Plausible CE (self-host VPS)](plausible/README.md)
