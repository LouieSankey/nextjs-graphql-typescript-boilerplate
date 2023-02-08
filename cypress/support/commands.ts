/// <reference types="cypress" />

Cypress.Commands.add('login' as any, (username: any, password) => {
  cy.session(
    username,
    () => {
      cy.visit('/login')
      cy.get('input[name=username]').type(username)
      cy.get('input[name=password]').type(`${password}{enter}`, { log: false })
      cy.url().should('include', '/dashboard')
      cy.get('h1').should('contain', username)
    },
    {
      validate: () => {
        cy.getCookie('your-session-cookie').should('exist')
      }
    }
  )
})

export {}
