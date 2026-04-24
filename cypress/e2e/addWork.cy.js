describe('Заявки на роль', () => {

    const loginUrl = 'https://dev.profteam.su/login';

    const login = 'puvev';
    const password = 'Vikaputin_2008';

    beforeEach(() => {
        cy.visit(loginUrl);

        cy.get('[autocomplete="username"], input').first().type(login);
        cy.get('[autocomplete="current-password"], input').type(password);

        cy.contains('Войти').click();
    });

    it('Подача заявки на работодателя', () => {

        cy.contains('Профиль').click();
        cy.contains('Стать работодателем').click();

        cy.contains('Отправить заявку').click();

        cy.contains('Заявка отправлена').should('be.visible');
    });

    it('Подача заявки на учебное заведение', () => {

        cy.contains('Профиль').click();
        cy.contains('Стать учебным заведением').click();

        cy.contains('Отправить заявку').click();

        cy.contains('Заявка отправлена').should('be.visible');
    });

});