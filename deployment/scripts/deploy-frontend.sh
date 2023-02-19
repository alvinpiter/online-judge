#!/bin/bash

cd ../../online-judge-frontend

image_tag=alvinpiter/online-judge-frontend

docker build -t $image_tag .
docker push $image_tag

cd ../deployment/manifests/online-judge-frontend
set -a && envsubst < manifest.yml | kubectl apply -f -
