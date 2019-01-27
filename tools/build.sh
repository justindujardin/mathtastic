#!/bin/bash
echo "Building all apps..."
set -e
libraries="mt_typescript mt_python"
for library in $libraries
do
   echo "=== Building: $library"
   (cd libraries/$library && sh tools/build.sh)
done
