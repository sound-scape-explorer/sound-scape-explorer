#!/bin/bash

####################
# PROCESSING START #
####################

# exit on error
set -e

echo "=== Processing Build Smoke Test ==="

# clean
rm -f test.json
rm -f test.h5
rm -rf venv-test

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
pip install -e processing

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

# cleanup test config
rm test.json

# verify build
cd processing
pip install build
python -m build
cd ..

echo "✓ Processing build test passed"

# clean
deactivate
rm -f test.json
rm -f test.h5
rm -rf venv-test

##################
# PROCESSING END #
##################

# old tests

# # processing
# source processing/venv/bin/activate
# pytest processing/tests/cli
# pytest -s processing/tests/extractions
# pytest -s processing/tests/aggregations
# deactivate

# # app builds
# pnpm test:build
