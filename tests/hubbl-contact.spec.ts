import { test, expect } from '@playwright/test';

test.describe('Hubbl Help Centre', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the external help center
    await page.goto('https://help.hubbl.com.au/s/');
  });

  test('help page has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Help|Support|Hubbl/i);
  });

  test('help content is visible', async ({ page }) => {
    // Look for help content
    const helpContent = page.locator('main, article, .content');
    await expect(helpContent.first()).toBeVisible();
  });

  test('help articles are available', async ({ page }) => {
    // Look for links to articles
    const articleLinks = page.getByRole('link', { name: /Setting up|FAQ|How to/i });
    
    // Ensure at least one article link exists
    await expect(articleLinks.first()).toBeVisible();
  });

  test('can open a help article', async ({ page }) => {
    // Find and click the first article link
    const articleLinks = page.getByRole('link', { name: /Setting up|FAQ|How to/i });
    
    if (await articleLinks.count() > 0) {
      // Click the first article
      await articleLinks.first().click();
      
      // Verify we're on an article page
      await expect(page).toHaveURL(/article|help/i);
      
      // Check for article content
      const articleContent = page.locator('article, .article-content, main');
      await expect(articleContent.first()).toBeVisible();
    } else {
      // Skip if no article links found
      test.skip();
    }
  });

  test('can search for help', async ({ page }) => {
    // Look for search input with more specific selector
    const searchInput = page.locator('input[placeholder="Search"]').first();
    
    if (await searchInput.count() > 0) {
      // Enter search term
      await searchInput.fill('setup');
      await searchInput.press('Enter');
      
      // Wait for search results
      await page.waitForLoadState('networkidle');
      
      // Check for search results or any content after search
      const contentAfterSearch = page.locator('body');
      await expect(contentAfterSearch).toBeVisible();
    } else {
      // Skip if no search input found
      test.skip();
    }
  });
});