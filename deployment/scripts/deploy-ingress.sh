#!/bin/bash

cd ../manifests

cd ingress
kubectl apply -f manifest.yml
