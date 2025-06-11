const fixturesArr = ['user', 'order', 'ingredients', 'feeds'];
//моки ендпоинтов апишки
const intercepts = [
  {
    method: 'GET',
    url: '/api/ingredients',
    fixture: 'ingredients',
    alias: 'ingredients'
  },
  {
    method: 'GET',
    url: '/api/auth/user',
    fixture: 'user',
    alias: 'user'
  },
  {
    method: 'GET',
    url: '/api/orders/all',
    fixture: 'user-orders',
    alias: 'user-orders'
  },
  {
    method: 'GET',
    url: '/api/feeds',
    fixture: 'feeds',
    alias: 'feeds'
  },
  {
    method: 'POST',
    url: '/api/orders',
    fixture: 'order',
    alias: 'order'
  }
];

describe('Конструктор', () => {
  beforeEach(() => {
    fixturesArr.forEach((fixture) => cy.fixture(`${fixture}.json`));
    intercepts.forEach(({ method, url, fixture, alias }) =>
      cy.intercept({ method, url }, { fixture }).as(alias)
    );

    cy.setCookie('accessToken', 'mymocktoken');
    localStorage.setItem('refreshToken', 'mymocktoken');

    cy.visit('/');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });

  it('Главная страница', () => {
    cy.visit('/');
  });

  it('Моки эндпоинтов работают', () => {
    cy.wait(['@ingredients', '@user']);
  });

  describe('Функционал модалки', () => {
    beforeEach(() => {
      cy.get('[data-cy="menu-ingredient"]').first().click();
    });

    it('Открытие', () => {
      cy.get('[data-cy="modal"]')
        .should('be.visible')
        .should('contain.text', 'Краторная булка N-200i');
    });

    it('Закрытие кликом по оверлею', () => {
      cy.get('[data-cy="modal-overlay"]').click({ force: true });
      cy.get('[data-cy="modal"]').should('not.exist');
    });

    it('Закрытие при нажатии кнопки', () => {
      cy.get('[data-cy="modal-close"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');
    });
  });

  describe('Добавление разных ингредиентов', () => {
    it('Булка', () => {
      cy.get('[data-cy="menu-ingredient"]').first().children().last().click();
      cy.get('[data-cy="constructor-bun-top"]').should('be.visible');
      cy.get('[data-cy="constructor-bun-bottom"]').should('be.visible');
    });

    it('Начинка', () => {
      cy.get('[data-cy="menu-ingredient"]').last().children().last().click();
      cy.get('[data-cy="constructor-ingredient"]').should('be.visible');
    });

    it('Полная сборка и заказ', () => {
      cy.get('[data-cy="menu-ingredient"]').first().children().last().click();
      cy.get('[data-cy="constructor-bun-top"]').should('be.visible');
      cy.get('[data-cy="constructor-bun-bottom"]').should('be.visible');

      cy.get('[data-cy="menu-ingredient"]').last().children().last().click();
      cy.get('[data-cy="constructor-ingredient"]').should('be.visible');

      cy.get('[data-cy="constructor-order-button"]').click();

      cy.wait('@order').then((res) => {
        const orderNumber = res.response?.body?.order?.number;

        cy.get('[data-cy="modal"]', { timeout: 15000 })
          .should('be.visible')
          .as('modal');

        cy.get('[data-cy="order_number"]', { timeout: 15000 })
          .should('be.visible')
          .should('contain.text', orderNumber);

        cy.get('[data-cy="modal"]').find('button').click();
        cy.get('[data-cy="modal"]').should('not.exist');

        cy.get('[data-cy="constructor-bun-top"]').should('not.exist');
        cy.get('[data-cy="constructor-ingredient"]').should('not.exist');
        cy.get('[data-cy="constructor-bun-bottom"]').should('not.exist');
      });
    });
  });
});
