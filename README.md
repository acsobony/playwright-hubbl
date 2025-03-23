# Hubbl.com.au Playwright Tests

This repository contains automated end-to-end tests for the [hubbl.com.au](https://hubbl.com.au) website using Playwright.

## Setup

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Install Playwright browsers (if not already installed):
   ```
   npx playwright install
   ```

## Running Tests

Run all tests:
```
npm test
```

Run tests with UI mode:
```
npm run test:ui
```

Run tests in specific browsers:
```
npm run test:chrome
npm run test:firefox
npm run test:safari
```

Debug tests:
```
npm run test:debug
```

View test report:
```
npm run report
```

## Test Structure

The tests are organized into feature areas:

- `hubbl-home.spec.ts` - Tests for the homepage
- `hubbl-services.spec.ts` - Tests for the glass product page
- `hubbl-contact.spec.ts` - Tests for the help center
- `site-check.spec.ts` - Helper test to explore the site structure

## Test Coverage

Current test coverage includes:

- Homepage navigation and content verification
- Glass page product information checking
- Help center article navigation
- Cross-page navigation
- Search functionality in the help center

## Setting up GitHub Actions

To set up GitHub Actions for this project, create a file at `.github/workflows/playwright.yml` with the following content:

```yaml
name: Playwright Tests
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
  schedule:
    - cron: '0 0 * * 1' # Run every Monday at midnight UTC

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
      
      - name: Run Playwright tests
        run: npx playwright test
      
      - name: Upload test results
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

## Contributing

1. Make sure all tests pass before submitting a PR
2. Add new tests for new features
3. Update existing tests if the website UI changes

## License

ISC