#!/bin/bash

# exit on error
set -e

./run_tests_processing.sh
./run_tests_pnpm.sh
./run_tests_campaign.sh
