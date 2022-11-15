#!/bin/bash

function quit {
  exit 0
}

function print_back_error {
  echo ""
  echo "-------------------------------------"
  echo "Back: Error while changing directory."
  echo "-------------------------------------"
  echo ""

  quit
}

function print_front_error {
  echo ""
  echo "-------------------------------------"
  echo "Front: Error while changing directory."
  echo "-------------------------------------"
  echo ""

  quit
}

function print_back_starting {
  echo ""
  echo "-----------------"
  echo "Back: Starting..."
  echo "-----------------"
  echo ""
}

function print_back_ending {
  echo ""
  echo "---------------"
  echo "Back: Ending..."
  echo "---------------"
  echo ""
}

function print_processing_starting {
  echo ""
  echo "-----------------------"
  echo "Processing: Starting..."
  echo "-----------------------"
  echo ""
}

function print_processing_ending {
  echo ""
  echo "---------------------"
  echo "Processing: Ending..."
  echo "---------------------"
  echo ""
}

function print_front_starting {
  echo ""
  echo "------------------"
  echo "Front: Starting..."
  echo "------------------"
  echo ""
}

function print_front_ending {
  echo ""
  echo "----------------"
  echo "Front: Ending..."
  echo "----------------"
  echo ""
}

print_back_starting

cd back || print_back_error

python3 -m venv venv

source venv/bin/activate

pip install -r requirements.txt

deactivate

cd ..

print_back_ending

print_processing_starting

pip install numpy matplotlib seaborn torchaudio librosa xlrd pandas umap-learn openpyxl

pip install -e ./processing

mkdir ./sample/generated ./sample/features

print_processing_ending

print_front_starting

cd front || print_back_error

yarn

cd ..

print_front_ending
