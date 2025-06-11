/// <reference types="cypress" />
import { SELECTORS } from './selectors';

Cypress.Commands.add('setupIntercepts', () => {
  cy.intercept('GET', '/api/ingredients',     { fixture: 'ingredients'  }).as('ingredients');
  cy.intercept('GET', '/api/auth/user',       { fixture: 'user'         }).as('user');
  cy.intercept('GET', '/api/orders/all',      { fixture: 'user-orders'  }).as('user-orders');
  cy.intercept('GET', '/api/feeds',           { fixture: 'feeds'        }).as('feeds');
  cy.intercept('POST', '/api/orders',         { fixture: 'order'        }).as('order');
});

Cypress.Commands.add('loginViaUI', () => {
  cy.intercept('POST', '/api/auth/login', { fixture: 'user' }).as('login');
  cy.visit('/login');
  cy.get('input[name="email"]').as('emailField');
  cy.get('@emailField').clear();
  cy.get('@emailField').type('test@example.com');
  cy.get('input[name="password"]').as('passwordField');
  cy.get('@passwordField').clear();
  cy.get('@passwordField').type('password123');
  cy.get('button[type="submit"]').click();
  cy.wait('@login');
});


Cypress.Commands.add('clickFirstMenuIngredient', () =>
  cy.get(SELECTORS.MENU_INGREDIENT).first().click()
);
Cypress.Commands.add('addFirstMenuIngredient', () =>
  cy.get(SELECTORS.MENU_INGREDIENT).first().find('button').click()
);
Cypress.Commands.add('addLastMenuIngredient', () =>
  cy.get(SELECTORS.MENU_INGREDIENT).last().find('button').click()
);

Cypress.Commands.add('closeModal', () =>
  cy.get(SELECTORS.MODAL).find('button').click()
);
Cypress.Commands.add('assertModalNotExist', () =>
  cy.get(SELECTORS.MODAL).should('not.exist')
);

Cypress.Commands.add('assertConstructorIsEmpty', () => {
  cy.get(SELECTORS.CONSTRUCTOR_BUN_TOP).should('not.exist');
  cy.get(SELECTORS.CONSTRUCTOR_INGREDIENT).should('not.exist');
  cy.get(SELECTORS.CONSTRUCTOR_BUN_BOTTOM).should('not.exist');
});