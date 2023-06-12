#!/bin/bash

versions=(
	python3
	python
)

for version in "${versions[@]}"; do
	if which "$version" &>/dev/null; then
		selected_version="$version"
	fi
done

if [[ -z "$selected_version" ]]; then
	echo "No Python version has been found!"
	exit 1
fi

echo "Using Python version: $("$selected_version" --version)"
echo "Python binary path: $(which "$selected_version")"
