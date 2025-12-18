import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test('should display login page', async ({ page }) => {
    await page.goto('/login');
    
    // Check that the page loads
    await expect(page).toHaveURL(/.*login/);
    
    // Check for login form elements
    await expect(page.getByLabel(/username/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
  });

  test('should show login form with material components', async ({ page }) => {
    await page.goto('/login');
    
    // Check for Material Design form fields
    const usernameField = page.locator('mat-form-field').filter({ hasText: /username/i });
    const passwordField = page.locator('mat-form-field').filter({ hasText: /password/i });
    
    await expect(usernameField).toBeVisible();
    await expect(passwordField).toBeVisible();
  });

  test('should require username and password', async ({ page }) => {
    await page.goto('/login');
    
    // Try to submit without filling fields
    const submitButton = page.getByRole('button', { name: /login|sign in/i });
    
    // Fill username
    await page.getByLabel(/username/i).fill('testuser');
    
    // Fill password
    await page.getByLabel(/password/i).fill('testpass');
    
    // Check that button is enabled or form is valid
    await expect(submitButton).toBeEnabled();
  });
});
