#!/bin/bash
set -e

## declare an array variable
declare -a libraries=("mt_python" "mt_typescript")

## now loop through the above array
for library in "${libraries[@]}"
do
   echo "=== Setting up: $library"
   (cd libraries/$library && sh ci/setup.sh && sh ci/test.sh)
done
