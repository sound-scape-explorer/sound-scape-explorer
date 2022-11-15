#!/bin/bash

if [ -z "$1" ]
then
  # empty variable
  cd sample || print_abort
else
  cd "$1" || print_abort
fi


rm -r generated features
