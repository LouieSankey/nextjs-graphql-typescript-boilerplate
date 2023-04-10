describe('template spec', () => {
  it.only('signs in an existing user', () => {
    cy.intercept('/auth/login').as('login')
    cy.visit('localhost:3000/auth/login')
    cy.wait(500)
    cy.get('#login-email').type(Cypress.env('test_email'))
    cy.get('#login-password').type(
      `${Cypress.env('test_password') + ''}{enter}`
    )
    cy.wait('@login')
    cy.get('#home-screen')
  })

  it('displays invalid credentials when a user is not signed up', () => {
    //intercepts network request from auth/login
    cy.intercept('/auth/login').as('login')
    cy.visit('localhost:3000/auth/login')
    cy.get('#login-email').type('email@notReal.com')
    cy.get('#login-password').type(`${'notRealPassword'}{enter}`)
    cy.wait('@login')
    cy.get('#form-error').should('have.text', 'Invalid Credentials')
  })
})
export {}
