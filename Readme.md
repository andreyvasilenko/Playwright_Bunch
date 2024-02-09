This project contains the tests created for the take-home challenge. These tests can be run on production or any other environment to help validate that none of the critical functionality of the website has been broken.

Test cases and reason for selection: 
1) "Perform a search by random section name from a test file and verify appropriate section opened" - main user flow of the Help page (test case implemented with random search request from file with search requests and it allows us to cover different scenarios in the execution of each test)
2) "Click on random section from the grid, open random article and verify appropriate information displayed" - main user flow of the Help page (test case implemented with random section and random article and it allow us to cover different scenarios in each test execution)
3) "Open Homepage using Go to Bunch button and verify the user can open Sign In page by navigation button" - one of the most critical scenarios for business 
4) "User can navigate to the main Help page by breadcrumb All Collections" - frequently used scenario 

To generate a new Allure report: 
npx allure generate ./allure-results/ --clean
npx allure open ./allure-report/

To set the env variable prod/stage use variable TEST_ENV: 
TEST_ENV=stage npx playwright test
TEST_ENV=prod npx playwright test (without TEST_ENV will also use prod env) 