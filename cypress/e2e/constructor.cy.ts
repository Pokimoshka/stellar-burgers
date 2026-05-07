describe('Тестирование конструктора бургера', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
        cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as('getUser');
        cy.visit('/');
        cy.wait('@getIngredients');
    });

    context('Добавление ингредиентов', () => {
        it('добавляет булку в конструктор', () => {
        cy.get('[data-testid="ingredient-bun"]').first().find('[data-testid="add-button"]').click();
        cy.get('[data-testid="constructor-bun-top"]').should('contain', 'Краторная булка');
        });

        it('добавляет начинку в конструктор', () => {
        cy.get('[data-testid="ingredient-main"]').first().find('[data-testid="add-button"]').click();
        cy.get('[data-testid="constructor-ingredients"]').should('contain', 'Биокотлета');
        });
    });

    context('Модальное окно ингредиента', () => {
        it('открывается и закрывается по крестику', () => {
        cy.get('[data-testid="ingredient-main"]').first().find('a').click();
        cy.get('[data-testid="modal"]').should('be.visible').and('contain', 'Биокотлета');
        cy.get('[data-testid="modal-close"]').click();
        cy.get('[data-testid="modal"]').should('not.exist');
        });

        it('закрывается при клике на оверлей', () => {
        cy.get('[data-testid="ingredient-main"]').first().find('a').click();
        cy.get('[data-testid="modal-overlay"]').click({ force: true });
        cy.get('[data-testid="modal"]').should('not.exist');
        });
    });

    context('Создание заказа', () => {
    beforeEach(() => {
        localStorage.setItem('accessToken', 'fake-access-token');
        cy.setCookie('token', 'fake-cookie');
        cy.intercept('POST', 'https://norma.education-services.ru/api/orders', { fixture: 'order.json' }).as('postOrder');
    });

    afterEach(() => {
        localStorage.clear();
        cy.clearCookies();
    });

    it('оформляет заказ и проверяет очистку конструктора', () => {
        cy.get('[data-testid="ingredient-bun"]').first().find('[data-testid="add-button"]').click();
        cy.get('[data-testid="ingredient-main"]').first().find('[data-testid="add-button"]').click();

        cy.get('[data-testid="order-button"]').click();
        cy.wait('@postOrder');

        // Проверяем номер заказа
        cy.get('#modals [data-testid="order-number"]', { timeout: 10000 })
            .should('have.text', '12345');

        // Закрываем модальное окно
        cy.get('[data-testid="modal-close"]').click();

        // Конструктор очищен
        cy.get('[data-testid="constructor-bun-top"]').should('not.exist');
        cy.get('[data-testid="constructor-ingredients"]')
            .should('not.contain', 'Биокотлета');
        cy.contains('Выберите булки').should('exist');
        cy.contains('Выберите начинку').should('exist');
        });
    });
});