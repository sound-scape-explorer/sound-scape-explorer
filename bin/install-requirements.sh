#!/bin/bash
# tested on :
# - Ubuntu 20.04
# - Ubuntu 22.04

# system
sudo apt update
sudo apt upgrade -y

# deps
sudo apt install -y gcc curl ffmpeg hdf5-tools ca-certificates gnupg

# python
sudo apt install -y software-properties-common
sudo add-apt-repository -y ppa:deadsnakes/ppa
sudo apt install -y python3.11 python3.11-distutils python3.11-dev python3-pip python3.11-venv
curl -sS https://bootstrap.pypa.io/get-pip.py | python3.11

# printing versions
python3.11 --version
