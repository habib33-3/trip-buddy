#!/bin/sh
set -eu

log() {
    printf "\n%s\n" "$1"
}

run_step() {
    name="$1"
    shift
    log "$name..."
    start=$(date +%s)
    "$@"
    end=$(date +%s)
    duration=$((end - start))
    # Remove bash-specific string substitution ${name/…/}
    echo "✅ $name completed in ${duration}s"
}

# Track total time
BUILD_START=$(date +%s)

echo "🚀 Starting build..."

run_step "🧹 Cleaning dist folder" rimraf dist
run_step "🔄 Generating Prisma client" pnpm prisma generate
run_step "🔍 Running type-check" pnpm type-check
run_step "🏗️ Compiling with tsc" tsc --skipLibCheck
run_step "🔧 Running tsc-alias" tsc-alias

BUILD_END=$(date +%s)
TOTAL_DURATION=$((BUILD_END - BUILD_START))

printf "\n🎉 Build completed successfully in %ss!\n" "$TOTAL_DURATION"
