describe('Blog app', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');

    const newUser = {
      username: 'kevinm',
      name: 'Kevin Mulier',
      password: 'sekretpassword',
    };

    cy.request('POST', 'http://localhost:3003/api/users', newUser);
    cy.visit('http://localhost:5173');
  });

  it('Login form is shown', () => {
    cy.contains('Log in to application');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('kevinm');
      cy.get('#password').type('sekretpassword');
      cy.get('#submit-login').click();

      cy.contains('kevinm logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('kevinm');
      cy.get('#password').type('wrongpassword');
      cy.get('#submit-login').click();

      cy.get('.error-notification').as('error-notification');
      cy.get('@error-notification')
        .should('contain', 'invalid username or password')
        .should('have.css', 'background-color', 'rgb(214, 192, 190)');
    });
  });
});
