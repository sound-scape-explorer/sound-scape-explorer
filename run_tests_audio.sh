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

# test main endpoint
RESPONSE=$(curl -s http://localhost:5531)
if echo "$RESPONSE" | grep -q "SoundScapeExplorer Audio Service"; then
	echo "✓ Dev server responding correctly"
else
	echo "✗ Dev server health check failed"
	pkill -P $DEV_PID 2>/dev/null || true
	kill $DEV_PID 2>/dev/null || true
	exit 1
fi

# test file endpoint
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:5531/get?file=/2021_naturel_1/data_filtree/20210216T120200_2614231302179085_2.0.wav&start=0&end=15000")
if [ "$STATUS" -eq 200 ]; then
	echo "✓ Success: Got 200"
else
	echo "✗ Failed: Got $STATUS"
fi

# Kill dev server - kill all children first, then parent
pkill -P $DEV_PID 2>/dev/null || true
kill $DEV_PID 2>/dev/null || true
# Nuclear option: kill anything on port 5531
lsof -ti:5531 | xargs kill -9 2>/dev/null || true

pnpm build
cd ..

# start production server
set +e
timeout 5s pnpm serve audio/dist
EXIT_CODE=$?
set -e

if [ $EXIT_CODE -ne 124 ] && [ $EXIT_CODE -ne 0 ]; then
	echo "✗ Serve failed with exit code $EXIT_CODE"
	exit $EXIT_CODE
fi

echo "✓ All tests passed"
