#!/bin/bash

VERSION=$1

sed -i 's/version=\(.\)*/version=\"'$VERSION'\",/' processing/setup.py
