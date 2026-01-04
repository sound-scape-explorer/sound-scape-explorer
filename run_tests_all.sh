#!/bin/bash

# exit on error
set -e

# root packages
pnpm i

# prepare visualisation builds and binaries
pnpm visualisation:prebuild
pnpm visualisation:prepare-bins

# run through each modules
./run_tests_processing.sh
./run_tests_campaign.sh
./run_tests_audio.sh
./run_tests_front.sh
./run_tests_visualisation.sh
