# Mobiville

## Setup

Install Docker, Docker-Compose and yarn, then

### install npm
```
curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
apt install nodejs
yarn
```

### build and start container

1. provision .env
2. `yarn build`
3. `yarn start`


## API Sync your database

```
// populate all cities in France
GET http://localhost/api/sync/sync-cities   ~ 71000ms
```

```
// populate all cities in tension
GET http://localhost/api/sync/sync-profession-in-tension   ~ 65000ms
```

```
// populate all regions
GET http://localhost/api/sync/sync-regions   ~ 250ms
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

## Datas

Code rome I1401 (Informaticien)  
Nb ville proche mer : 704  
Nb ville proche en montagne : 2416  
Nb ville à la campagne : 1978  
Nb petite ville : 4831  
Nb ville moyenne : 111  
Nb grande ville : 52  
Nb metropole : 6  

Code rome J1501 (Aide soignant)  
Nb ville proche mer : 2755  
Nb ville proche en montagne : 10588  
Nb ville à la campagne : 8681  
Nb petite ville : 21482  
Nb ville moyenne : 106  
Nb grande ville : 47  
Nb metropole : 6  
 
## To test


```
chmode +x ./scripts/wait-for-it.sh
yarn start:test
```