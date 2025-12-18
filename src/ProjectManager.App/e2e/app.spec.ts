import { test, expect } from '@playwright/test';

test.describe('Application Navigation', () => {
  test('should load the application', async ({ page }) => {
    await page.goto('/');
    
    // Application should load without errors
    await expect(page).toHaveTitle(/app/i);
  });

  test('should redirect to login when not authenticated', async ({ page }) => {
    await page.goto('/');
    
    // Should redirect to login page
    await expect(page).toHaveURL(/.*login/);
  });

  test('should display Angular Material components', async ({ page }) => {
    await page.goto('/login');
    
    // Check for Material components
    const matFormFields = page.locator('mat-form-field');
    await expect(matFormFields.first()).toBeVisible();
  });
});

test.describe('Material Design Theme', () => {
  test('should apply Material Design theme', async ({ page }) => {
    await page.goto('/login');
    
    // Check that Material theme is applied
    const body = page.locator('body');
    await expect(body).toHaveCSS('font-family', /Roboto/);
  });
});
