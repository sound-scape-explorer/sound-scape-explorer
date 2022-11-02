#!/bin/bash

echo "Installing python dependencies..."

pip install numpy matplotlib seaborn torchaudio librosa xlrd pandas umap-learn openpyxl

echo "Running python scripts..."

pip install -e ./processing

echo "Creating sample folders..."

mkdir ./sample/generated ./sample/features

# We don't need this anymore with the new back end
#ln -s ../sample/generated ./sse-v1

#ln -s ../sample/features ./sse-v1

echo "Computing and extracting data"

cd sample || exit

sse extract all

sse compute volume && sse compute covering && sse compute umap

sse show config --json > generated/ghost-config.json

cd ..

cd sse-v1 || exit

yarn

cd ..

echo "Frontend: Installing dependencies..."

cd front || exit

yarn

cd ..

echo "Backend: Installing venv and dependencies..."

cd back || exit

python3 -m venv venv

source venv/bin/activate

pip install -r requirements.txt

deactivate

cd ..
