describe('Выбор роли', () => {

    beforeEach(() => {
        cy.visit('/login');

        cy.get('[autocomplete="username"]').type('testerStudent');
        cy.get('[autocomplete="current-password"]').type('Password1');

        cy.contains('Войти').click();

        cy.url().should('not.include', '/login');
    });

    it('Позитивный: выбор роли студента', () => {
        cy.get('.page-nav__role-block button', { timeout: 10000 })
            .should('be.visible')
            .click();

        cy.contains('Я студент').click();

        cy.contains('Сохранить').click();
    });
});