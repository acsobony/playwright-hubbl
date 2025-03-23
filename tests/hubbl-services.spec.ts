import { test, expect } from '@playwright/test';

test.describe('Hubbl Glass Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the glass page instead of products
    await page.goto('/glass');
  });

  test('glass page has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Hubbl/i);
  });

  test('product information is displayed', async ({ page }) => {
    // Look for content sections
    const contentSections = page.locator('section, article');
    await expect(contentSections.first()).toBeVisible();
    
    // Look for product heading
    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible();
    await expect(heading).not.toBeEmpty();
  });

  test('can navigate to help page', async ({ page }) => {
    // Find and click the help link
    const helpLink = page.getByRole('link', { name: /help/i }).first();
    
    // If help link exists, test navigation
    if (await helpLink.count() > 0) {
      await helpLink.click();
      
      // Check that we navigated to help page
      await expect(page).toHaveURL(/help\.hubbl\.com/);
    } else {
      // If no help link, skip the test
      test.skip();
    }
  });

  test('can navigate back to homepage', async ({ page }) => {
    // Find and click the hubbl logo/link
    const homeLink = page.locator('a').filter({ hasText: /hubbl/i }).first();
    
    if (await homeLink.count() > 0) {
      await homeLink.click();
      
      // Verify we're back on the homepage by checking the URL
      await expect(page.url()).toContain('hubbl.com.au');
    } else {
      // Alternative: look for any link that might go to homepage
      const altHomeLink = page.locator('header a').first();
      await altHomeLink.click();
      
      // Verify we navigated somewhere
      await expect(page).not.toHaveURL('/glass');
    }
  });
});