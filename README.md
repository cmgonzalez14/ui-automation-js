# Angular Web App

A project to automate Angular web application.

> Pre-requisite:

1. Install NVM using this command - `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash`
2. To verify whether NVM was installed correctly, hit `command -v nvm`, it should print "nvm". In case of error, set nvm home in environment variable and try again.
3. Install Node verison - 12.11.1 using command `nvm install 12.11.1`
4. Verify node version using `node -v`, it should print "v12.11.1"
5. Copy `user.yml.template` and create a `user.yml` file in `data` folder. Update the the details as per the user who will be running the tests on local.

> To setup:

1. Do `npm install` to fetch all the dependencies.
2. Do `npm run webdriverUpdate` to update the selenium webdrivers.
3. Do `npm run lint` to ensure static code analysis.
4. Do `npm run test` to execute all the tests.
5. Do `npm run doc` to create code documentation. It will get created into `document` folder.
6. Do `npm run fixlint` to auto-fix errors related to static code analysis.

> For Test ConfigUrations:

- Third parameter to `it` method is a custom timeout value.n
- Use `xdescribe` instead of `describe` in test file to skip whole describe during execution.
- Use `xit` instead of `it` in describe block to skip test cases.
- Use `fdescribe` instead of `describe` in test file to run focused describe during execution.
- Use `fit` instead of `it` in describe block to run just focused test cases.
- Use `npx protractor --grep "^Suite name1 TestCase1$|^Suite name2 TestCase2$"` for running specific tests from different suites.

> Reports:

- Report will be generated after each test run and will be placed in epoch date named folder inside `reports` folder.