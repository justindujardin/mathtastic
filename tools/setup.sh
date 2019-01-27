#!/bin/bash
set -e
echo "Setting up all apps..."
libraries="mt_typescript mt_python"
for library in $libraries
do
   echo "=== Setting up: $library"
   (cd libraries/$library && sh tools/setup.sh)
done
