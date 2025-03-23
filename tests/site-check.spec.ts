import { test, expect } from '@playwright/test';

test.describe('Hubbl Site Explorer', () => {
  test('explore site structure', async ({ page }) => {
    // Go to homepage
    await page.goto('/');
    
    // Log the current URL and title
    console.log(`Current URL: ${page.url()}`);
    console.log(`Page title: ${await page.title()}`);
    
    // Check for all links on the page
    const allLinks = await page.locator('a[href]').all();
    console.log('\nAll links found on page:');
    
    const paths = new Set();
    
    for (const link of allLinks) {
      const href = await link.getAttribute('href');
      if (href) {
        paths.add(href);
      }
    }
    
    console.log([...paths].sort().join('\n'));
    
    // Log page structure
    console.log('\nMain page sections:');
    const sections = await page.locator('header, nav, main, section, footer').all();
    
    for (const section of sections) {
      const tag = await section.evaluate(el => el.tagName.toLowerCase());
      console.log(`- ${tag}`);
    }
    
    // Log metadata
    console.log('\nPage metadata:');
    const meta = await page.locator('meta[name], meta[property]').all();
    
    for (const tag of meta) {
      const name = await tag.getAttribute('name') || await tag.getAttribute('property');
      const content = await tag.getAttribute('content');
      console.log(`- ${name}: ${content}`);
    }
  });
});