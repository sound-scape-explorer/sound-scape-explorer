#!/bin/bash

VERSION=$1

sed -i "s/VERSION = \(.\)*/VERSION = '"$VERSION"';/" front/src/version.ts
