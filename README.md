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

Entrer dans le container api
`docker exec -it mobiville_api_1 /bin/bash`

Et exécuter les commandes de synchronisation :
```
yarn run sync:cities # 2 minutes long
yarn run sync:professionsInTension # 2 minutes long
yarn run sync:regions # almost instant
yarn run sync:amenities # This will take about 10 minutes
yarn run sync:amenitiesSpecial # This will take about 2 minutes, needs to be run after the previous script

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

## Données et sources de données

Liste des villes -> Fichier importé depuis le fichier `cities-france.csv` (Un appel depuis la route http://localhost/api/sync/sync-cities supprime et remplace totalement les données des villes)
Le fichier `cities-france.csv` est issue du site data.gouv.fr et est mis à jours tout les ans. A voir comment l'importer de nous chez Mobiville.

Format d'une ville:
- code_comm: 
- nom_dept: Nom du département,
- statut: Type de commune,
- z_moyen: Altitude moyenne,
- nom_region: Nom de région,
- code_reg: Code de la région (Ceci est l'ancien code des régions),
- insee_com: Identifiant europeen de la commune,
- code_dept: Code du département,
- geo_point_2d_x: Centre de la ville en longitude,
- geo_point_2d_y: Centre de la ville en latitude,
- postal_code: Code postal Français de la ville,
- id_geofla: Id de la latitude et longitude celon le code Geofla,
- code_cant: ,
- superficie: Supperficie en km2,
- nom_comm: Nom de la commune,
- code_arr:
- population: Population en milier (Info de 2017),
- distance_from_sea: Distance par rapport à la mer par rapport au centre. (Valeur à null puis un cron teste le point geographique le plus proche selon le fichier `france-shape-side-sea.geo.json`),
- average_temperature: Température moyenne de la ville sur toute l'année des 10 dernieres années avec 3 ans de retard. (Valeur à null puis un cron chercher la balise météorologie la plus proche de la ville. Les balises sont issues de `donneespubliques.meteofrance.fr`. Pour info, il n'y a pas beaucoup de balise en France, quelques centaines),
- description: Description de la ville. (Valeur à null puis un cron demande à l'api wikipedia la description),
- average_houseselled: Prix moyen du m2 des logements (Valeur à null puis un cron demande au fichier `dvf-communes-2019.csv` issue de data.gouv.fr),
- city_house_tension: Definition du niveau de tension (Valeur à null puis un cron demande au fichier `dvf-communes-2019.csv` issue de data.gouv.fr),
- average_houserent: Prix moyen du loyer des appartement au m2 (Value à null puis un demande au fichier `indicateurs-loyers-appartements.csv` issue de data.gouv.fr),
- photo: Url de photo de la ville. (Valeur à null puis un cron demande à l'api wikipedia la photo),


Liste des villes en tensions -> Fichier importé depuis le fichier `cities-tension-utf8.csv` (Un appel depuis la route http://localhost/api/sync/sync-profession-in-tension)

Liste des villes <-> bassins  -> Fichier importé depuis le fichier `lexique-bassins.csv` (Un appel depuis la route http://localhost/api/sync/sync-cities)

Liste des regions, nouvelle nomenclature -> Fichier importé depuis le fichier `anciennes-nouvelles-regions.json` (Un appel depuis la route http://localhost/api/sync/sync-regions)



## API

API Offre d'emploi, pour afficher la liste des offres pour une ville et un métier

API Info travail, pour afficher la tranche de salaire d'une region et d'un métier sur la fiche ville

# Mise en prod

Lors d'un commit sur develop (recette) l'image de l'api est poussé si besoin et un package des sources compilés est également poussé si besoin.
Pour mettre en prod la dernière image de l'API et/ou du dernier package, il faut créer une merge request de develop sur la master.
Se rendre ensuite dans le pipeline et faire la mep manuellement en cliquant sur le bouton.

Pour revenir en arrière il faut se positionner sur la pipeline qui convient et republier l'API et/ou le package pour le repousser en production manuellement via la pipeline.

En cours: gestion des numéro de version pour facilité le rollback.

## Divers

Paris, Lyon et Marseille sont trois villes avec des spéciales : Le référentiel INSEE dont nous disposons ne comporte que leurs arrondissements, pas les villes elles-mêmes. En cas de mise à jour du référenciel (`cities-france.csv`), il faut donc ajouter manuellement ces trois lignes afin de correctement créer ces villes lors de la prochaine synchro.

```
75056;75000;PARIS;PARIS;ILE-DE-FRANCE;Capitale d'état;33.0;181.0;2161;48.8626304852,2.33629344655;"{""type"": ""Polygon"", ""coordinates"": [[[2.344559180836944, 48.85399290271931], [2.332852282604382, 48.85930633356469], [2.320781393695372, 48.86307865626878], [2.325754809597834, 48.869546095073304], [2.327877416924118, 48.869863809746434], [2.350834505477619, 48.863344374598334], [2.350088493587214, 48.86195533215501], [2.344559180836944, 48.85399290271931]]]}";36588;;15;1;75;11
13055;13000;MARSEILLE;BOUCHES-DU-RHONE;PROVENCE-ALPES-COTE D'AZUR;Préfecture de région;29.0;178.0;861.6;43.2999009436,5.38227869795;"{""type"": ""Polygon"", ""coordinates"": [[[5.372144736531373, 43.290965444448595], [5.371008366340329, 43.29359128652747], [5.373616424523343, 43.29499198426251], [5.375021899598046, 43.30159390045778], [5.390502166127308, 43.30939746657357], [5.393048242612156, 43.3042292209066], [5.389078069139432, 43.300312137417784], [5.385563774200395, 43.29429693114428], [5.381847823036012, 43.295908846993086], [5.380357790047036, 43.29294477171], [5.372144736531373, 43.290965444448595]]]}";36589;;99;3;13;93
69123;69000;LYON;RHONE;RHONE-ALPES;Préfecture de région;197.0;153.0;513.2;45.7699284397,4.82922464978;"{""type"": ""Polygon"", ""coordinates"": [[[4.830490136783295, 45.764711873086085], [4.828234329945935, 45.767324545508124], [4.819695911085194, 45.767156356147254], [4.812869224911417, 45.771301526436304], [4.835619846255646, 45.77462664189978], [4.839738601584955, 45.77307334284989], [4.839756688763879, 45.766272510421146], [4.830490136783295, 45.764711873086085]]]}";36605;;99;1;69;82
```

## Architecture

```plantuml
node "OVH" {

stack "mobiville" {
  [Docker NGINX]
  [Docker API]
  [Docker Database]

  package Data {  
collections "fichiers de données"
file "mobiville_bassin_offre_full_xxx.bz2" as datalakefile
}
}
  [Docker Backup]


}

node "gitlab" {
   [Pipeline]
}

node "OVH datalake" {
   [backup]
   [datalake]
}


cloud {
  [Internet]
  [Wikipedia]
}

[Docker NGINX] -d--> [Internet]
[Docker API] <-> [Docker Database]
[Docker API] <-> [Docker NGINX]
[Wikipedia] --> [Docker API]
[Pipeline] -u--> [Docker API]
[Pipeline] -u--> [Docker NGINX]
[Docker Backup] -d--> [backup]
mobiville --> [Docker Backup]
Data --> [Docker API]
[datalake] -l--> datalakefile
```
