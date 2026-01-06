#!/bin/bash

# exit on error
set -e

cd visualisation

# install packages
npm i

# run e2e tests (playwright handles dev server)
npm run test:e2e

# check build
npm run build
ls out/make/deb/x64/sound-scape-explorer_0.0.0_amd64.deb

cd ..
