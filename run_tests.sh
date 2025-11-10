#!/bin/bash

# processing
source processing/venv/bin/activate
pytest processing/tests/cli
pytest -s processing/tests/extractions
pytest -s processing/tests/aggregations
deactivate
