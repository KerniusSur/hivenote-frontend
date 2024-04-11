#!/bin/bash

aws ecr get-login-password | docker login --username hivenote --password-stdin 992382369361.dkr.ecr.eu-central-1.amazonaws.com
docker pull 992382369361.dkr.ecr.eu-central-1.amazonaws.com/hivenote-backend
docker pull 992382369361.dkr.ecr.eu-central-1.amazonaws.com/hivenote-frontend
docker-compose up -d
