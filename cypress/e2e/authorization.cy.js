describe('Авторизация', () => {

    it('Позитивный: успешный вход', () => {
        cy.visit('/login');

        cy.get('[autocomplete="username"]').should('be.visible').type('testerStudent');
        cy.get('[autocomplete="current-password"]').should('be.visible').type('Password1');

        cy.contains('button', 'Войти').click();

        cy.url().should('not.include', '/login');
    });

    it('Негативный: неверный пароль', () => {
        cy.visit('/login');

        cy.get('[autocomplete="username"]').type('testerStudent');
        cy.get('[autocomplete="current-password"]').type('wrongPassword');

        cy.contains('button', 'Войти').click();

        cy.contains('Неверный логин или пароль').should('be.visible');
    });
});