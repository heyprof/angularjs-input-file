#!/bin/bash

PROJECT_LOCKFILE=${PROJECT_LOCKFILE:-"package-lock.json"}
GITHUB_EMAIL=${GITHUB_EMAIL:-"task-runner@circleci"}
GITHUB_NAME=${GITHUB_NAME:-"Circle CI<$GITHUB_EMAIL>"}

if [[ $CIRCLE_BRANCH != *"greenkeeper"* ]]; then
  exit 0
fi

if ! git diff-index --quiet HEAD $PROJECT_LOCKFILE --; then
  git config user.email $GITHUB_EMAIL
  git config user.name $GITHUB_NAME

  git add $PROJECT_LOCKFILE
  git commit -m "chore(*): update lockfile [ci skip]" -m "See: $CIRCLE_BUILD_URL"
  git push origin $CIRCLE_BRANCH
fi
