import { test, expect } from "@playwright/test";
import { HelpPage } from "../pages/help";
import { Homepage } from "../pages/homepage";
import { Login } from "../pages/login";
import { Helpers } from "../helpers";

test("Perform a search by random section name from a test file and verify appropriate section opened", async ({
  page,
}) => {
  const HelpPageBunch = new HelpPage(page);
  const searchKeyword = await Helpers.getRandomElement(
    await Helpers.asyncReadFile("test-data/searchRequests.txt")
  );
  await test.step("Navigate to the Bunch Help page", async () => {
    await HelpPageBunch.gotoHelpPage();
  });

  await test.step("Perform search using random search request from the test file", async () => {
    await HelpPageBunch.performSearchByKeyword(searchKeyword);
    await page.pause();
  });

  await test.step("Verify appropriate page opened", async () => {
    await HelpPageBunch.verifyAppropriateHeaderDisplayed(searchKeyword);
  });
});

test("Click on random section from the grid, open random article and verify appropriate information displayed", async ({
  page,
}) => {
  const HelpPageBunch = new HelpPage(page);
  await test.step("Navigate to the Bunch Help page", async () => {
    await HelpPageBunch.gotoHelpPage();
  });
  await test.step("Click on any section and verify aproppriate collection of articles opened", async () => {
    await HelpPageBunch.clickOnAnyGridOption();
  });
  await test.step("Click on any article and verify user redirected to apropriate article", async () => {
    await HelpPageBunch.clickOnAnyItemAndVeriffyAppropriatePageOpened();
  });
});

test("Open Homepage using Go to Bunch button and verify the user can open Sign In page by navigation button", async ({
  browser,
}) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const HelpPageBunch = new HelpPage(page);
  await test.step("Navigate to the Bunch Help page", async () => {
    await HelpPageBunch.gotoHelpPage();
  });
  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    await HelpPageBunch.clickOnGoToBunchButton(),
  ]);
  const HomepageBunch = new Homepage(newPage);
  const LoginPage = new Login(newPage);
  await test.step("Verify Homepage contain all appropriae navigattion button in the header", async () => {
    await newPage.waitForTimeout(5000);
    const navigationButtonsList = [
      "Founders",
      "Investors",
      "Fund Managers",
      "Resources",
      "About us",
    ];
    await HomepageBunch.verifyAppropriateHeadersDisplayed(
      navigationButtonsList
    );
  });
  await test.step("Navigate to the Login page", async () => {
    await HomepageBunch.clickOnLoginButton();
  });
  await test.step("Verify username and password fields displayed", async () => {
    await newPage.pause();
    await LoginPage.verifyEmailAndPasswordFieldsDisplayed();
  });
});

test("User can navigate to the main Help page by breadcrumb All Collections", async ({
  page,
}) => {
  const HelpPageBunch = new HelpPage(page);
  await test.step("Navigate to the Bunch Help page", async () => {
    await HelpPageBunch.gotoHelpPage();
  });
  await test.step("Click on any section and verify aproppriate collection of articles opened", async () => {
    await HelpPageBunch.clickOnAnyGridOption();
  });
  await test.step("Click on breadcrumb All Collections", async () => {
    await HelpPageBunch.clickOnBreadcrumbAllCollections();
  });
  await test.step("Verify Homepage contain all appropriae navigattion button in the header", async () => {
    const HelpPageBunch = new HelpPage(page);
    await page.pause();
    const gridOptions = [
      "General",
      "Angel Roll-Ups",
      "Syndicates (SPVs)",
      "Funds",
    ];
    await HelpPageBunch.verifyAppropriateGridOptionsDisplayed(gridOptions);
  });
});
