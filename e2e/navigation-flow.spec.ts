import { test, expect } from '@playwright/test';

test.describe('Complete Navigation Flow', () => {
  test('should navigate through complete study flow', async ({ page }) => {
    // Start at home page
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Spanish Flashcards' })).toBeVisible();
    
    // Navigate to study mode
    await page.getByRole('link', { name: /📚 Study Mode/i }).click();
    await expect(page).toHaveURL('/study');
    await expect(page.getByRole('heading', { name: /Select a Category/i })).toBeVisible();
    
    // Select Animals category
    await page.getByRole('button', { name: 'Animals' }).click();
    await expect(page).toHaveURL('/study/animals');
    await expect(page.getByRole('heading', { name: /Animals - Study Mode/i })).toBeVisible();
    
    // Study one card
    await page.locator('.flashcard').click();
    await page.waitForTimeout(700);
    await page.getByText(/I got it right/i).click();
    await page.waitForTimeout(500);
    
    // Go back to categories
    await page.getByText(/Back to Categories/i).click();
    await expect(page).toHaveURL('/study');
    
    // Go back to home
    await page.getByText(/Back to Home/i).click();
    await expect(page).toHaveURL('/');
  });

  test('should navigate to quiz mode from home', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to quiz mode
    await page.getByRole('link', { name: /📝 Quiz Mode/i }).click();
    await expect(page).toHaveURL('/quiz');
    await expect(page.getByText(/Mode:.*Quiz/i)).toBeVisible();
  });

  test('should navigate to stats page from home', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to stats page
    await page.getByRole('link', { name: /📊 Stats Page/i }).click();
    await expect(page).toHaveURL('/stats');
    await expect(page.getByRole('heading', { name: /Statistics/i })).toBeVisible();
    
    // Navigate back to home
    await page.getByText(/Back to Home/i).click();
    await expect(page).toHaveURL('/');
  });
});


