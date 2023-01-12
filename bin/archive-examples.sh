#!/bin/bash

function browse_to_examples(){
  cd examples || exit 1
}

function archive_sse_web_docker_windows(){
  cd sse-web-docker-windows || exit 1
  zip sse-web-docker-windows.zip ./*
  mv sse-web-docker-windows.zip ..
}

browse_to_examples
archive_sse_web_docker_windows
