/// <reference types="Cypress" />
describe('Validate the login using web UI', () => {
    it('Navigate to the home page', { tags: ["@Regression"] }, () => {
        cy.fixture("user.json").then(user => {
            cy.visit('/')
            cy.login(user)
            cy.verifyUrl('overview')
        })
    })

    it('Navigate to the home page', { tags: ["@Ignore"] }, () => {
        cy.fixture("user.json").then(user => {
            cy.visit('/')
            cy.login(user)
            cy.verifyUrl('jk')
        })
    })
})

describe('Validate the login using web UI',{tags:['@test']}, () => {
    it('test',() => {
        cy.log('test')
    })
})