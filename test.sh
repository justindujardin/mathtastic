#!/bin/bash
set -e
libraries="mt_typescript mt_python"
for library in $libraries
do
   echo "=== Testing: $library"
   (cd libraries/$library && sh ci/test.sh)
done
