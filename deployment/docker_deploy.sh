#!/bin/bash
echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
docker push 164678/udacity-restapi-user
docker push 164678/udacity-restapi-feed
docker push 164678/reverseproxy
docker push 164678/udacity-frontend:local