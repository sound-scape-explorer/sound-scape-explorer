#!/bin/bash
set -e

(cd ./campaign && pnpm i) &
(cd ./audio && pnpm i) &
(cd ./front && pnpm i) &
(cd ./visualisation && npm i) &
(cd ./processing && source venv/bin/activate && pip install -e ".[dev]" && deactivate) &

wait # Wait for all background jobs to complete
echo "✓ All dependencies installed successfully!"
