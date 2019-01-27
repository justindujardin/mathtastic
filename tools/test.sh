#!/bin/bash
set -e
echo "Testing all apps..."
libraries="mt_typescript mt_python"
for library in $libraries
do
   echo "=== Testing: $library"
   (cd libraries/$library && sh tools/test.sh)
done
