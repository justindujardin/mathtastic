#!/bin/bash
set -e
libraries="mt_typescript mt_python"
for library in $libraries
do
   echo "=== Setting up: $library"
   (cd libraries/$library && sh ci/setup.sh)
done
