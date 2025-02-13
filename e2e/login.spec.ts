import { test, expect } from '@playwright/test';

test.describe('Login View', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('displays the login form', async ({ page }) => {
    await expect(page.locator('img[src="/logos/keepstory-logo.png"]')).toBeVisible();

    await expect(page.getByTestId('email-field')).toBeVisible();
    await expect(page.getByTestId('password-field')).toBeVisible();

    await expect(page.getByTestId('login-button')).toBeVisible();

    await expect(page.getByTestId('register-link')).toBeVisible();
    await expect(page.getByTestId('resend-verification-link')).toBeVisible();
  });

  test('successful login navigates to homepage', async ({ page }) => {
    await page.route('**/login', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
      });
    });

    await page.getByTestId('email-field').locator('input').fill('user@example.com');
    await page.getByTestId('password-field').locator('input').fill('password1234');

    await page.getByTestId('login-button').click();

    const snackbar = page.getByTestId('snackbar');
    await expect(snackbar).toBeHidden();
  });

  test('failed login shows error snackbar', async ({ page }) => {
    await page.route('**/login', async (route) => {
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
      });
    });

    await page.getByTestId('email-field').locator('input').fill('user@example.com');
    await page.getByTestId('password-field').locator('input').fill('wrongpassword');

    await page.getByTestId('login-button').click();

    const snackbar = page.getByTestId('snackbar');
    await expect(snackbar).toBeVisible();
  });
});
