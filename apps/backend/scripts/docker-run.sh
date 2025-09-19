#!/bin/sh
set -euo pipefail


# docker-run.sh

# --- Helpers ---
log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"
}

run_step() {
  local name="$1"
  shift
  log "▶️  $name..."
  local start=$(date +%s)
  "$@"
  local end=$(date +%s)
  local duration=$((end - start))
  log "✅ $name completed in ${duration}s"
}

# --- Signal Handling (graceful shutdown) ---
trap "log '🛑 Caught termination signal, shutting down...'; exit 0" SIGTERM SIGINT

# --- Required Environment Variables ---
: "${DATABASE_URL:?❌ DATABASE_URL environment variable is required}"

# --- Default Environment Variables ---
: "${NODE_ENV:=production}"
: "${FORCE_MIGRATE:=false}"

log "🔍 Environment: $NODE_ENV"

# --- Validate Prisma Schema ---
if [ ! -f "./prisma/schema.prisma" ]; then
    log "❌ Error: Prisma schema not found at ./prisma/schema.prisma"
    exit 1
fi

# --- Generate Prisma Client ---
run_step "Generate Prisma client" pnpm exec prisma generate --schema ./prisma/schema.prisma

# --- Apply Migrations ---
if [ "$NODE_ENV" = "production" ] || [ "$FORCE_MIGRATE" = "true" ]; then
    run_step "Run Prisma migrations" pnpm exec prisma migrate deploy --schema ./prisma/schema.prisma
else
    log "⚠️  Skipping migrations (NODE_ENV=$NODE_ENV, FORCE_MIGRATE=$FORCE_MIGRATE)"
fi

# --- Optional: Healthcheck marker for Docker ---
echo "✅ Backend initialized" > /tmp/healthy
log "🩺 Healthcheck marker written to /tmp/healthy"

# --- Start Backend Server ---
run_step "Start backend server" exec node dist/server.js
