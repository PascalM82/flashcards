import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the home page with title and welcome message', async ({ page }) => {
    // Check for main heading
    await expect(page.getByRole('heading', { name: 'Spanish Flashcards' })).toBeVisible();
    
    // Check for welcome message
    await expect(page.getByText(/Welcome! Choose a mode to start learning/i)).toBeVisible();
  });

  test('should display all three navigation buttons', async ({ page }) => {
    // Check for Study Mode button
    await expect(page.getByRole('link', { name: /📚 Study Mode/i })).toBeVisible();
    
    // Check for Quiz Mode button
    await expect(page.getByRole('link', { name: /📝 Quiz Mode/i })).toBeVisible();
    
    // Check for Stats Page button
    await expect(page.getByRole('link', { name: /📊 Stats Page/i })).toBeVisible();
  });

  test('should navigate to study mode when Study Mode button is clicked', async ({ page }) => {
    await page.getByRole('link', { name: /📚 Study Mode/i }).click();
    
    // Should be on category selection page for study mode
    await expect(page).toHaveURL('/study');
    await expect(page.getByRole('heading', { name: /Select a Category/i })).toBeVisible();
    await expect(page.getByText(/Mode:.*Study/i)).toBeVisible();
  });

  test('should navigate to quiz mode when Quiz Mode button is clicked', async ({ page }) => {
    await page.getByRole('link', { name: /📝 Quiz Mode/i }).click();
    
    // Should be on category selection page for quiz mode
    await expect(page).toHaveURL('/quiz');
    await expect(page.getByRole('heading', { name: /Select a Category/i })).toBeVisible();
    await expect(page.getByText(/Mode:.*Quiz/i)).toBeVisible();
  });

  test('should navigate to stats page when Stats Page button is clicked', async ({ page }) => {
    await page.getByRole('link', { name: /📊 Stats Page/i }).click();
    
    // Should be on stats page
    await expect(page).toHaveURL('/stats');
    await expect(page.getByRole('heading', { name: /Statistics/i })).toBeVisible();
  });
});


