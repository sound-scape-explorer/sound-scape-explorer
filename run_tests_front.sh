#!/bin/bash
set -e

cleanup() {
	# Kill everything on port 5530
	fuser -k 5530/tcp 2>/dev/null || true
	sleep 1
}

trap cleanup EXIT

cd front
pnpm i
pnpm exec playwright install

# Start dev server in background
pnpm dev >/dev/null 2>&1 &
DEV_PID=$!

# Wait for server to be ready
sleep 3

# Health check
RESPONSE=$(curl -s http://localhost:5530)
if echo "$RESPONSE" | grep -q "SoundScapeExplorer"; then
	echo "✓ Dev server responding correctly"
else
	echo "✗ Dev server health check failed"
	exit 1
fi

pnpm test:e2e

# Explicit cleanup before build
fuser -k 5530/tcp 2>/dev/null || true
sleep 1

pnpm build
cd ..
timeout 5s pnpm serve front/dist || true
