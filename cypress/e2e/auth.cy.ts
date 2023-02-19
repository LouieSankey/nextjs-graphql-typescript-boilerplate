describe('template spec', () => {
  it('signs in a user', () => {
    cy.visit('localhost:3000/')
    cy.get('input[type=email]').type(Cypress.env('test_email'))
    cy.get('input[type=password]').type(
      `${Cypress.env('test_password') + ''}{enter}`
    )
    cy.get('.signout')
  })
})
