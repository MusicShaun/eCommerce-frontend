describe('Authenticator:', function () {
  // Step 1: setup the application state
  beforeEach(function () {
    cy.visit('/');
  });
  
  describe('Sign In:', () => {
    it('allows a user to signin', () => {
      // Step 2: Take an action (Sign in)
      cy.get(selectors.usernameInput).type("admin@admin.com");
      cy.get(selectors.signInPasswordInput).type("1234qwer");
      cy.get(selectors.signInButton).contains('Sign in').click();

      cy.wait(3000);

      // Step 3: Make an assertion (Check for sign-out text)
      cy.get(selectors.signOutButton).contains('Sign out');
    });
  });
});

  export const selectors = {
    // Auth component classes
    usernameInput: '[data-amplify-usernamealias="true"]',
    signInPasswordInput: '[data-amplify-password="true"]',
    signInButton: '[data-variation="primary"]',
    signOutButton: 'button'
  }