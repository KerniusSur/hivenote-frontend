#!/bin/bash

aws ecr get-login-password | docker login --username AWS --password-stdin 992382369361.dkr.ecr.eu-central-1.amazonaws.com
docker pull 992382369361.dkr.ecr.eu-central-1.amazonaws.com/hivenote-backend:latest
docker pull 992382369361.dkr.ecr.eu-central-1.amazonaws.com/hivenote-frontend-opennebula:latest
docker-compose up -d
