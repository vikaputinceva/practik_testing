describe('Заявка на роль', () => {

    beforeEach(() => {
        cy.visit('/login');

        cy.get('[autocomplete="username"]').type('testerStudent');
        cy.get('[autocomplete="current-password"]').type('Password1');

        cy.contains('Войти').click();

        cy.url().should('not.include', '/login');
    });

    it('Позитивный: заявка на работодателя', () => {
        cy.get('.page-nav__role-block button', { timeout: 10000 })
            .click();

        cy.contains('Я работодатель').click();
        cy.contains('Создание заявки').click();

        cy.get('[placeholder="Название компании"]').type('Test Company');
        cy.get('[placeholder="Описание"]').type('Описание');

        cy.contains('button', 'Отправить').click();
    });

    it('Негативный: пустая заявка', () => {
        cy.get('.page-nav__role-block button', { timeout: 10000 })
            .click();

        cy.contains('Я работодатель').click();
        cy.contains('Создание заявки').click();

        cy.contains('button', 'Отправить').click();

        cy.contains('Обязательное поле').should('exist');
    });
});