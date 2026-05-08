describe('Тестирование конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  context('Добавление ингредиентов', () => {
    it('добавляет булку в конструктор', () => {
      // Берем имя из параграфа с названием внутри карточки
      cy.get('[data-testid="ingredient-bun"] a').first()
        .find('p.text_type_main-default')
        .invoke('text')
        .then((bunName) => {
          cy.get('[data-testid="ingredient-bun"]').first()
            .find('[data-testid="add-button"]')
            .click();
          cy.get('[data-testid="constructor-bun-top"]').should('contain', bunName);
        });
    });

    it('добавляет начинку в конструктор', () => {
      cy.get('[data-testid="ingredient-main"] a').first()
        .find('p.text_type_main-default')
        .invoke('text')
        .then((ingrName) => {
          cy.get('[data-testid="ingredient-main"]').first()
            .find('[data-testid="add-button"]')
            .click();
          cy.get('[data-testid="constructor-ingredients"]').should('contain', ingrName);
        });
    });
  });

  context('Модальное окно ингредиента', () => {
    it('открывается и закрывается по крестику', () => {
      cy.get('[data-testid="ingredient-main"] a').first()
        .find('p.text_type_main-default')
        .invoke('text')
        .then((name) => {
          cy.get('[data-testid="ingredient-main"]').first().find('a').click();
          cy.get('[data-testid="modal"]').should('be.visible').and('contain', name);
          cy.get('[data-testid="modal-close"]').click();
          cy.get('[data-testid="modal"]').should('not.exist');
        });
    });

    it('закрывается при клике на оверлей', () => {
      cy.get('[data-testid="ingredient-main"] a').first()
        .find('p.text_type_main-default')
        .invoke('text')
        .then((name) => {
          cy.get('[data-testid="ingredient-main"]').first().find('a').click();
          cy.get('[data-testid="modal"]').should('contain', name);
          cy.get('[data-testid="modal-overlay"]').click({ force: true });
          cy.get('[data-testid="modal"]').should('not.exist');
        });
    });
  });

  context('Создание заказа', () => {
    beforeEach(() => {
      cy.setCookie('accessToken', 'fake-access-token');
      localStorage.setItem('refreshToken', 'fake-refresh-token');
      cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as('postOrder');
      cy.visit('/');
      cy.wait('@getIngredients');
    });

    afterEach(() => {
      localStorage.removeItem('refreshToken');
      cy.clearCookie('accessToken');
    });

    it('оформляет заказ и очищает конструктор', () => {
      cy.get('[data-testid="ingredient-bun"]').first().find('[data-testid="add-button"]').click();
      cy.get('[data-testid="ingredient-main"]').first().find('[data-testid="add-button"]').click();

      cy.get('[data-testid="order-button"]').click();
      cy.wait('@postOrder');

      cy.get('[data-testid="order-number"]', { timeout: 10000 }).should('have.text', '12345');

      cy.get('[data-testid="modal-close"]').click();

      cy.get('[data-testid="constructor-bun-top"]').should('not.exist');
      cy.get('[data-testid="constructor-bun-bottom"]').should('not.exist');
      cy.get('[data-testid="constructor-ingredients"]').should('have.text', 'Выберите начинку');
    });
  });
});