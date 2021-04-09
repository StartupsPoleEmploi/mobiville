# Mobiville

## Présentation

Mobiville est un outil d’aide à la décision pour orienter les candidats à la mobilité vers les bassins d’emploi qui recrutent afin de saisir des opportunités dans de nouveaux territoires.

## Stack technique

* une api (back) en node.js
* un site web (front) en react
* une base de donnée (MariaDB)

## Installation

Pré-requis: docker, docker-compose et yarn

### installer npm

```
curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
apt install nodejs
yarn
```

### construire et démarrer les conteneurs

1. provision .env (exemple voir .env.exemple dans le repo)
2. `yarn build`
3. `yarn start`


## API alimenter/synchroniser la base de donnée

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

## Construire les images

Créer et sauver les images docker à pousser sur le serveur
```
yarn build:recette // création et sauvagarde desimages de recette
scp images-docker // et copie sur le serveur cible
```

## Les tests

```
chmode +x ./scripts/wait-for-it.sh
yarn start:test
```

## Logs

View api logs
```
yarn logs:api
```

## Les données

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

