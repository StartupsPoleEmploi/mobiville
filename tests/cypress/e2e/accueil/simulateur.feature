# language: fr
Fonctionnalité: Affichage simulateur d'une ville

  Contexte:
    Etant donné que je suis sur l'accueil Mobiville
    Et que j'accepte tous les cookies
    Et que je saisis "boulanger" dans le métier
    Et que je choisis "Boulangerie - viennoiserie (Aide-boulanger / Aide-boulangère, …)" dans la liste des métiers
    Et que je saisis "Lille" dans la ville
    Et que je choisis "Lille (59000)" dans la liste des villes
    Et que je clique sur rechercher
    Et que j'affiche le simulateur de logement

  Scénario: Affichage de la surface de logement à partir d'un budget pour une location
    Lorsque je saisis un budget de 1000 euros pour une location
    Alors la surface de logement que je peux occuper en location s'affiche

  Scénario: Affichage de la surface de logement à partir d'un budget pour un achat
    Lorsque je saisis un budget de 420800 euros pour un achat
    Alors la surface de logement que je peux occuper à l'achat s'affiche