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

## Buid 

Create / save an image docker to push to the server.
```
yarn build:recette // generate save image docker
and scp images-docker // to endpoint server
```

## Logs

View api logs
```
yarn logs:api
```
