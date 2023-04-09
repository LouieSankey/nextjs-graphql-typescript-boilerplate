describe('template spec', () => {
  // it.only('signs up a new user with valid credentials', () => {
  //   cy.visit('localhost:3000/auth/signup')
  //   cy.get('#signup-email').type('email@notReal.com')
  //   cy.get('#signup-password').type(`${'Password11!'}{enter}`)
  //   cy.get('#sign-out')
  // })

  // it('returns invalid email if the email is badly formatted', () => {
  //   cy.visit('localhost:3000/auth/signup')
  //   cy.get('#signup-email').type('notValidEmail')
  //   cy.get('#signup-password').type(`${'Password11!'}{enter}`)
  // })

  it('returns invalid password if the password is badly formatted', () => {})

  it('signs in an existing user', () => {
    cy.visit('localhost:3000/auth/login')
    cy.wait(500)
    cy.get('#login-email').type(Cypress.env('test_email'))
    cy.get('#login-password').type(
      `${Cypress.env('test_password') + ''}{enter}`
    )
    // cy.get('#sign-out')
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
