import { SELECTORS } from '../support/selectors';

describe('Конструктор', () => {
  beforeEach(() => {
    cy.setupIntercepts();
    cy.visit('/');
    cy.wait('@ingredients');
  });

  it('Открытие модалки ингредиента', () => {
    cy.clickFirstMenuIngredient();
    cy.get(SELECTORS.MODAL)
      .should('be.visible')
      .and('contain.text', 'Краторная булка N-200i');
    cy.closeModal();
  });

  it('Закрытие модалки кликом по оверлею', () => {
    cy.clickFirstMenuIngredient();
    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.assertModalNotExist();
  });

  it('Закрытие модалки крестиком', () => {
    cy.clickFirstMenuIngredient();
    cy.get('[data-cy="modal-close"]').click();
    cy.assertModalNotExist();
  });

  it('Оформление заказа с авторизацией', () => {
    cy.addFirstMenuIngredient();
    cy.addLastMenuIngredient();
    cy.get(SELECTORS.CONSTRUCTOR_BUN_TOP).should('be.visible');
    cy.get(SELECTORS.CONSTRUCTOR_INGREDIENT).should('be.visible');

    cy.get('[data-cy="constructor-order-button"]').click();
    cy.url().should('include', '/login');

    cy.loginViaUI();

    cy.setupIntercepts();
    cy.visit('/');
    cy.wait('@ingredients');
    cy.addFirstMenuIngredient();
    cy.addLastMenuIngredient();

    cy.get('[data-cy="constructor-order-button"]').click();
    cy.wait('@order').then(({ response }) => {
      const orderNumber = response!.body.order.number;
      cy.get(SELECTORS.MODAL, { timeout: 15000 }).should('be.visible');
      cy.get('[data-cy="order_number"]')
        .should('be.visible')
        .and('contain.text', orderNumber);
    });

    cy.closeModal();
    cy.assertModalNotExist();
    cy.assertConstructorIsEmpty();
  });
});
