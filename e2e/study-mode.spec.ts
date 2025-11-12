import { test, expect } from '@playwright/test';

test.describe('Study Mode - Flashcard Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/study/animals');
  });

  test('should display study page with correct category header', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Animals - Study Mode/i })).toBeVisible();
  });

  test('should display progress bar and card counter', async ({ page }) => {
    // Check for progress text
    await expect(page.getByText(/Card \d+ of \d+/i)).toBeVisible();
    
    // Check that progress bar exists
    const progressBar = page.locator('.progress-bar-container');
    await expect(progressBar).toBeVisible();
  });

  test('should display Spanish word on flashcard front by default', async ({ page }) => {
    // Wait for flashcard to load
    const flashcard = page.locator('.flashcard');
    await expect(flashcard).toBeVisible();
    
    // Check that Spanish text is visible (one of the animal words)
    const spanishText = page.locator('.flashcard-text');
    await expect(spanishText).toBeVisible();
    
    // Should show "Click to flip" hint
    await expect(page.getByText(/Click to flip/i)).toBeVisible();
  });

  test('should flip card when clicked to show English translation', async ({ page }) => {
    const flashcard = page.locator('.flashcard');
    await expect(flashcard).toBeVisible();
    
    // Get the Spanish text before flipping
    const spanishText = await page.locator('.flashcard-text').textContent();
    expect(spanishText).toBeTruthy();
    
    // Click to flip
    await flashcard.click();
    
    // Wait for flip animation
    await page.waitForTimeout(700); // Wait for 0.6s animation + buffer
    
    // Check that card is flipped (has flipped class)
    await expect(flashcard).toHaveClass(/flipped/);
    
    // Check that English translation is visible
    const englishText = page.locator('.flashcard-text');
    await expect(englishText).toBeVisible();
    
    // English text should be different from Spanish
    const newText = await englishText.textContent();
    expect(newText).not.toBe(spanishText);
  });

  test('should show Right and Wrong buttons after flipping', async ({ page }) => {
    const flashcard = page.locator('.flashcard');
    
    // Flip the card
    await flashcard.click();
    await page.waitForTimeout(700);
    
    // Check that buttons appear
    await expect(page.getByRole('button', { name: /✅ I got it right/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /❌ I got it wrong/i })).toBeVisible();
  });

  test('should not show buttons before flipping', async ({ page }) => {
    // Buttons should not be visible initially
    await expect(page.getByRole('button', { name: /✅ I got it right/i })).not.toBeVisible();
    await expect(page.getByRole('button', { name: /❌ I got it wrong/i })).not.toBeVisible();
  });

  test('should move to next card when Right button is clicked', async ({ page }) => {
    const flashcard = page.locator('.flashcard');
    
    // Get initial card text
    const initialText = await page.locator('.flashcard-text').textContent();
    
    // Flip and answer correctly
    await flashcard.click();
    await page.waitForTimeout(700);
    
    await page.getByRole('button', { name: /✅ I got it right/i }).click();
    
    // Wait for next card to load
    await page.waitForTimeout(500);
    
    // Card should reset (not flipped)
    await expect(flashcard).not.toHaveClass(/flipped/);
    
    // Progress should have advanced
    const progressText = await page.getByText(/Card \d+ of \d+/i).textContent();
    expect(progressText).toContain('Card 2');
  });

  test('should move to next card when Wrong button is clicked', async ({ page }) => {
    const flashcard = page.locator('.flashcard');
    
    // Flip and answer incorrectly
    await flashcard.click();
    await page.waitForTimeout(700);
    
    await page.getByRole('button', { name: /❌ I got it wrong/i }).click();
    
    // Wait for next card to load
    await page.waitForTimeout(500);
    
    // Card should reset (not flipped)
    await expect(flashcard).not.toHaveClass(/flipped/);
    
    // Progress should have advanced
    const progressText = await page.getByText(/Card \d+ of \d+/i).textContent();
    expect(progressText).toContain('Card 2');
  });

  test('should navigate through all cards in category', async ({ page }) => {
    // Go through all cards
    for (let i = 1; i <= 4; i++) {
      // Check current card number
      const progressText = await page.getByText(/Card \d+ of \d+/i).textContent();
      expect(progressText).toContain(`Card ${i}`);
      
      // Flip card
      await page.locator('.flashcard').click();
      await page.waitForTimeout(700);
      
      // Answer (alternate between right and wrong)
      if (i % 2 === 0) {
        await page.getByRole('button', { name: /✅ I got it right/i }).click();
      } else {
        await page.getByRole('button', { name: /❌ I got it wrong/i }).click();
      }
      
      await page.waitForTimeout(500);
    }
    
    // Should show completion screen
    await expect(page.getByRole('heading', { name: /Study Complete!/i })).toBeVisible();
    await expect(page.getByText(/You've finished studying all/i)).toBeVisible();
  });

  test('should show completion screen after all cards are reviewed', async ({ page }) => {
    // Complete all cards
    for (let i = 0; i < 4; i++) {
      await page.locator('.flashcard').click();
      await page.waitForTimeout(700);
      await page.getByRole('button', { name: /✅ I got it right/i }).click();
      await page.waitForTimeout(500);
    }
    
    // Check completion screen
    await expect(page.getByRole('heading', { name: /Study Complete! 🎉/i })).toBeVisible();
    await expect(page.getByText(/You've finished studying all 4 cards/i)).toBeVisible();
  });

  test('should track wrong answers and display count on completion', async ({ page }) => {
    // Answer some cards wrong
    for (let i = 0; i < 4; i++) {
      await page.locator('.flashcard').click();
      await page.waitForTimeout(700);
      
      // Answer first two wrong, last two right
      if (i < 2) {
        await page.getByRole('button', { name: /❌ I got it wrong/i }).click();
      } else {
        await page.getByRole('button', { name: /✅ I got it right/i }).click();
      }
      
      await page.waitForTimeout(500);
    }
    
    // Check that wrong count is displayed
    await expect(page.getByText(/You got 2 cards wrong/i)).toBeVisible();
  });

  test('should navigate back to categories from study page', async ({ page }) => {
    await page.getByRole('button', { name: /← Back to Categories/i }).click();
    
    await expect(page).toHaveURL('/study');
    await expect(page.getByRole('heading', { name: /Select a Category/i })).toBeVisible();
  });

  test('should navigate back to categories from completion screen', async ({ page }) => {
    // Complete all cards
    for (let i = 0; i < 4; i++) {
      await page.locator('.flashcard').click();
      await page.waitForTimeout(700);
      await page.getByRole('button', { name: /✅ I got it right/i }).click();
      await page.waitForTimeout(500);
    }
    
    // Click back button from completion screen
    await page.getByRole('button', { name: /← Back to Categories/i }).click();
    
    await expect(page).toHaveURL('/study');
    await expect(page.getByRole('heading', { name: /Select a Category/i })).toBeVisible();
  });
});

test.describe('Study Mode - Different Categories', () => {
  test('should work with Food category', async ({ page }) => {
    await page.goto('/study/food');
    
    await expect(page.getByRole('heading', { name: /Food - Study Mode/i })).toBeVisible();
    
    // Should have flashcards
    await expect(page.locator('.flashcard')).toBeVisible();
  });

  test('should work with Verbs category', async ({ page }) => {
    await page.goto('/study/verbs');
    
    await expect(page.getByRole('heading', { name: /Verbs - Study Mode/i })).toBeVisible();
    
    // Should have flashcards
    await expect(page.locator('.flashcard')).toBeVisible();
  });
});


