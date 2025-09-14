#!/bin/bash
set -e

echo "🚀 Starting build..."

# Clean old dist
echo "🧹 Cleaning dist folder..."
rimraf dist || { echo "❌ Failed to clean dist"; exit 1; }
echo "✅ Cleaned dist"

# Generate prisma client
echo "🔄 Generating Prisma client..."
pnpm prisma generate || { echo "❌ Prisma generation failed"; exit 1; }
echo "✅ Prisma client generated"

# Type check
echo "🔍 Running type-check..."
pnpm type-check || { echo "❌ Type check failed"; exit 1; }
echo "✅ Type check passed"

# Build
echo "🏗️ Compiling with tsc..."
tsc --skipLibCheck || { echo "❌ tsc failed"; exit 1; }
echo "✅ tsc completed"

# Fix paths
echo "🔧 Running tsc-alias..."
tsc-alias || { echo "❌ tsc-alias failed"; exit 1; }
echo "✅ tsc-alias completed"

echo "🎉 Build completed successfully!"
