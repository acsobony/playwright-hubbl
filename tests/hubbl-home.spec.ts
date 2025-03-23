import { test, expect } from '@playwright/test';

test.describe('Hubbl Homepage', () => {
  test('homepage has correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/HUBBL/);
  });

  test('navigation menu exists', async ({ page }) => {
    await page.goto('/');
    const navMenu = page.locator('nav');
    await expect(navMenu).toBeVisible();
  });

  test('footer contains copyright information', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer).toContainText(/copyright|©/i);
  });

  test('contact button exists and is clickable', async ({ page }) => {
    await page.goto('/');
    const contactButton = page.getByRole('link', { name: /contact/i });
    await expect(contactButton).toBeVisible();
    
    // Click the contact button and verify it navigates to contact page
    await contactButton.click();
    
    // Wait for navigation to complete and check URL contains 'contact'
    await expect(page).toHaveURL(/contact/i);
  });
});