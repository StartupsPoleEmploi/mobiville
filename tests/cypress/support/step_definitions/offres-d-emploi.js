const { When, Then, And } = require('@badeball/cypress-cucumber-preprocessor');
import { SHORT_WAIT_TIME, MIDDLE_WAIT_TIME, LONG_WAIT_TIME } from "./common/common";
import { METIER, ENDROIT_HP } from './home-page';

const rappelCritereVille = "div[tag-page$=city-offres] > h1";
const rappelCritereMetier = "div[tag-page$=city-offres] > h1";
const filtreDistance = "div[tag-page$=city-offres] * > div";
const filtreDatePublication = "div[tag-page$=city-offres] * > div";
const filtreTypeContrat = "div[tag-page$=city-offres] * > div";
const filtreExperience = "div[tag-page$=city-offres] * > div";
const filtreDureeHebdomadaire = "div[tag-page$=city-offres] * > div";
const selectionCritere = "div[id=menu-] > div > ul[role=listbox] > li[role=option] > span";
const critereDistanceOffre = "div[tag-page$=city-offres] > div:nth-child(3) > div:nth-child(2) > div";
const critereTypeDureeOffre = "div[tag-page$=city-offres] > div:nth-child(3) > div:nth-child(2) > div";
const criterePublicationOffre = "div[tag-page$=city-offres] > div:nth-child(3) > div:nth-child(2) > div > p";
const InfosPremiereOffre = "div[tag-page$=city-offres] > div:nth-child(3) > div:nth-child(2)  > div:nth-child(1)";
const InfosDeuxiemeOffre = "div[tag-page$=city-offres] > div:nth-child(3) > div:nth-child(2) > div:nth-child(2)";
const caracteristiquesOffreSelectionnee = "div[tag-page$=city-offres] > div:nth-child(3) > div:nth-child(3)";
const boutonPostulerOffreSelectionnee = "div[tag-page$=city-offres] * > div > a[href^=\"https://candidat.pole-emploi.fr/offres/recherche/detail\"]";
const descriptifOffreSelectionnee = "div[tag-page$=city-offres] > div:nth-child(3) > div:nth-child(3) > p";

let CRITERE = "";

function boutonSelectionFiltreOffre(critere){
  switch (critere) {
    case "Distance" :
      return filtreDistance;
    case "Date de publication" :
      return filtreDatePublication;
    case "Type de contrat" :
      return filtreTypeContrat;
    case "Expérience" :
      return filtreExperience;
    case "Durée hebdomadaire" :
      return filtreDureeHebdomadaire;
  }
}

function combienJours(critere){
  switch (critere) {
    case "Un jour" :
      return 1;
    case "un jour" :
      return "1 jour";
    case "Trois jours" :
      return 3;
    case "Une semaine" :
      return 7;
    case "Deux semaines" :
      return 14;
    case "Un mois" :
      return 31;
    case "un mois" :
      return "31 jours";
    default :
      return critere;
  }
}

Then("j'affiche les offres d'emploi de la ville pour le métier", function () {
  cy.url().should('include', 'metier');

  let villeSansCP = ENDROIT_HP.split(' (')[0];
  let metierCourt = METIER.split(' (')[0].toLowerCase();
  cy.contains(rappelCritereVille, villeSansCP,  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(rappelCritereMetier, "pour le métier " + metierCourt,  {timeout: SHORT_WAIT_TIME}).should('exist');

  cy.contains(filtreDistance, "Distance",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(filtreDatePublication, "Date de publication",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(filtreTypeContrat, "Type de contrat",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(filtreExperience, "Expérience",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(filtreDureeHebdomadaire, "Durée hebdomadaire",  {timeout: SHORT_WAIT_TIME}).should('exist');
})

When("je clique sur le filtre offre {string} et je sélectionne {string}", function (filtre, selection) {
  CRITERE = selection;
  cy.contains(boutonSelectionFiltreOffre(filtre), filtre, {timeout: SHORT_WAIT_TIME}).click();
  cy.contains(selectionCritere, selection, {timeout: SHORT_WAIT_TIME}).click();
  cy.wait(2000);
})

Then("j'affiche les offres qui correspondent aux critères", function () {
  cy.get(critereTypeDureeOffre, {timeout: SHORT_WAIT_TIME}).each((offre) => {
    expect(offre.text()).to.include(CRITERE);
  });
})

Then("j'affiche les offres pour lesquelles la date est inférieure au critère", function () {
  cy.get(criterePublicationOffre, {timeout: SHORT_WAIT_TIME}).each((publication) => {
    let text = publication.text();
    if (text.includes('il y a') && (text.includes('jour') || text.includes('mois'))) {
      text = text.replace('Publié ', '').replace('il y a ', '');
      text = combienJours(text).split(' jour')[0];
      const number = parseInt(text);
      assert.isAtMost(number, combienJours(CRITERE));
    }
  });
})

Then("j'affiche les offres pour lesquelles il y a des opportunités", function () {
  cy.get(InfosPremiereOffre, {timeout: SHORT_WAIT_TIME}).then((desc) => {
    expect(desc.text()).to.include("Offre avec plus d'opportunités");
  });
})

Then("j'affiche les offres de la ville", function () {
  // let villeSansCP = ENDROIT_HP.split(' (')[0].toUpperCase();
  cy.contains("d'emploi dans un rayon de",  {timeout: SHORT_WAIT_TIME}).should('exist');
  // cy.contains(critereDistanceOffre, villeSansCP,  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.get(InfosPremiereOffre, {timeout: SHORT_WAIT_TIME}).should('exist');
})

When("je resélectionne la première offre", function () {
  cy.get(InfosDeuxiemeOffre, {timeout: SHORT_WAIT_TIME}).click();
  cy.get(InfosPremiereOffre, {timeout: SHORT_WAIT_TIME}).click();
})

Then("le détail de l'offre s'affiche", function () {
  // let villeSansCP = ENDROIT_HP.split(' (')[0].toUpperCase();
  cy.get(caracteristiquesOffreSelectionnee, {timeout: SHORT_WAIT_TIME}).then((caract) => {
    // expect(caract.text()).to.include(villeSansCP);
    expect(caract.text()).to.exist;
  });
  cy.get(boutonPostulerOffreSelectionnee, {timeout: SHORT_WAIT_TIME}).should('have.text', "Postuler sur Pôle emploi.fr")
})

Then("le descriptif de l'offre s'affiche", function () {
  cy.get(descriptifOffreSelectionnee, {timeout: SHORT_WAIT_TIME}).then((desc) => {
    expect(desc.text()).to.exist;
  });
})