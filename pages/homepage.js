const { expect } = require("@playwright/test");

exports.Homepage = class Homepage {
  constructor(page) {
    this.page = page;
    this.navigationButtons = page.locator(
      'xpath=//nav[@role="navigation"]/div/div/div'
    );
    this.loginButton = page.locator(
      'xpath=//div[@class="text-block-25 white"]'
    );
  }

  async verifyAppropriateHeadersDisplayed(navigationButtonsList) {
    const rows = this.navigationButtons;
    const count = await rows.count();
    for (let i = 0; i < count; ++i) {
      const buttonName = await rows.nth(i).textContent();
      const buttonNameFromList = navigationButtonsList[i];
      expect.soft(buttonName).toContain(buttonNameFromList);
    }
  }

  async clickOnLoginButton() {
    await this.loginButton.click();
  }
};
