const { When, Then, And } = require('@badeball/cypress-cucumber-preprocessor');
import { SHORT_WAIT_TIME, MIDDLE_WAIT_TIME, LONG_WAIT_TIME } from "./common/common";
import { ENDROIT_REGION } from "./region";

const rappelCritereDepartement = "main[id=main] > div > div > h1";
const descriptifDepartement = "main[id=main] > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > p";
const infoHabitants = "main[id=main] * > div > p";
const infoSuperficie = "main[id=main] * > div > p";
const infoOffres = "main[id=main] * > div > p";
const infoTauxEmbauche = "main[id=main] * > div > p";

Then("j'affiche la page du département", function () {
  cy.url().should('include', 'departement');

  cy.contains(rappelCritereDepartement, "Les opportunités en " + ENDROIT_REGION,  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.get(descriptifDepartement, {timeout: SHORT_WAIT_TIME}).then((desc) => {
    expect(desc.text()).to.include(ENDROIT_REGION);
  });
  cy.contains(infoHabitants, "Habitants",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(infoSuperficie, "Superficie",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(infoOffres, "Offres d'emploi",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(infoTauxEmbauche, "Taux d'embauche",  {timeout: SHORT_WAIT_TIME}).should('exist');
})