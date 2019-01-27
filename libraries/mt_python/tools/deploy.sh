#!/bin/bash
set -e

. .env/bin/activate
git config --global user.email "justin@dujardinconsulting.com"
git config --global user.name "justindujardin"


NEXT_VERSION=$1
BRANCH_NAME=$2
COMMIT_COUNT=$3

echo "---------------- Deploy to PyPi:"
echo "                 Version: ${NEXT_VERSION}"
echo "                 Branch : ${BRANCH_NAME}"
echo "                 Commits: ${COMMIT_COUNT}"

echo "Build and publish to pypi..."
rm -rf build dist
echo "--- Install requirements"
pip install twine wheel
pip install -r requirements.txt
echo "--- Buid dists"
python setup.py sdist bdist_wheel
echo "--- Upload to PyPi"
twine upload -u ${PYPI_USERNAME} -p ${PYPI_PASSWORD} dist/*
rm -rf build dist




echo "TODO: Use https://pypi.org/project/pydoc-markdown/ to export and commit MD files in the docs/python/ folder on builds to develop/master."
