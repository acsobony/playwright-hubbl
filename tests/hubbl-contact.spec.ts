import { test, expect } from '@playwright/test';

test.describe('Hubbl Contact Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the contact page before each test
    await page.goto('/contact');
  });

  test('contact page has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Contact|HUBBL Contact/i);
  });

  test('contact form is present', async ({ page }) => {
    const contactForm = page.locator('form');
    await expect(contactForm).toBeVisible();
  });

  test('all required form fields are present', async ({ page }) => {
    // Check for common contact form fields
    await expect(page.getByLabel(/name/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/message|inquiry/i)).toBeVisible();
    
    // Look for a submit button
    const submitButton = page.getByRole('button', { name: /submit|send/i });
    await expect(submitButton).toBeVisible();
  });

  test('validates required fields', async ({ page }) => {
    // Get the submit button
    const submitButton = page.getByRole('button', { name: /submit|send/i });
    
    // Try to submit without filling required fields
    await submitButton.click();
    
    // Check for validation errors
    const errorMessages = page.locator('.error-message, [data-testid="error-message"]');
    await expect(errorMessages).toBeVisible();
  });

  test('validates email format', async ({ page }) => {
    // Get the email field and submit button
    const emailField = page.getByLabel(/email/i);
    const submitButton = page.getByRole('button', { name: /submit|send/i });
    
    // Fill with invalid email format
    await emailField.fill('invalid-email');
    
    // Try to submit
    await submitButton.click();
    
    // Check for validation error specific to email
    const emailError = page.locator('.error-message, [data-testid="error-message"]')
      .filter({ hasText: /email|valid/i });
    await expect(emailError).toBeVisible();
  });
});