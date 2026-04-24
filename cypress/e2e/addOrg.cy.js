describe('Личный кабинет', () => {

    beforeEach(() => {
        cy.visit('/login');

        cy.get('[autocomplete="username"]').type('testerStudent');
        cy.get('[autocomplete="current-password"]').type('Password1');

        cy.contains('Войти').click();

        cy.url().should('not.include', '/login');
    });

    it('Просмотр уведомлений', () => {
        cy.contains('Уведомления').click();

        cy.get('.notification-item', { timeout: 10000 })
            .should('exist');
    });

    it('Прочтение уведомления', () => {
        cy.contains('Уведомления').click();

        cy.get('.notification-item')
            .first()
            .click();

        cy.get('.notification-item')
            .first()
            .should('have.class', 'read');
    });
});