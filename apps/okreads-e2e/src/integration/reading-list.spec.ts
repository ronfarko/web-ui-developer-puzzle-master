describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  it('Then: I should be able to undo', () => {
    // clear reading list
    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('body').then((body) => {
      if (body.find('[data-testing="reading-remove"]').length > 0) {
        cy.get('[data-testing="reading-remove"]').each(($el) => {
          cy.wrap($el).click();
        });
      }
    });
    cy.get('[data-testing="reading-close"]').click();

    // search for books and add one to the reading list
    cy.get('input[type="search"]').type('javascript');
    cy.get('form').submit();
    cy.get('[data-testing="add-book-button"]').first().click();

    // UNDO adding book
    cy.wait(1000);
    cy.get('[class="mat-focus-indicator mat-button mat-button-base"]')
      .contains('UNDO')
      .click();
    cy.get('[data-testing="reading-item"]').should('have.length', 0);
  });
});
