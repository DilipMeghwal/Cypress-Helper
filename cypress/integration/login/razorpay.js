/// <reference types="Cypress" />
describe('Validate the login using web UI', () => {
    beforeEach('exception', () => {
        Cypress.on('uncaught:exception', (err, runnable) => {
            //if (err.message.includes('analytics is not defined')) {
            return false
            // }
        })
    })
    it.only('Navigate to the home page', () => {
        // create a single stub we will use
        const stub = cy.stub().as('open')
        cy.on('window:before:load', (win) => {
            cy.stub(win, 'open').callsFake(stub)
        })
        cy.visit('https://razorpay.com/demo/')

        cy.get('button[id="paybtn"').click()
        cy.get('iframe').its('0.contentDocument').its('body').find('input[id="contact"]').click()
        cy.get('iframe').its('0.contentDocument').its('body').find('input[id="contact"]').type('9876543210')
        cy.get('iframe').its('0.contentDocument').its('body').find('input[id="email"]').type('a@a.com')
        cy.get('iframe').its('0.contentDocument').its('body').find('#footer-cta').click()
        cy.get('iframe').its('0.contentDocument').its('body').find('button.instrument.radio-option.ellipsis.slotted-radio')
            .first()
            .click()


        cy.intercept({
            method: 'POST',
            url: 'https://api.razorpay.com/v1/payments/create/ajax'
        }).as("payPopUp")


        cy.get('iframe').its('0.contentDocument').its('body').find('#footer-cta').click()
        cy.get('@open').should('have.been.called')

    })

    it('new test', () => {
        cy.visit('https://www.encodedna.com/javascript/demo/open-new-window-using-javascript-method.htm')
        cy.window().then((win) => {
            cy.stub(win, 'open').as('windowOpen')
        })
        cy.get('input[value="Open a new window"]').click()

        cy.get('@windowOpen').should('have.been.called')


        cy.url().then(url => {
            cy.log(url)
        })


    })
})
