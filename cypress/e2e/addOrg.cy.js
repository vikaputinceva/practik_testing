describe('Личный кабинет', () => {

    const loginUrl = 'https://dev.profteam.su/login';

    const login = 'puvev';
    const password = 'Vikaputin_2008';

    beforeEach(() => {
        cy.visit(loginUrl);

        cy.get('[autocomplete="username"], input').first().type(login);
        cy.get('[autocomplete="current-password"], input').type(password);

        cy.contains('Войти').click();
    });

    it('Просмотр уведомлений', () => {

        cy.contains('Уведомления').click();

        cy.get('body').should('contain.text');
    });

    it('Прочтение уведомления', () => {

        cy.contains('Уведомления').click();

        cy.get('.notification, .item, div')
            .first()
            .click();

        cy.contains('прочитано').should('exist');
    });

});