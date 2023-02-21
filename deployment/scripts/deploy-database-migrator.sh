#!/bin/bash

cd ../../online-judge-backend

image_tag=alvinpiter/online-judge-database-migrator

docker build -f database-migrator.Dockerfile -t $image_tag .
docker push $image_tag

cd ../deployment/manifests/database-migrator
kubectl delete job online-judge-database-migrator
set -a && source .env && envsubst < manifest.yml | kubectl apply -f -
