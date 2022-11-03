#!/bin/bash

echo "Processing data..."

cd sample || exit

sse extract all

sse compute volume && sse compute covering && sse compute umap

sse show config --json > generated/ghost-config.json

cd ..
