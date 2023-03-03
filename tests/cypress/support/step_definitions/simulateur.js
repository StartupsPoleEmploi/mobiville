const { When, Then, And } = require('@badeball/cypress-cucumber-preprocessor');
import { SHORT_WAIT_TIME, MIDDLE_WAIT_TIME, LONG_WAIT_TIME } from "./common/common";

const titreSimulateur = "main[id=main] * > h3";

const donneeLoyerF2Location = "div[tag-page$=city] * > div";
const partieLocation = "div"
const champSaisieBudgetLocation = "input[placeholder=\"Renseigner un budget\"]";
const ResultatSurfaceLocation = "span[data-automation-id=housing-square-meters]";

const donneePrixUniteSurfaceAchat = "div[tag-page$=city] * > div";
const champSaisieBudgetAchat =  "input[placeholder=\"Renseigner un budget\"]";
const ResultatSurfaceAchat = "span[data-automation-id=housing-square-meters]";

let BUDGET = 0;
const SurfaceF2 = 45;

Then("j'affiche le simulateur de logement", function () {
  cy.contains(titreSimulateur, "Calculez votre budget pour un achat ou une location", {timeout: SHORT_WAIT_TIME}).should('exist');
})

When("je saisis un budget de {int} euros pour une location", function (budget) {
  BUDGET = budget;
  cy.contains(partieLocation, "Pour un loyer en location", {timeout: SHORT_WAIT_TIME}).then((div) => {
    cy.wrap(div).find(champSaisieBudgetLocation, {timeout: SHORT_WAIT_TIME}).type(budget);
  })
  cy.wait(500);
})

Then("la surface de logement que je peux occuper en location s'affiche", function () {
  cy.contains("Vous pouvez occuper un logement de", { timeout: SHORT_WAIT_TIME }).should('exist');
  cy.contains(donneeLoyerF2Location, "2 pièces", {timeout: SHORT_WAIT_TIME}).then((div) => {
    const text = div.text().replace('2 pièces', '').split('€')[0].replace(/,| /gi, '');
    const number = parseInt(text)/SurfaceF2;
    const division = BUDGET/number ;
    const trunc = Math.trunc(division);
    cy.get(ResultatSurfaceLocation, {timeout: SHORT_WAIT_TIME}).should('have.text', trunc.toLocaleString());
  })
})

When("je saisis un budget de {int} euros pour un achat", function (budget) {
  BUDGET = budget;
  cy.contains(partieLocation, "Pour un achat de logement", {timeout: SHORT_WAIT_TIME}).then((div) => {
    cy.wrap(div).find(champSaisieBudgetAchat, {timeout: SHORT_WAIT_TIME}).type(budget);
  })
  cy.wait(500);
})

Then("la surface de logement que je peux occuper à l'achat s'affiche", function () {
  cy.contains("Vous pouvez occuper un logement de", { timeout: SHORT_WAIT_TIME }).should('exist');
  cy.contains(donneePrixUniteSurfaceAchat, "Prix d’achat moyen/m2", {timeout: SHORT_WAIT_TIME}).then((div) => {
    const text = div.text().split('€')[0].replace(/,| /gi, '');
    const number = parseInt(text);
    const division = BUDGET/number ;
    const trunc = Math.trunc(division);
    cy.get(ResultatSurfaceAchat, {timeout: SHORT_WAIT_TIME}).should('have.text', trunc.toLocaleString());
  })
})
