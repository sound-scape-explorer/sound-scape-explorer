#!/bin/bash

cd front || exit

docker build -t sound-scape-explorer--front .
