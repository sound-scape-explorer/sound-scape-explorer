#!/bin/bash

####################
# PROCESSING START #
####################

function clean_processing() {
	rm -f test.json
	rm -f test.h5
	rm -rf venv-test
}

# exit on error
set -e

echo "=== Processing Build Smoke Test ==="

# clean
clean_processing

# create and activate venv
python3.11 -m venv venv-test
source venv-test/bin/activate

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

jq --arg path "$AUDIO_PATH" '.settings.audioPath = $path' examples/coral-reef-light.json >test.json

jq --arg path "test.h5" '.settings.storagePath = $path' test.json >test.tmp.json && mv test.tmp.json test.json

# verify CLI start
sse test.json --validate

# verify CLI start CPU mode
sse test.json --validate --cpu

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
clean_processing

##################
# PROCESSING END #
##################

# # app builds
# pnpm test:build
