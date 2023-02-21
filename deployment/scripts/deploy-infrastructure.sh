#!/bin/bash

cd ../manifests

cd redis
set -a && envsubst < manifest.yml | kubectl apply -f -
cd ..

cd mysql
set -a && source .env && envsubst < manifest.yml | kubectl apply -f -
cd ..

cd rabbitmq
set -a && source .env && envsubst < manifest.yml | kubectl apply -f -
cd ..
