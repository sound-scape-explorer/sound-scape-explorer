#!/bin/bash

function print_new_line() {
	echo ""
}

python_versions=(
	python3
	python
)

for python_version in "${python_versions[@]}"; do
	if which "$python_version" &>/dev/null; then
		selected_python_version="$python_version"
		break
	fi
done

pip_versions=(
	pip3
	pip
)

for pip_version in "${pip_versions[@]}"; do
	if which "$pip_version" &>/dev/null; then
		selected_pip_version="$pip_version"
		break
	fi
done

if [[ -z "$selected_python_version" ]]; then
	echo "Python not found!"
else
	echo "$selected_python_version"
	echo "Version: $("$selected_python_version" --version)"
	echo "Path: $(which "$selected_python_version")"
fi

print_new_line

if [[ -z "$selected_pip_version" ]]; then
	echo "pip not found!"
else
	echo "$selected_pip_version"
	echo "Version: $("$selected_pip_version" --version)"
	echo "Path: $(which "$selected_pip_version")"
fi

print_new_line
