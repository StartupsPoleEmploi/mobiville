# language: fr
Fonctionnalité: Affichage fil d'ariane d'une ville

  Contexte:
    Etant donné que je suis sur l'accueil Mobiville
    Et que j'accepte tous les cookies
    Et que je saisis "boulanger" dans le métier
    Et que je choisis "Boulangerie - viennoiserie (Aide-boulanger / Aide-boulangère, …)" dans la liste des métiers
    Et que je saisis "Lille" dans la ville
    Et que je choisis "Lille (59000/59160/59260/59777/59800)" dans la liste des villes
    Et que je clique sur rechercher

  Scénario: Présence du fil d'ariane
    Alors je vois le fil d'ariane sur la page

  Scénario: Disponibilité des liens
    Lorsque je clique sur "<lien>" dans le fil d'ariane
    Alors j'affiche la page sélectionnée
    Et je vois le fil d'ariane sur la page
    Lorsque je clique sur "Emploi et logement" dans le fil d'ariane
    Alors j'affiche la page de la ville pour le métier

  Exemples:
    | lien                             |
    | Offres d’emploi                  |
    | Services de la ville             |
    | Villes similaires ou à proximité |