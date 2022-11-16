#!/bin/bash

if [ -z "$1" ]
then
  # empty variable
  cd sample || exit 0
else
  cd "$1" || exit 0
fi


rm -r generated features
