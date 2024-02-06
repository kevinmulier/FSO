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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'kevinm',
        password: 'sekretpassword',
      }).then((response) => {
        localStorage.setItem('loggedUserJSON', JSON.stringify(response.body));
      });

      cy.visit('http://localhost:5173');
    });

    it('a blog can be created', function () {
      cy.contains('new blog').click();

      cy.get('#title-input').type('A new test blog');
      cy.get('#author-input').type('A new blog author');
      cy.get('#url-input').type('A new blog url');

      cy.get('#submit-blog').click();

      cy.contains('A new test blog');
      cy.contains('A new blog author');
    });

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Another blog',
          author: 'Another author',
          url: 'Another url',
        });
      });

      it('a blog can be liked', function () {
        cy.get('.blog-container:first').as('blog-container');
        cy.get('@blog-container').contains('show').click();
        cy.get('@blog-container').contains('likes 0');
        cy.get('@blog-container').get('.like-button').click();
        cy.get('@blog-container').contains('likes 1');
      });
    });
  });
});
