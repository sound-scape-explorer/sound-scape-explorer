#!/bin/bash

version=$(jq -r '.version' package.json)

cd front || exit

export VITE_SSE_VERSION=$version

yarn dev
