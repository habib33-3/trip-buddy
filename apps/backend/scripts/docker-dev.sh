#!/bin/sh
set -euo pipefail


# docker-dev.sh

APP="trip-buddy-backend"

echo "🔄 Checking Prisma schema..."
if [ ! -f "prisma/schema.prisma" ]; then
  echo "❌ No schema.prisma found in $(pwd)/prisma"
  exit 1
fi

echo "🧹 Cleaning old Prisma client..."
rm -rf src/generated/prisma

echo "🔄 Generating Prisma client..."
pnpm --filter=$APP prisma generate

echo "✅ Prisma client ready"

echo "🚀 Starting $APP in dev mode..."
exec pnpm --filter=$APP dev
