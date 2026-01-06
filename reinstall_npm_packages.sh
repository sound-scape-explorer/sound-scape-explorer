#!/bin/bash

rm -rf ./node_modules/
rm -rf ./campaign/node_modules/
rm -rf ./audio/node_modules/
rm -rf ./front/node_modules/
rm -rf ./visualisation/node_modules/

pnpm i
cd campaign && pnpm i && cd ..
cd audio && pnpm i && cd ..
cd front && pnpm i && cd ..
cd visualisation && npm i && cd ..
