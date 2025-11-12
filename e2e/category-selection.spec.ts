import { test, expect } from '@playwright/test';

test.describe('Category Selection Page', () => {
  test.describe('Study Mode', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/study');
    });

    test('should display category selection page for study mode', async ({ page }) => {
      await expect(page.getByRole('heading', { name: /Select a Category/i })).toBeVisible();
      await expect(page.getByText(/Mode:.*Study/i)).toBeVisible();
    });

    test('should display all three category buttons', async ({ page }) => {
      await expect(page.getByRole('button', { name: 'Animals' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Food' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Verbs' })).toBeVisible();
    });

    test('should navigate to study page when Animals category is selected', async ({ page }) => {
      await page.getByRole('button', { name: 'Animals' }).click();
      
      await expect(page).toHaveURL('/study/animals');
      await expect(page.getByRole('heading', { name: /Animals - Study Mode/i })).toBeVisible();
    });

    test('should navigate to study page when Food category is selected', async ({ page }) => {
      await page.getByRole('button', { name: 'Food' }).click();
      
      await expect(page).toHaveURL('/study/food');
      await expect(page.getByRole('heading', { name: /Food - Study Mode/i })).toBeVisible();
    });

    test('should navigate to study page when Verbs category is selected', async ({ page }) => {
      await page.getByRole('button', { name: 'Verbs' }).click();
      
      await expect(page).toHaveURL('/study/verbs');
      await expect(page.getByRole('heading', { name: /Verbs - Study Mode/i })).toBeVisible();
    });

    test('should navigate back to home when back button is clicked', async ({ page }) => {
      await page.getByText(/Back to Home/i).click();
      
      await expect(page).toHaveURL('/');
      await expect(page.getByRole('heading', { name: 'Spanish Flashcards' })).toBeVisible();
    });
  });

  test.describe('Quiz Mode', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/quiz');
    });

    test('should display category selection page for quiz mode', async ({ page }) => {
      await expect(page.getByRole('heading', { name: /Select a Category/i })).toBeVisible();
      await expect(page.getByText(/Mode:.*Quiz/i)).toBeVisible();
    });

    test('should navigate to quiz page when category is selected', async ({ page }) => {
      await page.getByRole('button', { name: 'Animals' }).click();
      
      // Quiz mode implementation is in Phase 4, so it should show placeholder
      await expect(page).toHaveURL('/quiz/animals');
    });
  });
});


