#!/bin/bash

# exit on error
set -e

cd audio

pnpm i
timeout 5s pnpm dev || true
pnpm build

cd ..

timeout 5s pnpm serve audio/dist || true
