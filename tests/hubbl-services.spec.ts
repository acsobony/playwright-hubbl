import { test, expect } from '@playwright/test';

test.describe('Hubbl Services Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the services page before each test
    await page.goto('/services');
  });

  test('services page has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Services|HUBBL Services/i);
  });

  test('service listings are visible', async ({ page }) => {
    // Look for service cards or containers
    const serviceElements = page.locator('.service-item, [data-testid="service-item"]');
    await expect(serviceElements).toBeVisible();
  });

  test('each service has a description', async ({ page }) => {
    // Find all service elements and check they have descriptions
    const serviceElements = page.locator('.service-item, [data-testid="service-item"]');
    
    // Get the count of service elements
    const count = await serviceElements.count();
    
    // Ensure there's at least one service
    expect(count).toBeGreaterThan(0);
    
    // Check each service has a description
    for (let i = 0; i < count; i++) {
      const service = serviceElements.nth(i);
      const description = service.locator('.description, [data-testid="service-description"]');
      await expect(description).toBeVisible();
      await expect(description).not.toBeEmpty();
    }
  });

  test('can navigate back to homepage', async ({ page }) => {
    // Find and click the home/logo link
    await page.getByRole('link', { name: /home|hubbl/i }).first().click();
    
    // Verify we're back on the homepage
    await expect(page).toHaveURL('/');
  });
});