#!/bin/bash

binary=node

if which "$binary" &>/dev/null; then
	selected_binary="$binary"
fi

if [[ -z "$selected_binary" ]]; then
	echo "node not found!"
else
	echo "$binary"
	echo "Version: $("$binary" --version)"
	echo "Path: $(which "$binary")"
fi
