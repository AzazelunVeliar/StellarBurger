import { SELECTORS } from '../support/selectors';

describe('Конструктор', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.clickFirstMenuIngredient();
  });

  it('Открытие модалки ингредиента', () => {
    cy.get(SELECTORS.MODAL)
      .should('be.visible')
      .should('contain.text', 'Краторная булка N-200i');
  });

  it('Закрытие кликом по оверлею', () => {
    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.assertModalNotExist();
  });

  it('Закрытие крестиком', () => {
    cy.get('[data-cy="modal-close"]').click();
    cy.assertModalNotExist();
  });

  it('Добавление ингредиентов и оформление заказа', () => {
    cy.addFirstMenuIngredient();
    cy.get(SELECTORS.CONSTRUCTOR_BUN_TOP).should('be.visible');
    cy.get(SELECTORS.CONSTRUCTOR_BUN_BOTTOM).should('be.visible');
    cy.addLastMenuIngredient();
    cy.get(SELECTORS.CONSTRUCTOR_INGREDIENT).should('be.visible');
    cy.get('[data-cy="constructor-order-button"]').click();
    cy.get(SELECTORS.MODAL, { timeout: 15000 }).should('be.visible').as('modal');
    cy.get('[data-cy="order_number"]', { timeout: 15000 })
      .should('be.visible')
      .should('contain.text', orderNumber);
    cy.closeModal();
    cy.assertModalNotExist();
    cy.assertConstructorIsEmpty();
  });
});