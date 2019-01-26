#!/bin/bash
set -e

# Make the virtualenv only if the folder doesn't exist
[[ -d .env ]] || virtualenv .env -p python3.6

source .env/bin/activate
echo "Installing/updating requirements..."
pip install -e .[dev]

