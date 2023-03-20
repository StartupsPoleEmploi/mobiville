const { When, Then, And } = require('@badeball/cypress-cucumber-preprocessor');
import { SHORT_WAIT_TIME, MIDDLE_WAIT_TIME, LONG_WAIT_TIME } from "./common/common";
import { ENDROIT_HP } from "./home-page";

const rappelCritereRegion = "main[id=main] * > div > h1";
const descriptifRegion = "main[id=main] * > div > p";
const infoHabitants = "main[id=main] * > div > p";
const infoSuperficie = "main[id=main] * > div > p";
const infoOffres = "main[id=main] * > div > p";
const resultatsDepartements = "main[id=main] > h2";
const listeDepartements = "main[id=main] > div:nth-child(4)";
const departement = "main[id=main] > div:nth-child(4) > a[href*=departement]";
const resultatsVilles = "main[id=main] > h2";
const listeVilles = "main[id=main] > div:nth-child(6)";
const ville = "main[id=main] > div:nth-child(6) > a[href*=ville]";

let ENDROIT_REGION = "";
export { ENDROIT_REGION };

Then("j'affiche la page de la région", function () {
  cy.url().should('include', 'region');

  cy.contains(rappelCritereRegion, "Les opportunités en " + ENDROIT_HP,  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.get(descriptifRegion, {timeout: SHORT_WAIT_TIME}).then((desc) => {
    expect(desc.text()).to.include(ENDROIT_HP);
  });
  cy.contains(infoHabitants, "Habitants",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(infoSuperficie, "Superficie",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(infoOffres, "Offres d'emploi",  {timeout: SHORT_WAIT_TIME}).should('exist');
})

Then("j'affiche les départements de la région", function () {
  cy.contains(resultatsDepartements, "Découvrez les départements de la région",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.get(listeDepartements, {timeout: SHORT_WAIT_TIME}).children().should('have.length', 12);
  cy.contains(departement, "Ain",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(departement, "Allier",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(departement, "Ardèche",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(departement, "Cantal",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(departement, "Drômes",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(departement, "Haute-Loire",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(departement, "Haute-Savoie",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(departement, "Isère",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(departement, "Loire",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(departement, "Puy-de-Dôme",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(departement, "Rhône",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(departement, "Savoie",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.get(departement, {timeout: SHORT_WAIT_TIME}).each((dep) => {
    expect(dep.text()).to.include('offres d\'emploi');
  });
})

Then("j'affiche les villes de la région", function () {
  cy.contains(resultatsVilles, "Découvrez les villes qui proposent le plus d’offres",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.get(listeVilles, {timeout: SHORT_WAIT_TIME}).children().should('have.length', 6);
  cy.contains(ville, "Lyon",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(ville, "Saint-Etienne",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(ville, "Villeurbanne",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(ville, "Grenoble",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(ville, "Clermont-Ferrand",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(ville, "Valence",  {timeout: SHORT_WAIT_TIME}).should('exist');
})

When("je clique sur le premier des départements de la région", function () {
  cy.get(departement, {timeout: SHORT_WAIT_TIME}).first().click();
  ENDROIT_REGION = 'Ain';
  cy.wait(1500);
})

When("je clique sur la première des villes de la région", function () {
  cy.get(ville, {timeout: SHORT_WAIT_TIME}).first().click();
  ENDROIT_REGION = 'Lyon';
  cy.wait(1500);
})