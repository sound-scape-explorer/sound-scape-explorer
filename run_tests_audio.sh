#!/bin/bash
set -e

cd audio
pnpm i

# Start dev server in background
pnpm dev $(which ffmpeg) $(which ffprobe) ../examples/audio &
DEV_PID=$!

# Wait and check if it crashed
sleep 3

if ! kill -0 $DEV_PID 2>/dev/null; then
	echo "✗ Dev server crashed on startup"
	exit 1
fi

# Test the server
RESPONSE=$(curl -s http://localhost:5531)
if echo "$RESPONSE" | grep -q "SoundScapeExplorer Audio Service"; then
	echo "✓ Dev server responding correctly"
else
	echo "✗ Dev server health check failed"
	pkill -P $DEV_PID 2>/dev/null || true
	kill $DEV_PID 2>/dev/null || true
	exit 1
fi

# Kill dev server - kill all children first, then parent
pkill -P $DEV_PID 2>/dev/null || true
kill $DEV_PID 2>/dev/null || true
# Nuclear option: kill anything on port 5531
lsof -ti:5531 | xargs kill -9 2>/dev/null || true

pnpm build
cd ..

# Start production server
set +e
timeout 5s pnpm serve audio/dist
EXIT_CODE=$?
set -e

if [ $EXIT_CODE -ne 124 ] && [ $EXIT_CODE -ne 0 ]; then
	echo "✗ Serve failed with exit code $EXIT_CODE"
	exit $EXIT_CODE
fi

echo "✓ All tests passed"
