const { When, Then, And } = require('@badeball/cypress-cucumber-preprocessor');
import { SHORT_WAIT_TIME, MIDDLE_WAIT_TIME, LONG_WAIT_TIME } from "./common/common";
export { champSaisieMetier, champSaisieEndroit, boutoncritere1, boutoncritere2, boutoncritere3 };

const boutonRechercherEndroit = 'a[data-automation-id=search-action][href*=ville]';
const boutonRechercherAide = 'a[data-automation-id=search-action][href*=aides]';
const boutonEndroit = 'button[type=button][data-automation-id=search-ville][id=cities]';
const boutonAide = 'button[type=button][data-automation-id=search-aide][id=helps]';
const champSaisieMetier = "input[type=text][id=autocomplete-votre-metier]";
const listeMetiers = "ul[role=listbox][id=autocomplete-votre-metier-listbox] > li";
const champSaisieEndroit = "input[type=text][id=autocomplete-lendroit-qui-vous-fait-envie]";
const listeEndroits = "ul[role=listbox][id=autocomplete-lendroit-qui-vous-fait-envie-listbox]";
const elementListeEndroits = "ul[role=listbox][id=autocomplete-lendroit-qui-vous-fait-envie-listbox] > li";
const boutoncritere1 = "div[role=button][id=quel-est-votre-projet]";
const boutoncritere2 = "div[role=button][id=votre-situation]";
const boutoncritere3 = "div[role=button][id=votre-age]";
const selectionCritere = "div[id=menu-] * > ul[role=listbox] > li[role=option] * > span";
const decouverteRegion = "main[id=main] > div > h2";
const listeRegion = "main[id=main] > div:nth-child(3) > div";
const region = "main[id=main] > div > div > a[href*=region]";
const dom = "main[id=main] > div > div > a[href*=departement]";

let TYPE_RECHERCHE = "Ville";
let METIER = "";
let ENDROIT_HP = "";
export { METIER, ENDROIT_HP };

function boutonSelectionEndroitAide(boutonEndroitAide) {
  switch (boutonEndroitAide) {
    case 'Aide':
      return boutonAide;
    case 'Ville':
      return boutonEndroit;
  }
}

function boutonSelectionCritere(critere){
  switch (critere) {
    case "Je déménage prochainement" :
      return boutoncritere1;
    case "Je recherche un logement" :
      return boutoncritere1;
    case "Je recherche un emploi" :
      return boutoncritere1;
    case "Je suis demandeur d'emploi" :
      return boutoncritere2;
    case "Je suis salarié" :
      return boutoncritere2;
    case "Je suis alternant" :
      return boutoncritere2;
    case "J'ai moins de 26 ans" :
      return boutoncritere3;
    case "J'ai plus de 26 ans" :
      return boutoncritere3;
  }
}

function selecteurBoutonRecherche() {
  switch (TYPE_RECHERCHE) {
    case 'Aide':
      return boutonRechercherAide;
    case 'Ville':
      return boutonRechercherEndroit;
  }
}

Then('le titre est {string}', function (titre) {
  cy.title().should('include', titre)
})

Then("j'affiche les filtres métier endroit", function () {
  cy.get(champSaisieMetier, {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.get(champSaisieEndroit, {timeout: SHORT_WAIT_TIME}).should('exist');
})

Then("j'affiche les filtres aide", function () {
  cy.get(boutoncritere1, {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.get(boutoncritere2, {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.get(boutoncritere3, {timeout: SHORT_WAIT_TIME}).should('exist');
})

When("je clique sur le bouton {string} sous le texte \"que recherchez vous\"", function (boutonEndroitAide) {
  TYPE_RECHERCHE = boutonEndroitAide
  cy.get(boutonSelectionEndroitAide(boutonEndroitAide), {timeout: SHORT_WAIT_TIME,}).click();
  cy.wait(500);
})

When("je saisis {string} dans le métier", function (metier) {
  cy.get(champSaisieMetier, {timeout: SHORT_WAIT_TIME}).type(metier, { delay: 200 });
  cy.wait(1500);
})

And("je choisis {string} dans la liste des métiers", function (propositionmetier) {
  METIER = propositionmetier;
  cy.contains(listeMetiers, propositionmetier, {timeout: SHORT_WAIT_TIME}).click();
})

And("plusieurs régions s'affichent dans la liste des régions", function () {
  cy.get(champSaisieEndroit, {timeout: SHORT_WAIT_TIME}).click();
  cy.contains(elementListeEndroits, 'Régions les plus attractives', {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.get(listeEndroits, {timeout: SHORT_WAIT_TIME}).children().should('have.length.gte', 3);
})

And("toutes les régions s'affichent dans la liste des régions", function () {
  cy.get(champSaisieEndroit, {timeout: SHORT_WAIT_TIME}).click();
  cy.get(listeEndroits, {timeout: SHORT_WAIT_TIME}).children().should('have.length', 18);
  cy.contains(elementListeEndroits, 'Régions les plus attractives', {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(elementListeEndroits, 'Auvergne-Rhône-Alpes', {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(elementListeEndroits, 'Bourgogne-Franche-Comté', {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(elementListeEndroits, 'Bretagne', {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(elementListeEndroits, 'Centre-Val de Loire', {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(elementListeEndroits, 'Corse', {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(elementListeEndroits, 'Grand Est', {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(elementListeEndroits, 'Guadeloupe', {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(elementListeEndroits, 'Guyane', {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(elementListeEndroits, 'Hauts-de-France', {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(elementListeEndroits, 'Ile-de-France', {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(elementListeEndroits, 'La Réunion', {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(elementListeEndroits, 'Martinique', {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(elementListeEndroits, 'Normandie', {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(elementListeEndroits, 'Nouvelle-Aquitaine', {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(elementListeEndroits, 'Occitanie', {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(elementListeEndroits, 'Pays de la Loire', {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(elementListeEndroits, 'Provence-Alpes-Côte d\'Azur', {timeout: SHORT_WAIT_TIME}).should('exist');
})

And("je saisis {string} dans la région/ville", function (endroit) {
  cy.get(champSaisieEndroit, {timeout: SHORT_WAIT_TIME}).type(endroit, { delay: 200 });
  cy.wait(1500);
})

And("je choisis {string} dans la liste des régions/villes", function (propositionendroit) {
  ENDROIT_HP = propositionendroit;
  cy.get(champSaisieEndroit, {timeout: SHORT_WAIT_TIME}).click();
  cy.contains(elementListeEndroits, propositionendroit, {timeout: SHORT_WAIT_TIME}).click();
})

And("je sélectionne {string} dans les liste de aides", function (critere) {
  if (critere !== "") {
    const boutonCritere = boutonSelectionCritere(critere);
    cy.get(boutonCritere, {timeout: SHORT_WAIT_TIME}).click({force: true});
    cy.contains(selectionCritere, critere, {timeout: SHORT_WAIT_TIME}).click();
    if (boutonCritere == boutoncritere1) {
      cy.get(boutonCritere, {timeout: SHORT_WAIT_TIME}).click({force: true});
    }
  }
})

And("je clique sur rechercher", function () {
  cy.get(selecteurBoutonRecherche(), { timeout: SHORT_WAIT_TIME }).click({force: true});
  cy.wait(SHORT_WAIT_TIME);
})

And("les régions avec opportunités s'affichent", function () {
  cy.contains(decouverteRegion, "Découvrez les opportunités métiers par région", { timeout: SHORT_WAIT_TIME }).should('exist');
  cy.get(listeRegion, {timeout: SHORT_WAIT_TIME}).children().should('have.length', 18);

  cy.contains(region, 'Auvergne-Rhône-Alpes', {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(region, 'Bourgogne-Franche-Comté', {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(region, 'Bretagne', {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(region, 'Centre-Val de Loire', {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(region, 'Corse', {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(region, 'Grand Est', {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(region, 'Hauts-de-France', {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(region, 'Ile-de-France', {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(region, 'Normandie', {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(region, 'Nouvelle-Aquitaine', {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(region, 'Occitanie', {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(region, 'Pays de la Loire', {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(region, 'Provence-Alpes-Côte d\'Azur', {timeout: SHORT_WAIT_TIME}).should('exist');

  cy.contains(dom, 'Guadeloupe', {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(dom, 'Guyane', {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(dom, 'La Réunion', {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(dom, 'Martinique', {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(dom, 'Mayotte', {timeout: SHORT_WAIT_TIME}).should('exist');
})

When("je clique sur la première des régions", function () {
  cy.get(region, {timeout: SHORT_WAIT_TIME}).first().click();
  ENDROIT_HP = 'Auvergne-Rhône-Alpes';
  cy.wait(1500);
})