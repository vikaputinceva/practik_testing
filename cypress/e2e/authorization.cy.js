describe('Авторизация', () => {

    const url = 'https://dev.profteam.su/login';

    const login = 'puvev';
    const password = 'Vikaputin_2008';

    it('Успешная авторизация', () => {
        cy.visit(url);

        cy.get('[autocomplete="username"], input').first().type(login);
        cy.get('[autocomplete="current-password"], input[type="password"]').type(password);

        cy.contains('button', 'Войти').click();

        cy.url().should('not.include', '/login');
    });

    it('Негативный: пустые поля', () => {
        cy.visit(url);

        cy.contains('button', 'Войти').should('be.disabled');
    });

    it('Негативный: неверный пароль', () => {
        cy.visit(url);

        cy.get('[autocomplete="username"], input').first().type(login);
        cy.get('[autocomplete="current-password"], input[type="password"]').type('WrongPass123');

        cy.contains('button', 'Войти').click();

        cy.contains('Неверный логин или пароль').should('be.visible');
    });

});