import * as homePage from '../../pages/homePage'

Cypress.Commands.add('login', (user) => {
    cy.log(`login in with user ${user}`)
    homePage.username_input()
        .type(user.username)

    homePage.password_input()
        .type(user.password)

    homePage.loginIn_btn()
        .click()
})