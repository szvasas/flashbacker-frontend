# Welcome to Flashbacker

Flashbacker is a minimalist app which helps you to save the precious memories of your life in a form
of tiny written stories. It's not a tool for writing a journal, it's more like a space for the "tweets"
you send to your future self to be able to relive the moments which were special for you.

## Introduction
This repository contains the code of the frontend only. Please refer to
[this link](https://gitlab.com/flashbacker/backend) to access the code of the backend.

The QA environment of the application is accessible on
[https://flashbacker-qa.vasas.dev](https://flashbacker-qa.vasas.dev).

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## Packaging
The built project is distributed in a Docker image which is created by the GitLab pipeline using the
`docker build` command and pushed to the GitLab registry of this repository.
Please refer to [.gitlab-ci.yml](.gitlab-ci.yml) and [Dockerfile](Dockerfile) for further details.

## Deploying
The project is meant to be deployed on a Kubernetes cluster. Please refer to
[this repository](https://gitlab.com/flashbacker/deployment) for the manifest files.
