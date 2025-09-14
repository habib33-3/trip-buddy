#!/bin/sh
set -e

echo "Running Prisma migrations..."
pnpm --filter trip-buddy-backend exec prisma migrate deploy --schema ./prisma/schema.prisma
echo "Migrations completed"


echo "Starting backend..."
node dist/server.js
