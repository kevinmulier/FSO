Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: { title, author, url },
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem('loggedUserJSON')).token
      }`,
    },
  });

  cy.visit('http://localhost:5173');
});

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username: `${username}`,
    password: `${password}`,
  }).then((response) => {
    localStorage.setItem('loggedUserJSON', JSON.stringify(response.body));
  });

  cy.visit('http://localhost:5173');
});
