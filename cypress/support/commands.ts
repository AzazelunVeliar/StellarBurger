/// <reference types="cypress" />
import { SELECTORS } from './selectors';

Cypress.Commands.add('setupIntercepts', () => {
  const intercepts = [
    { method: 'GET',  url: '/api/ingredients',    fixture: 'ingredients', alias: 'ingredients' },
    { method: 'GET',  url: '/api/auth/user',      fixture: 'user',        alias: 'user' },
    { method: 'GET',  url: '/api/orders/all',     fixture: 'user-orders', alias: 'user-orders' },
    { method: 'GET',  url: '/api/feeds',          fixture: 'feeds',       alias: 'feeds' },
    { method: 'POST', url: '/api/orders',         fixture: 'order',       alias: 'order' },
  ];

  intercepts.forEach(({ method, url, fixture, alias }) => {
    cy.intercept({ method, url: new RegExp(url) }, { fixture }).as(alias);
  });
});

Cypress.Commands.add('clickFirstMenuIngredient', () => {
  cy.get(SELECTORS.MENU_INGREDIENT).first().click();
});
Cypress.Commands.add('addFirstMenuIngredient', () => {
  cy.get(SELECTORS.MENU_INGREDIENT).first().children().last().click();
});
Cypress.Commands.add('addLastMenuIngredient', () => {
  cy.get(SELECTORS.MENU_INGREDIENT).last().children().last().click();
});

Cypress.Commands.add('closeModal', () => {
  cy.get(SELECTORS.MODAL).find('button').click();
});
Cypress.Commands.add('assertModalNotExist', () => {
  cy.get(SELECTORS.MODAL).should('not.exist');
});

Cypress.Commands.add('assertConstructorIsEmpty', () => {
  cy.get(SELECTORS.CONSTRUCTOR_BUN_TOP).should('not.exist');
  cy.get(SELECTORS.CONSTRUCTOR_INGREDIENT).should('not.exist');
  cy.get(SELECTORS.CONSTRUCTOR_BUN_BOTTOM).should('not.exist');
});
