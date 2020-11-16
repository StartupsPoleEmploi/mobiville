# Mobiville

## Setup

Install Docker, Docker-Compose and yarn, then

```
yarn
yarn start
```

## API Sync your database

```
// populate all cities in France
GET http://localhost/api/sync/sync-cities   ~ 71000ms
```

```
// populate all cities in tension
GET http://localhost/api/sync/sync-profession-in-tension   ~ 65000ms
```