# Online Judge Backend

## Run the app

```bash
$ cp .env.example .env

$ docker-compose up -d

$ npm install

$ npm run start:dev

$ curl http://localhost:7777/api/health-check
```

## Test the app

```bash
$ npm run test
```

## Database migration

Before running the following commands, you need to adjust the values in [data-source.ts](https://github.com/alvinpiter/online-judge/blob/main/online-judge-backend/data-source.ts).

```bash
# Create a migration
$ npm run migration:create src/database/migrations/<MigrationName>
$ npm run migration:create src/database/migrations/AddUsersTable

# Run migrations
$ npm run migration:run

# Revert a migration
$ npm run migration:revert
```
