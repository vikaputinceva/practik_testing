describe('Тесты личного кабинета', () => {
    const LOGIN_URL = 'https://dev.profteam.su/login';
    const USERNAME = 'puvev';
    const PASSWORD = 'Vikaputin_2008';

    beforeEach(() => {
    cy.visit(LOGIN_URL);

    cy.get('[autocomplete="username"]').type(USERNAME);
    cy.get('[autocomplete="current-password"]').type(PASSWORD);
    cy.get('form').contains('button', ' Войти ').click();

    cy.intercept('/api/users/info').as('userInfo');
    cy.wait('@userInfo');

    cy.get('body').then(($body) => {
        if ($body.find('.page-nav__role-block button').length) {
            cy.get('.page-nav__role-block button').click();
        }
    });
});

    describe('Создание ЛК работодателя', () => {

        it('Успешная заявка', () => {
            cy.contains('p', 'Я являюсь представителем коммерческой организации').click();
            cy.contains('p', 'Создание нового личного кабинета работодателя').click();

            cy.get('[placeholder="Название вашей организации"]').type('New workersы');
            cy.get('[placeholder="Адрес вашей организации"]').type('Уличка пушкина а дом калатушкаина');
            cy.get('[placeholder="Описание вашей организации"]').type('Описание организации');

            cy.get('.create-company-form__description-block button')
                .should('be.visible')
                .should('not.be.disabled')
                .click();
        });

        it('Данные пустые', () => {
            cy.contains('p', 'Я являюсь представителем коммерческой организации').click();
            cy.contains('p', 'Создание нового личного кабинета работодателя').click();
        });
    });

    describe('Создание ЛК образовательной организации', () => {

        it('Успешная заявка', () => {
            cy.contains('p', 'Я являюсь представителем образовательной организации').click();
            cy.contains('p', 'Создание нового личного кабинета ОУ').click();

            cy.get('[placeholder="Название вашей организации"]').type('New workersы');
            cy.get('[placeholder="Адрес вашей организации"]').type('Уличка пушкина а дом калатушкаина');
            cy.get('[placeholder="Описание вашей организации"]').type('Описание организации');

            cy.get('.create-company-form__description-block button')
                .should('be.visible')
                .should('not.be.disabled')
                .click();
        });

        it('Данные пустые', () => {
            cy.contains('p', 'Я являюсь представителем образовательной организации').click();
            cy.contains('p', 'Создание нового личного кабинета ОУ').click();
        });
    });

    describe('Добавление роли студента', () => {

        it('Успешный выбор роли', () => {
            cy.contains('p', 'Я являюсь студентом').click();
        });

    });

});