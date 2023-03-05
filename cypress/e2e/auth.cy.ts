describe('template spec', () => {
  it('signs in a user', () => {
    cy.visit('localhost:3000/login')
    cy.get('input[type=email]').type(Cypress.env('test_email'))
    cy.get('input[type=password]').type(
      `${Cypress.env('test_password') + ''}{enter}`
    )
    cy.get('.signout')
  })
  // it('displays invalid credentials when a users not signed up', () => {
  //   cy.visit('localhost:3000/login')
  //   cy.get('input[type=email]').type('email@notreal.com')
  //   cy.get('input[type=password]').type(`${'password'}{enter}`)
  //   cy.get('.chakra-form__error-message')
  // })

  it('adds a stripe customer id to the user id and session', () => {
    cy.visit('localhost:3000/signup')
    cy.get('input[type=email]').type(Cypress.env('test_email'))
    cy.get('input[type=password]').type(
      `${Cypress.env('test_password') + ''}{enter}`
    )
  })
})
