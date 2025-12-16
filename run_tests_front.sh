#!/bin/bash

# exit on error
set -e

cd front

pnpm i
# timeout 5s pnpm dev || true
timeout -s KILL 5s pnpm dev || true
pnpm build

cd ..

timeout 5s pnpm serve front/dist || true
