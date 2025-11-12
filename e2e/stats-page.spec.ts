import { test, expect } from '@playwright/test';

test.describe('Stats Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/stats');
  });

  test('should display stats page with heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Statistics/i })).toBeVisible();
  });

  test('should display coming soon message', async ({ page }) => {
    await expect(page.getByText(/Statistics tracking will be available in Phase 5/i)).toBeVisible();
  });

  test('should have back to home button', async ({ page }) => {
    const backButton = page.getByRole('link', { name: /← Back to Home/i });
    await expect(backButton).toBeVisible();
  });

  test('should navigate back to home when back button is clicked', async ({ page }) => {
    await page.getByRole('link', { name: /← Back to Home/i }).click();
    
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'Spanish Flashcards' })).toBeVisible();
  });
});


