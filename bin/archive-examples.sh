#!/bin/bash

# Props

version=$1

# Functions

function iterate(){
  local name

  function archive(){
    cd "$name" || exit 1
    cp ../common/start-windows.ps1 . && wait
    cp ../common/start-linux.sh . && wait
    zip "$name.zip" ./* -r -x "*.gitignore" "*.png"
    mv "$name.zip" ../"$name-$version.zip"
    cd ..
  }

  for value in "${names[@]}"
  do
    name="${value}"
    archive
  done
}

function rename(){
  local name
  local file

  for value in "${names[@]}"
  do
    name="${value}"
    file="$name"/docker-compose.yml
    sed -i "s/:latest/:$version/g" "$file"
  done
}

# Main

names=(
  sse-audio
  sse-cpu
  sse-cuda
  sse-front
)

cd examples || exit 1
rename
iterate
