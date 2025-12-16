#!/bin/bash

# exit on error
set -e

cd front

pnpm i

pnpm dev &
DEV_PID=$!

# Wait and check if it crashed
sleep 3

# test main endpoint
RESPONSE=$(curl -s http://localhost:5530)
if echo "$RESPONSE" | grep -q "SoundScapeExplorer"; then
	echo "✓ Dev server responding correctly"
else
	echo "✗ Dev server health check failed"
	pkill -P $DEV_PID 2>/dev/null || true
	kill $DEV_PID 2>/dev/null || true
	exit 1
fi

pnpm build

cd ..

timeout 5s pnpm serve front/dist || true
