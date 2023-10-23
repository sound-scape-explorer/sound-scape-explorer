#!/bin/bash

VERSION=$1

cd processing
sed -i 's/version=\(.\)*/version=\"'$VERSION'\",/' setup.py
cd ..
