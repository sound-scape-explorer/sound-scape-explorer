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

function intercept_sigint {
  trap "exit" INT
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

function check_compute_features_folder {
  if [ -d "generated/features" ]; then
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

  sse compute volume --no-plot
}

function run_compute_features {
  check_compute_folder
  check_compute_features_folder
  local res=$?
  [ "$res" -eq 0 ] && return

  sse compute features
}

function run_compute_covering {
  check_compute_folder
  check_compute_covering_folder
  local res=$?
  [ "$res" -eq 0 ] && return

  sse compute covering --no-plot
}

function run_compute_umap {
  check_compute_folder
  check_compute_umap_folder
  local res=$?
  [ "$res" -eq 0 ] && return

  sse compute umap --no-plot
}

function export_config {
  sse config export
}

function export_config_test {
  sse show config
}

function run_config_populate_files {
  sse config populate-files
}

function run_test {
  sse test
}

function run_compute_all {
  run_compute_volume
  run_compute_covering
  run_compute_umap
  run_compute_features
  run_compute_indicators
}

function run_all {
  run_extract_all
  run_compute_all
  export_config
}

function run_all_but_volume {
  run_extract_all

  run_compute_covering
  run_compute_umap
  run_compute_features
  run_compute_indicators

  export_config
}

function run_all_but_covering {
  run_extract_all

  run_compute_volume
  run_compute_umap
  run_compute_features
  run_compute_indicators

  export_config
}

function run_compute_indicators {
  sse compute indicators
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

intercept_sigint
print_start

if [ -z "$2" ] || [ "$2" == "all" ]
then
  run_all
else
  [ "$2" == "extract" ] && run_extract_all

  [ "$2" == "compute" ] && run_compute_all
  [ "$2" == "compute-volume" ] && run_compute_volume
  [ "$2" == "compute-covering" ] && run_compute_covering
  [ "$2" == "compute-umap" ] && run_compute_umap
  [ "$2" == "compute-features" ] && run_compute_features
  [ "$2" == "compute-indicators" ] && run_compute_indicators

  [ "$2" == "all-but-volume" ] && run_all_but_volume
  [ "$2" == "all-but-covering" ] && run_all_but_covering

  [ "$2" == "config" ] && export_config
  [ "$2" == "config-test" ] && export_config_test
  [ "$2" == "config-populate-files" ] && run_config_populate_files

  [ "$2" == "test" ] && run_test
fi

print_end
