#!/bin/bash

echo "Installing python dependencies..."

pip install numpy matplotlib seaborn torchaudio librosa xlrd pandas umap-learn openpyxl

echo "Running python scripts..."

pip install -e ./scripts

echo "Creating sample folders..."

mkdir ./sample/generated ./sample/features

ln -s ../sample/generated ./sse-v1

ln -s ../sample/features ./sse-v1

echo "Computing and extracting data"

cd sample || exit

sse extract all

sse compute volume && sse compute covering && sse compute umap

sse show config --json > generated/ghost-config.json

cd ..

cd sse-v1 || exit

yarn
