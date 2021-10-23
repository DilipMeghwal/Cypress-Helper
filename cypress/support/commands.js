Cypress.Commands.add('verifyUrl', (text) => {
    cy.log(`verify url contains ${text}`)
    cy.url().should('include', text)
})