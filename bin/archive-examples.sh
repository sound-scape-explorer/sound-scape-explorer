#!/bin/bash

# Functions

function iterate(){
  local name

  function archive(){
    cd "$name" || exit 1
    cp ../common/start-windows.ps1 . && wait
    cp ../common/start-linux.sh . && wait
    [ -d 'sample' ] && cp ../common/config.xlsx sample && wait
    zip "$name.zip" ./* -r -x "*.gitignore" "*.png"
    mv "$name.zip" ..
    cd ..
  }

  for value in "${names[@]}"
  do
    name="${value}"
    archive
  done
}

# Main

names=(
  sse-cpu-docker
  sse-cuda-docker
  sse-web-docker
  sse-next-docker
)

cd examples || exit 1
iterate
