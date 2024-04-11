#!/bin/bash
docker build . -t kerniussur/hivenote-frontend --platform linux/amd64
docker push kerniussur/hivenote-frontend
