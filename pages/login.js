const { expect } = require("@playwright/test");

exports.Login = class Login {
  constructor(page) {
    this.page = page;
    this.emailField = page.locator(
      'xpath=//input[@type="text"]'
    );
    this.passwordField = page.locator(
        'xpath=//input[@type="password"]'
      );
  }

  async verifyEmailAndPasswordFieldsDisplayed() {
    expect.soft(this.emailField).toBeVisible();
    expect.soft(this.passwordField).toBeVisible();
  }
};
