#!/bin/bash

# exit on error
set -e

function clean_artefacts() {
	rm -rf processing-artefacts
}

echo "=== Processing Build Smoke Test ==="

# clean
clean_artefacts

# create and activate venv
python3.11 -m venv processing-artefacts/venv
source processing-artefacts/venv/bin/activate

# verify venv binaries
which python
python --version
which pip
pip --version

# install dependencies from pyproject.toml
pip install --upgrade pip
pip install -e processing[dev]

# verify CLI help
sse --help

# create test config with injected audio path and storage path
AUDIO_PATH="$(pwd)/examples/audio"

jq --arg path "$AUDIO_PATH" '.settings.audioPath = $path' examples/coral-reef-light.json >processing-artefacts/test.json

jq --arg path "test.h5" '.settings.storagePath = $path' processing-artefacts/test.json >processing-artefacts/test.tmp.json && mv processing-artefacts/test.tmp.json processing-artefacts/test.json

# verify CLI start
sse processing-artefacts/test.json --validate

# verify CLI start CPU mode
sse processing-artefacts/test.json --validate --cpu

# verify build
cd processing
python -m build
cd ..

# run pytest
pytest processing/tests/cli
pytest -s processing/tests/extractions
pytest -s processing/tests/aggregations

echo "✓ Processing tests passed"

# clean
deactivate
clean_artefacts
