#!/bin/bash
set -e

. .env/bin/activate

echo "Prepare pypi configuration..."
echo -e "[pypi]" >> ~/.pypirc
echo -e "username = justindujardin" >> ~/.pypirc
echo -e "password = $PYPI_PASSWORD" >> ~/.pypirc

echo "Build python package..."
sh ci/build.sh

echo "Publish to pypi..."
git config --global user.email "justin@dujardinconsulting.com"
git config --global user.name "justindujardin"
semantic-release publish
