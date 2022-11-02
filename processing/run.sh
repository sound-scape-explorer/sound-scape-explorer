#!/bin/bash

cd /sample || exit 0

mkdir generated || exit 0

mkdir features || exit 0

echo ""
echo "--------------------------------"
echo "SSE: Wait for processing to end!"
echo "--------------------------------"
echo ""

sse extract all

sse compute volume && sse compute covering && sse compute umap

sse show config --json > generated/ghost-config.json
