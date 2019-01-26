#!/bin/bash
set -e
sh ./setup.sh
source .env/bin/activate
echo "Build python package..."
python setup.py sdist bdist_wheel
