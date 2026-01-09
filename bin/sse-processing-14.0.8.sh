#!/bin/bash

version="14.0.8"
venv="sse-processing-$version"
script="$venv/bin/activate"

function activate() {
	exec bash --init-file "$script"
	return 0
}

if [[ ! -f "$script" ]]; then
	echo "Creating virtual environment..."
	python3.11 -m venv $venv

	echo "Activating virtual environment..."
	source $script

	echo "Upgrading pip..."
	python -m pip install --upgrade pip

	echo "Installing SoundScapeExplorer..."
	pip install sound-scape-explorer==$version
	sse_download

	activate
fi

activate
