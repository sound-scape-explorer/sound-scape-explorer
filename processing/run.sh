#!/bin/bash

function print_start {
  echo ""
  echo "-----------------------"
  echo "Processing: Starting..."
  echo "-----------------------"
  echo ""
}

function print_end {
  echo ""
  echo "---------------------"
  echo "Processing: Ending..."
  echo "---------------------"
  echo ""
}

function print_abort {
  echo ""
  echo "----------------------"
  echo "Processing: Aborted..."
  echo "----------------------"
  echo ""

  exit 0
}

cd /sample || print_abort

mkdir generated || print_abort

mkdir features || print_abort

print_start

sse extract all

sse compute volume && sse compute covering && sse compute umap

sse show config --json > generated/ghost-config.json

print_end
