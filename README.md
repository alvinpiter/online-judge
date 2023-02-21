# Online Judge

A LeetCode clone. See it live at [http://34.149.185.114/](http://34.149.185.114/)!

## Tech Stack

- Backend: NestJS, MySQL, Redis, RabbitMQ
- Frontend: React
- Deployment: Docker, Kubernetes

## Features

- [Judging system](http://34.149.185.114/problems) that supports 3 programming languages (Javascript, Python 3, and C++ 11).
- [Ranking system](http://34.149.185.114/scoreboard), see how you perform against others.
- [Submissions filtering](http://34.149.185.114/submissions), learn from other users' submissions.

## Screenshots

### Home

![](https://github.com/alvinpiter/online-judge/screenshots/home.png)

### Problems management

![](https://github.com/alvinpiter/online-judge/screenshots/problems-management.png)

### Problems

![](https://github.com/alvinpiter/online-judge/screenshots/problems.png)

### Problem

![](https://github.com/alvinpiter/online-judge/screenshots/problem.png)

### Submissions

![](https://github.com/alvinpiter/online-judge/screenshots/submissions.png)

### Submission

![](https://github.com/alvinpiter/online-judge/screenshots/submission.png)

### Scoreboard

![](https://github.com/alvinpiter/online-judge/screenshots/scoreboard.png)

### User profile

![](https://github.com/alvinpiter/online-judge/screenshots/profile.png)

## Deployment

### Prerequisites

The provided Kubernetes manifests are meant to be applied to Google Kubernetes Engine cluster. You need to prepare the following things:

- Create a cluster in Google Kubernetes Engine
- Configure `kubectl` and `gcloud` CLI to connect to the cluster, you can follow this [guide](https://cloud.google.com/kubernetes-engine/docs/how-to/cluster-access-for-kubectl).
- Reserve a static IP address for the Ingress, you can follow this [guide](https://cloud.google.com/compute/docs/ip-addresses/reserve-static-external-ip-address#reserve_new_static). The name of this IP will be put in the Ingress's [manifest](https://github.com/alvinpiter/online-judge/blob/main/deployment/manifests/ingress/manifest.yml), under `kubernetes.io/ingress.global-static-ip-name` annotation.

### Steps

- If there is an `.env.example` file in the manifest directory, copy it to a `.env` file within the same directory then fill in the values. Here is an [example](https://github.com/alvinpiter/online-judge/blob/main/deployment/manifests/mysql/.env.example).

- The environment variables for the frontend is an exception, it should be set in its [Dockerfile](https://github.com/alvinpiter/online-judge/blob/main/online-judge-frontend/Dockerfile). I am still working on this.

- Go to the deployment scripts [directory](https://github.com/alvinpiter/online-judge/tree/main/deployment/scripts), then run the following in order:

  - `./deploy-infrastructure.sh`
  - `./deploy-database-migrator.sh`
  - `./deploy-backend.sh`
  - `./deploy-frontend.sh`
  - `./deploy-ingress.sh`
