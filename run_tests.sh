#!/bin/bash

# processing
source processing/venv/bin/activate
pytest
deactivate