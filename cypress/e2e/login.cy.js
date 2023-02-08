describe('Login page', () => {
  before(() => {
    cy.log(`Visiting http://localhost:3000`)
    //this will visit the relative path set in cypress.config
    cy.visit('/')
  })

  it('successfully loads', () => {
    cy.visit('/')
    cy.get('input[type=email]').type('email@email.com')
    cy.get('input[type=password]').type(`password {enter}`)
  })
})
