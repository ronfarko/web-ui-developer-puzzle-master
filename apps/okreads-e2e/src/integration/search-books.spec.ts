describe('When: Use the search feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should be able to search books by title', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('form').submit();

    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 1);
  });

  // Note: normally e2e test should not be done using real api
  // because it creates dependencies to api and UI cannot be tested in isolation
  // also if for any reason api is not accessible (internet connection for example) it fails the UI test
  // Cypress provides ways to mock the API and eliminate that dependency (fixrure and route)
  it('Then: I should see search results as I am typing', () => {
    cy.get('input[type="search"]').type('javascript');
    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 1);
  });
});
