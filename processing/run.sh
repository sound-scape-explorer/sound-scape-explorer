#!/bin/bash

# Arguments:
# $1 = Path to `sample` folder
# $2 = Selected tasks to process
#     - undefined: see "all"
#     - "all": Do all tasks
#     - "extract": Do extraction only
#     - "compute": Do computations only
#     - "compute-volume": Do volume computations only
#     - "compute-covering": Do covering computations only
#     - "compute-umap": Do UMAP computations only
#     - "config": Do configuration file generation only

# Console feedbacks helpers

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

# Processing helpers
# TODO: All computes need extracted data first, add file checks

function run_extract_all {
  sse extract all
}

function run_compute_volume {
  sse compute volume
}

function run_compute_covering {
  sse compute covering
}

function run_compute_umap {
  sse compute umap
}

function run_computes {
  run_compute_volume
  run_compute_covering
  run_compute_umap
}

function run_config {
  sse show config --json > generated/ghost-config.json
}

function run_all {
  run_extract_all
  run_computes
  run_config
}

function run_all_but_volume {
  run_extract_all
  run_compute_covering
  run_compute_umap
  run_config
}

# Change to target directory

if [ -z "$1" ]
then
  # empty variable
  cd sample || print_abort
else
  cd "$1" || print_abort
fi

# Create target folders

#mkdir features || print_abort
#mkdir generated || print_abort

# Process

print_start

if [ -z "$2" ] || [ "$2" == "all" ]
then
  run_all
else
  [ "$2" == "extract" ] && run_extract_all
  [ "$2" == "compute" ] && run_computes
  [ "$2" == "compute-volume" ] && run_compute_volume
  [ "$2" == "compute-covering" ] && run_compute_covering
  [ "$2" == "compute-umap" ] && run_compute_umap
  [ "$2" == "config" ] && run_config
  [ "$2" == "all-but-volume" ] && run_all_but_volume
fi

print_end
