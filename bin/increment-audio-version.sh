#!/bin/bash

VERSION=$1

sed -i "s/VERSION = \(.\)*/VERSION = '"$VERSION"';/" audio/src/version.ts
