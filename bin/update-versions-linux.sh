#!/bin/bash

# front version
sed -i "s/VERSION = \(.\)*/VERSION = '$NEXT_VERSION';/" front/src/version.ts

# audio version
sed -i "s/VERSION = \(.\)*/VERSION = '$NEXT_VERSION';/" audio/src/version.ts

# electron version
sed -i "s/VERSION = \(.\)*/VERSION = '$NEXT_VERSION';/" visualisation/src/version.ts

# processing version
sed -i 's/version = \(.\)*/version = \"'"$NEXT_VERSION"'\"/' processing/pyproject.toml

# venv script for Windows
mv sse-venv-*.bat sse-venv-"$NEXT_VERSION".bat
sed -i 's/set version=\(.\)*/set version='$NEXT_VERSION'/' sse-venv-"$NEXT_VERSION".bat

# venv script for Linux
mv sse-venv-*.sh sse-venv-"$NEXT_VERSION".sh
sed -i 's/version=\(.\)*/version=\"'$NEXT_VERSION'\"/' sse-venv-"$NEXT_VERSION".sh
