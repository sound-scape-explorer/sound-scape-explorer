#!/bin/bash

# exit on error
set -e

pnpm i
cd campaign && pnpm i && cd ..
cd audio && pnpm i && cd ..
cd front && pnpm i && cd ..
cd visualisation && npm i && cd ..
