# Online Judge

An online judge app.

## Deployment

### MySQL

```
cp mysql-secret.example.yml mysql-secret.yml
kubectl apply -f mysql-secret.yml
```

### Frontend

- Specify environment variables in Dockerfile:
  - REACT_APP_BACKEND_API_URL
  - REACT_APP_CONTEST_START_TIME_IN_MILLISECONDS
- Build `docker build . -t online-judge-frontend`

### Build Migrator

docker build -f database-migrator.Dockerfile -t alvinpiter/online-judge-database-migrator .

### Build backend

docker build -f backend.Dockerfile -t alvinpiter/online-judge-backend .
