# language: fr
Fonctionnalité: Informations de la region

  Contexte:
    Etant donné que je suis sur l'accueil Mobiville
    Et que j'accepte tous les cookies
    Et que je clique sur la première des régions
    Et que j'affiche la page de la région

  Scénario: Présence des départements de la région
    Alors j'affiche les départements de la région

  Scénario: Affichage du premier département de la région
    Lorsque je clique sur le premier des départements de la région
    Alors j'affiche la page du département

  Scénario: Présence des villes de la région
    Alors j'affiche les villes de la région

  Scénario: Affichage de la première ville de la région
    Lorsque je clique sur la première des villes de la région
    Alors j'affiche la page de la ville pour les métiers