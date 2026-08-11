#!/usr/bin/env sh
set -eu

echo "[peranto] Running prisma migrate deploy..."
npx prisma migrate deploy

echo "[peranto] Starting Astro on 0.0.0.0..."
export HOST=0.0.0.0
# Prefer IPv4 so outbound calls (Telegram) don't hang on broken IPv6 routes
export NODE_OPTIONS="${NODE_OPTIONS:+$NODE_OPTIONS }--dns-result-order=ipv4first"

# Local: Node 20+ --env-file loads .env (Railway injects vars into the process).
if [ -f .env ]; then
  exec node --env-file=.env ./dist/server/entry.mjs
fi
exec node ./dist/server/entry.mjs
