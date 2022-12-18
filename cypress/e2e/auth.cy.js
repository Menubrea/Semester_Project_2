describe('Testing auth validation', () => {
  const email = Cypress.env('email');
  const password = Cypress.env('password');
  const userName = Cypress.env('name');

  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/').wait(200);
  });

  it('rejects to submit if user inputs are invalid', () => {
    cy.get('#login').click().wait(200);
    cy.get("#loginForm input[type='email']")
      .type('menubrea@noroff.no', { delay: 100 })
      .wait(200);

    cy.get("#loginForm input[type='password']")
      .type(`1234{enter}`, { delay: 100 })
      .wait(2000);

    cy.then(() => {
      expect(localStorage.getItem('token')).to.be.null;
    });
  });

  it('CAN successfully log in and out a valid user', () => {
    cy.get('#login').click().wait(200);

    cy.get("#loginForm input[type='email']")
      .type(email, { delay: 100 })
      .wait(200);

    cy.get("#loginForm input[type='password']")
      .type(`${password}{enter}`, { delay: 100 })
      .wait(2000);

    cy.then(() => {
      expect(localStorage.getItem('token')).to.not.be.null;
    });

    cy.get('#profileButton').click().wait(200);

    cy.get('a').contains('Logout').click().wait(2000);

    cy.then(() => {
      expect(localStorage.getItem('token')).to.be.null;
    });
  });
});
