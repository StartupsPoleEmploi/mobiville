const { When, Then, And } = require('@badeball/cypress-cucumber-preprocessor');
import { SHORT_WAIT_TIME, MIDDLE_WAIT_TIME, LONG_WAIT_TIME } from "./common/common";

const titreSimulateur = "main[id=main] * > h3";

const donneeLoyerF2Location = "div[tag-page$=city] * > div";
const champSaisieBudgetLocation = "input[placeholder=\"Renseigner un budget\"]";
const ResultatSurfaceLocation = "span[data-automation-id=housing-square-meters]";

const donneePrixUniteSurfaceAchat = "div[tag-page$=city] * > div";
const champSaisieSurfaceAchat =  "input[placeholder=\"Renseigner la surface\"]";
const ResultatPrixAchat = "span[data-automation-id=housing-cost]";

let SURFACE = 0;
let BUDGET = 0;
const SurfaceF2 = 50;

Then("j'affiche le simulateur de logement", function () {
  cy.contains(titreSimulateur, "Calculez votre budget pour un achat ou une location", {timeout: SHORT_WAIT_TIME}).should('exist');
})

When("je saisis un budget de {int} euros pour une location", function (budget) {
  BUDGET = budget;
  cy.get(champSaisieBudgetLocation, {timeout: SHORT_WAIT_TIME}).type(budget);
  cy.wait(500);
})

Then("la surface de logement que je peux occuper s'affiche", function () {
  cy.contains("Vous pouvez occuper un logement de", { timeout: SHORT_WAIT_TIME }).should('exist');
  cy.contains(donneeLoyerF2Location, "2 pièces", {timeout: SHORT_WAIT_TIME}).then((div) => {
    const text = div.text().replace('2 pièces', '').split('€')[0].replace(/,| /gi, '');
    const number = parseInt(text)/SurfaceF2;
    const division = BUDGET/number ;
    const arrondi = Math.round(division);
    cy.get(ResultatSurfaceLocation, {timeout: SHORT_WAIT_TIME}).should('have.text', arrondi.toLocaleString());
  })
})

When("je saisis la surface de {int} m² pour un achat", function (surface) {
  SURFACE = surface;
  cy.get(champSaisieSurfaceAchat, {timeout: SHORT_WAIT_TIME}).type(surface);
  cy.wait(500);
})

Then("le prix que le logement va me coûter s'affiche", function () {
  cy.contains("Votre logement va vous coûter", { timeout: SHORT_WAIT_TIME }).should('exist');
  cy.contains(donneePrixUniteSurfaceAchat, "Prix d’achat moyen/m2", {timeout: SHORT_WAIT_TIME}).then((div) => {
    const text = div.text().split('€')[0].replace(/,| /gi, '');
    const number = parseInt(text);
    const produit = number*SURFACE;
    cy.get(ResultatPrixAchat, {timeout: SHORT_WAIT_TIME}).should('have.text', produit.toLocaleString());
  })
})
