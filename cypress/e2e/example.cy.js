describe('Login Flow', () => {
    beforeEach(() => {
      cy.visit('/login')
    })
  
    it('should display login form', () => {
      cy.get('input[type="email"]').should('be.visible')
      cy.get('input[type="password"]').should('be.visible')
      cy.contains('button', 'Sign In').should('be.visible')
    })
  
    it('should fail with invalid credentials', () => {
      cy.get('input[type="email"]').type('wrong@email.com')
      cy.get('input[type="password"]').type('wrongpassword')
  
      cy.contains('button', 'Sign In').click()
  
      cy.contains('Invalid email or password').should('be.visible')
    })
  
    it('should login successfully as USER', () => {
      cy.get('input[type="email"]').type('volasonos@atomicmail.io')
      cy.get('input[type="password"]').type('Pa$$w0rd!')
  
      cy.contains('button', 'Sign In').click()
  
      cy.url({ timeout: 10000 }).should(
        'eq',
        `${Cypress.config().baseUrl}/`
      )
    })
  })
  