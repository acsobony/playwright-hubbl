import { test, expect } from '@playwright/test';

test.describe('Hubbl Homepage', () => {
  test('homepage has correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Hubbl/);
  });

  test('navigation menu exists', async ({ page }) => {
    await page.goto('/');
    // Use a more specific selector to avoid matching multiple elements
    const navMenu = page.locator('nav.flex-1').first();
    await expect(navMenu).toBeVisible();
  });

  test('footer contains copyright information', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    // Look for just the year in the copyright info
    await expect(footer).toContainText(/2023|2024|2025/);
  });

  test('help button exists and is clickable', async ({ page }) => {
    await page.goto('/');
    // Look for Help link instead of Contact
    const helpButton = page.getByRole('link', { name: /help/i }).first();
    await expect(helpButton).toBeVisible();
    
    // Click the help button and verify it navigates
    await helpButton.click();
    
    // Verify navigation completed
    await expect(page).toHaveURL(/help|support/i);
  });
});