#!/bin/bash

binary=pnpm

if which "$binary" &>/dev/null; then
	selected_binary="$binary"
fi

if [[ -z "$selected_binary" ]]; then
	echo "pnpm not found!"
else
	echo "$binary"
	echo "Version: $("$binary" --version)"
	echo "Path: $(which "$binary")"
fi
