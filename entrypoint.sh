#!/bin/bash
set -e

echo "Pushing database schema..."
npx drizzle-kit push --force

echo "Seeding database (idempotent)..."
npx tsx src/lib/db/seed.ts || true

echo "Starting server..."
exec node server.js
