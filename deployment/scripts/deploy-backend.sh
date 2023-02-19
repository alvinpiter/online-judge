#!/bin/bash

cd ../../online-judge-backend

image_tag=alvinpiter/online-judge-backend

docker build -f backend.Dockerfile -t $image_tag .
docker push $image_tag

cd ../deployment/manifests/online-judge-backend
set -a && source .env && envsubst < manifest.yml | kubectl apply -f -
