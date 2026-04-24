describe('Регистрация', () => {
    const REGISTRATION_URL = 'https://dev.profteam.su/registration';

    beforeEach(() => {
        cy.visit(REGISTRATION_URL);
    });

    it('Успешная регистрация с валидными данными', () => {
        const letters = 'abcdefghijklmnopqrstuvwxyz';
        const randomLetters = letters[Math.round(Math.random() * 10)] + letters[Math.round(Math.random() * 10)] + letters[Math.round(Math.random() * 10)] + letters[Math.round(Math.random() * 10)] + letters[Math.round(Math.random() * 10)]
        const uid = Date.now();
        const email = `test.user.${uid}@example.com`;
        const login =  `user${randomLetters}`;
        const password = 'Pass123';

        cy.get('[autocomplete="email"]').type(email);
        cy.get('[autocomplete="username"]').type(login);
        cy.get('[autocomplete="new-password"]').first().type(password);
        cy.get('[autocomplete="new-password"]').last().type(password);

        cy.get('form').contains('button', 'Далее').should('not.be.disabled').click();

        cy.get('[autocomplete="family-name"]').type('я');
        cy.get('[autocomplete="given-name"]').type('иы');
        cy.get('[autocomplete="additional-name"]').type('мы');

        cy.get('form').contains('button', 'Создать аккаунт').should('not.be.disabled').click();
    });

    it('пустые обязательные поля', () => {
        cy.get('form').contains('button', 'Далее').should('be.disabled');

        cy.get('[autocomplete="email"]').focus().blur();
        cy.get('[autocomplete="username"]').focus().blur();
        cy.get('[autocomplete="new-password"]').first().focus().blur();
    });

    it('неверный формат Email', () => {
        cy.get('[autocomplete="email"]').type('invalid-email').blur();
        cy.get('[autocomplete="username"]').type('validlogin');
        cy.get('[autocomplete="new-password"]').first().type('Pass1234');
        cy.get('[autocomplete="new-password"]').last().type('Pass1234');

        cy.get('form').contains('button', 'Далее').should('be.disabled');
        cy.contains('Обязательное поле, некорректная почта').should('be.visible');
    });

    it('пароль не соответствует требованиям (ТЗ)', () => {
        cy.get('[autocomplete="email"]').type('test@example.com');
        cy.get('[autocomplete="username"]').type('validlogin');
        cy.get('[autocomplete="new-password"]').first().type('short').blur();
        cy.get('[autocomplete="new-password"]').last().type('short');

        cy.get('form').contains('button', 'Далее').should('be.disabled');
        cy.contains('Обязательное поле, мин 6 символов, должен содержать буквы в верхнем и нижнем регистре, минимум 1 цифру, не содержать пробелы').should('be.visible');
    });

    it('пароли не совпадают', () => {
        cy.get('[autocomplete="email"]').type('test@example.com');
        cy.get('[autocomplete="username"]').type('validlogin');
        cy.get('[autocomplete="new-password"]').first().type('Pass1234');
        cy.get('[autocomplete="new-password"]').last().type('DifferentPass1').blur();

        cy.get('form').contains('button', 'Далее').should('be.disabled');
        cy.contains('Пароли не совпадают').should('be.visible');
    });

    it('Логин содержит недопустимые символы', () => {
        cy.get('[autocomplete="email"]').type('test@example.com');
        cy.get('[autocomplete="username"]').type('кириллица_123').blur();
        cy.get('[autocomplete="new-password"]').first().type('Pass1234');
        cy.get('[autocomplete="new-password"]').last().type('Pass1234');

        cy.get('form').contains('button', 'Далее').should('be.disabled');
        cy.contains('Обязательное поле, символы латиницы, не содержит пробелы').should('be.visible');
    });

    it('ФИО не на кириллице', () => {
        cy.get('[autocomplete="email"]').type('test@example.com');
        cy.get('[autocomplete="username"]').type('validlogin');
        cy.get('[autocomplete="new-password"]').first().type('Pass1234');
        cy.get('[autocomplete="new-password"]').last().type('Pass1234');
        cy.get('form').contains('button', 'Далее').should('not.be.disabled').click();

        cy.get('[autocomplete="family-name"]').type('Ivanov').blur();

        cy.get('form').contains('button', 'Создать аккаунт').should('be.disabled');
        cy.contains('Обязательное поле, кириллица, тире, апостроф и пробелы').should('be.visible');
    });
});