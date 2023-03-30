# language: fr
Fonctionnalité: Affichage homepage et moteur de recherche

  Contexte:
    Etant donné que je suis sur l'accueil Mobiville
    Et que j'accepte tous les cookies

  Scénario: Lire le titre de la page
    Alors le titre est "Trouvez l’emploi et la ville qui va avec ! | Mobiville"

  Scénario: Affichage par défaut des régions
    Alors j'affiche les filtres métier endroit
    Et que je saisis "boulanger" dans le métier
    Et que je choisis "Boulangerie - viennoiserie (Aide-boulanger / Aide-boulangère, …)" dans la liste des métiers
    Alors plusieurs régions s'affichent dans la liste des régions
    
  Scénario: Recherche du métier dans une région
    Lorsque je saisis "<metier>" dans le métier
    Et que je choisis "<proposition>" dans la liste des métiers
    Et que je choisis "<region>" dans la liste des régions
    Et que je clique sur rechercher
    Alors j'affiche la page de résultats avec une à plusieurs villes correspondantes

  Exemples:
      | metier            | proposition                                                                         | region                       |
      | commis de cuisine | Personnel de cuisine (Commis de cuisine tournant / Commise de cuisine tournante, …) | Ile-de-France                |
      | coach             | Éducation en activités sportives (Coach sportif, …)                                 | Grand Est                    |

  Scénario: Recherche du métier dans une ville
    Et que je saisis "boulanger" dans le métier
    Et que je choisis "Boulangerie - viennoiserie (Aide-boulanger / Aide-boulangère, …)" dans la liste des métiers
    Et que je saisis "Lille" dans la ville
    Et que je choisis "Lille (59000)" dans la liste des villes
    Et que je clique sur rechercher
    Alors j'affiche la page de la ville pour le métier

  Scénario: Affichage des opportunités, des offres d'emploi et du nombre d'habitants de la ville d'une région recherchée
    Lorsque je saisis "boulanger" dans le métier
    Et que je choisis "Boulangerie - viennoiserie (Aide-boulanger / Aide-boulangère, …)" dans la liste des métiers
    Et que je choisis "Ile-de-France" dans la liste des régions
    Et que je clique sur rechercher
    Alors j'affiche les informations sur le métier dans la page des villes correspondantes

  Scénario: Recherche des aides par projet, situation et ou âge
    Lorsque je clique sur le bouton "Aide" sous le texte "que recherchez vous"
    Et que je sélectionne "<premier choix>" dans les liste de aides
    Et que je sélectionne "<deuxieme choix>" dans les liste de aides
    Et que je sélectionne "<troisieme choix>" dans les liste de aides
    Et que je clique sur rechercher
    Alors j'affiche les aides correspondantes

  Exemples:
      | premier choix             | deuxieme choix           | troisieme choix        |
      | Je déménage prochainement |                          |                        |
      | Je déménage prochainement | Je recherche un logement |                        |
      | Je déménage prochainement | Je recherche un logement | Je recherche un emploi |
      | Je recherche un emploi    | J'ai moins de 26 ans     |                        |
      | Je déménage prochainement | Je suis salarié          | J'ai plus de 26 ans    |
      | Je suis alternant         | J'ai plus de 26 ans      |                        |
 
  Scénario: Retour à la recherche des villes après la recherche d'une aide
    Lorsque je clique sur le bouton "Aide" sous le texte "que recherchez vous"
    Alors j'affiche les filtres aide
    Lorsque je clique sur le bouton "Ville" sous le texte "que recherchez vous"
    Alors j'affiche les filtres métier endroit

  Scénario: Affichage de toutes les régions sans saisie de métier
    Alors toutes les régions s'affichent dans la liste des régions

  Scénario: Affichage des opportunités métiers par régions
    Alors les régions avec opportunités s'affichent

  Scénario: Affichage de la page de la première des régions
    Lorsque je clique sur la première des régions
    Alors j'affiche la page de la région

  Scénario: Retour haut de page
    Lorsque je descends en bas
    Alors j'affiche le retour haut de page
    Lorsque je clique sur le retour haut de page
    Alors je suis en haut de la page

  Scénario: Recherche du métier dans une ville
    Lorsque je saisis "Lille" dans la ville
    Et que je choisis "Lille (59000)" dans la liste des villes
    Et que je clique sur rechercher
    Alors j'affiche la page de la ville