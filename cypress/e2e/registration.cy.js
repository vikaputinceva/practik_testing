describe('Регистрация', () => {

    beforeEach(() => {
        cy.visit('https://dev.profteam.su/register', { failOnStatusCode: false });
    });

    it('Негативный: страница недоступна', () => {
        cy.url().should('include', '/error');
    });

    it('Пустые обязательные поля', () => {
        cy.contains('Далее').should('be.disabled');
    });

    it('Неверный формат Email', () => {
        cy.get('input[type="email"]').type('invalid-email').blur();

        cy.contains('Далее').should('be.disabled');
        cy.contains('почта').should('be.visible');
    });

    it('Пароли не совпадают', () => {
        cy.get('input[type="email"]').type('test@test.com');
        cy.get('input[type="password"]').first().type('Pass1234');
        cy.get('input[type="password"]').last().type('Diff1234');

        cy.contains('Пароли не совпадают').should('be.visible');
    });

});