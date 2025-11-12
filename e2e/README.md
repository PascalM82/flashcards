# E2E Tests with Playwright

This directory contains End-to-End (E2E) tests for the Spanish Flashcards application using Playwright.

## Test Coverage

The E2E tests cover the following functionality:

### Home Page (`home-page.spec.ts`)
- ✅ Display of home page with title and welcome message
- ✅ Visibility of all navigation buttons (Study Mode, Quiz Mode, Stats Page)
- ✅ Navigation to study mode
- ✅ Navigation to quiz mode
- ✅ Navigation to stats page

### Category Selection (`category-selection.spec.ts`)
- ✅ Category selection page for study mode
- ✅ Category selection page for quiz mode
- ✅ Display of all three category buttons (Animals, Food, Verbs)
- ✅ Navigation to study page when category is selected
- ✅ Back button navigation

### Study Mode (`study-mode.spec.ts`)
- ✅ Display of study page with correct category header
- ✅ Progress bar and card counter
- ✅ Spanish word displayed on flashcard front by default
- ✅ Card flip animation when clicked
- ✅ English translation shown after flip
- ✅ Right and Wrong buttons appear after flipping
- ✅ Buttons not visible before flipping
- ✅ Navigation to next card when Right button is clicked
- ✅ Navigation to next card when Wrong button is clicked
- ✅ Navigation through all cards in category
- ✅ Completion screen after all cards reviewed
- ✅ Tracking and display of wrong answers count
- ✅ Back button navigation from study page
- ✅ Back button navigation from completion screen
- ✅ Works with all categories (Animals, Food, Verbs)

### Stats Page (`stats-page.spec.ts`)
- ✅ Display of stats page
- ✅ Coming soon message
- ✅ Back button navigation

### Navigation Flow (`navigation-flow.spec.ts`)
- ✅ Complete navigation flow from home to study
- ✅ Navigation to quiz mode
- ✅ Navigation to stats page

## Running Tests

### Run all tests
```bash
npm run test:e2e
```

### Run tests with UI mode (interactive)
```bash
npm run test:e2e:ui
```

### Run tests in headed mode (see browser)
```bash
npm run test:e2e:headed
```

### Run tests in debug mode
```bash
npm run test:e2e:debug
```

### Run specific test file
```bash
npx playwright test e2e/home-page.spec.ts
```

### Run tests in a specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Test Configuration

The tests are configured in `playwright.config.ts`:
- Base URL: `http://localhost:5173`
- Automatically starts dev server before tests
- Tests run in parallel by default
- Retries on CI: 2 attempts
- Browsers: Chromium, Firefox, WebKit

## Viewing Test Results

After running tests, you can view the HTML report:
```bash
npx playwright show-report
```

## Writing New Tests

When adding new features, create corresponding E2E tests:

1. Create a new test file in the `e2e/` directory
2. Follow the existing test structure
3. Use descriptive test names
4. Group related tests using `test.describe()`
5. Use `test.beforeEach()` for setup when needed

Example:
```typescript
import { test, expect } from '@playwright/test';

test.describe('New Feature', () => {
  test('should do something', async ({ page }) => {
    await page.goto('/');
    // Your test code here
  });
});
```


