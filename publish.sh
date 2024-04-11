#!/bin/bash

aws ecr get-login-password | docker login --username hivenote --password-stdin 992382369361.dkr.ecr.eu-central-1.amazonaws.com
docker build . -t 992382369361.dkr.ecr.eu-central-1.amazonaws.com/hivenote-frontend --platform linux/amd64
docker push 992382369361.dkr.ecr.eu-central-1.amazonaws.com/hivenote-frontend
