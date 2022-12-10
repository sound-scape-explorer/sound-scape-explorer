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

# File system helpers
# Returns 0 (True) if folder exists
# Returns 1 (False) otherwise

function check_extract_folder {
  if [ -d "features" ]; then
    return 0
  else
    mkdir features
    return 1
  fi
}

function check_compute_folder {
  if [ -d "generated" ]; then
    return 0
  else
    mkdir generated
    return 1
  fi
}

function check_compute_volume_folder {
  if [ -d "generated/single" ]; then
    return 0
  else
    return 1
  fi
}

function check_compute_covering_folder {
  if [ -d "generated/pairwise" ]; then
    return 0
  else
    return 1
  fi
}

function check_compute_umap_folder {
  if [ -d "generated/umap" ]; then
    return 0
  else
    return 1
  fi
}

# Processing helpers

function run_extract_all {
  check_extract_folder
  local res=$?
  [ "$res" -eq 0 ] && return

  sse extract all
}

function run_compute_volume {
  check_compute_folder
  check_compute_volume_folder
  local res=$?
  [ "$res" -eq 0 ] && return

  sse compute volume
}

function run_compute_covering {
  check_compute_folder
  check_compute_covering_folder
  local res=$?
  [ "$res" -eq 0 ] && return

  sse compute covering
}

function run_compute_umap {
  check_compute_folder
  check_compute_umap_folder
  local res=$?
  [ "$res" -eq 0 ] && return

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

function run_config_test {
  sse show config --json
}

function run_config_populate_columns {
  sse config populate-columns
}

function run_all {
  run_config_populate_columns

  run_extract_all
  run_computes
  run_config
}

function run_all_but_volume {
  run_config_populate_columns

  run_extract_all

  run_compute_covering
  run_compute_umap

  run_config
}

function run_all_but_covering {
  run_config_populate_columns

  run_extract_all

  run_compute_volume
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

  [ "$2" == "all-but-volume" ] && run_all_but_volume
  [ "$2" == "all-but-covering" ] && run_all_but_covering

  [ "$2" == "config" ] && run_config
  [ "$2" == "config-test" ] && run_config_test
  [ "$2" == "config-populate-columns" ] && run_config_populate_columns
fi

print_end
