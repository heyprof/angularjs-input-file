#!/bin/bash

if [[ $TRAVIS_PULL_REQUEST_BRANCH != *"greenkeeper"* ]]; then
	exit 0
fi

if ! git diff-index --quiet HEAD --; then
  git config --global user.email "$GITHUB_EMAIL"
  git config --global user.name "Travis CI"
  git config --global push.default simple
  git remote add jenkins https://"$GITHUB_TOKEN"@github.com/"$TRAVIS_REPO_SLUG".git

  git add package-lock.json
  git commit -m "chore(*): update lockfile [ci skip]"
  LAST_COMMIT=`git rev-parse HEAD`
  git push jenkins $LAST_COMMIT:$TRAVIS_PULL_REQUEST_BRANCH
  git remote rm jenkins
fi
