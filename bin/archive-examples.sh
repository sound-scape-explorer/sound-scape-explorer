#!/bin/bash

function browse_to_examples(){
  cd examples || exit 1
}

function archive_sse_cpu_docker_windows(){
  cd sse-cpu-docker-windows || exit 1
  zip sse-cpu-docker-windows.zip ./* -x "*.gitignore" "*.png"
  mv sse-cpu-docker-windows.zip ..
  cd ..
}

function archive_sse_cuda_docker_windows(){
  cd sse-cuda-docker-windows || exit 1
  zip sse-cuda-docker-windows.zip ./* -x "*.gitignore" "*.png"
  mv sse-cuda-docker-windows.zip ..
  cd ..
}

function archive_sse_next_docker_windows(){
  cd sse-next-docker-windows || exit 1
  zip sse-next-docker-windows.zip ./* -x "*.gitignore" "*.png"
  mv sse-next-docker-windows.zip ..
  cd ..
}

function archive_sse_web_docker_linux(){
  cd sse-web-docker-linux || exit 1
  zip sse-web-docker-linux.zip ./* -x "*.gitignore" "*.png"
  mv sse-web-docker-linux.zip ..
  cd ..
}

function archive_sse_web_docker_windows(){
  cd sse-web-docker-windows || exit 1
  zip sse-web-docker-windows.zip ./* -x "*.gitignore" "*.png"
  mv sse-web-docker-windows.zip ..
  cd ..
}

browse_to_examples
archive_sse_cpu_docker_windows
archive_sse_cuda_docker_windows
archive_sse_next_docker_windows
archive_sse_web_docker_linux
archive_sse_web_docker_windows
