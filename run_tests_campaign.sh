#!/bin/bash

# exit on error
set -e

cd campaign

pnpm i
timeout 5s pnpm dev || true
pnpm build

cd ..

timeout 5s pnpm serve campaign/dist || true
