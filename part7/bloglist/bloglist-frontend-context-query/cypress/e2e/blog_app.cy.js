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
      cy.login({ username: 'kevinm', password: 'sekretpassword' });
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

    describe('and blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Another blog',
          author: 'Another author',
          url: 'Another url',
        });
        cy.createBlog({
          title: 'This is a blog 2',
          author: 'This is an author 2',
          url: 'This is an url 2',
        });
        cy.get('.blog-container').first().contains('show').click();
      });

      it('a blog can be liked', function () {
        cy.get('.blog-container').first().contains('likes 0');
        cy.get('.blog-container').first().find('.like-button').click();
        cy.get('.blog-container').first().contains('likes 1');
      });

      it('blogs are ordered by likes', function () {
        cy.get('.blog-container').eq(0).contains('likes 0');
        for (let i = 1; i <= 2; i++) {
          cy.get('.blog-container').eq(0).find('.like-button').click();
        }
        cy.get('.blog-container').eq(0).contains('likes 2');

        cy.get('.blog-container').eq(1).contains('show').click();
        cy.get('.blog-container').eq(1).contains('likes 0');
        for (let i = 1; i <= 3; i++) {
          cy.get('.blog-container').eq(1).find('.like-button').click();
        }
        cy.get('.blog-container').eq(1).contains('likes 3');

        cy.visit('http://localhost:5173');

        cy.get('.blog-container').eq(0).contains('This is a blog 2');
        cy.get('.blog-container').eq(1).contains('Another blog');
      });

      describe('a blog can', function () {
        it('be deleted by its creator', function () {
          cy.get('.blog-container').first().contains('delete blog').click();
          cy.get('.blog-container')
            .first()
            .should('not.contain', 'Another blog');
        });

        it('not be deleted by another user', function () {
          cy.contains('Log out').click();
          const newUser = {
            username: 'anotheruser',
            name: 'Another User',
            password: 'sekretpassword',
          };

          cy.request('POST', 'http://localhost:3003/api/users', newUser);
          cy.login({ username: 'anotheruser', password: 'sekretpassword' });
          cy.visit('http://localhost:5173');

          cy.get('.blog-container').first().contains('show').click();
          cy.get('.blog-container')
            .first()
            .should('not.contain', 'delete blog');
        });
      });
    });
  });
});
