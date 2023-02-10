const { When, Then, And } = require('@badeball/cypress-cucumber-preprocessor');
const LONG_WAIT_TIME = 30000;
const MIDDLE_WAIT_TIME = 15000;
const SHORT_WAIT_TIME = 5000;
export {SHORT_WAIT_TIME,MIDDLE_WAIT_TIME,LONG_WAIT_TIME};

const boutonRetourHautPage = "main[id=main] * svg[data-testid=ArrowUpwardIcon]";

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  });

function getBodyScrollTop(){
  const scrollTop = Math.max(window.top[0].window.pageYOffset, window.top[0].window.document.documentElement.scrollTop, window.top[0].window.document.body.scrollTop);
  return scrollTop;
}

When("je descends en bas", function () {
  window.top[0].scrollTo(0,5000);
  expect(getBodyScrollTop()).not.to.equal(0);
})

Then("j'affiche le retour haut de page", function () {
  cy.get(boutonRetourHautPage, {timeout: SHORT_WAIT_TIME}).should('be.visible');
})

When("je clique sur le retour haut de page", function () {
  cy.get(boutonRetourHautPage, {timeout: SHORT_WAIT_TIME}).first().click({force: true});
  cy.wait(1500);
})

Then("je suis en haut de la page", function () {
  expect(getBodyScrollTop()).to.equal(0);
})