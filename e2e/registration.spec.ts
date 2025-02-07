import { test, expect } from '@playwright/test';

test.describe('Registration View', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/registration');
  });

  test('displays the registration form', async ({ page }) => {
    await expect(page.getByTestId('registration-logo')).toBeVisible();

    await expect(page.getByTestId('registration-email-field')).toBeVisible();
    await expect(page.getByTestId('registration-password-field')).toBeVisible();
    await expect(page.getByTestId('registration-confirm-password-field')).toBeVisible();

    await expect(page.getByTestId('signup-button')).toBeVisible();

    await expect(page.getByTestId('login-link')).toBeVisible();
  });

  test('successful registration navigates to login and shows success snackbar', async ({ page }) => {
    await page.route('**/create-account', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({}),
      });
    });

    await page.getByTestId('registration-email-field').locator('input').fill('test@example.com');
    await page.getByTestId('registration-password-field').locator('input').fill('password1234');
    await page.getByTestId('registration-confirm-password-field').locator('input').fill('password1234');

    await page.getByTestId('signup-button').click();

    const snackbar = page.getByTestId('snackbar');
    await expect(snackbar).toBeVisible();

    await expect(page).toHaveURL(/login/);
  });

  test('failed registration shows error snackbar', async ({ page }) => {
    await page.route('**/create-account', async (route) => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Registration failed' }),
      });
    });

    await page.getByTestId('registration-email-field').locator('input').fill('test@example.com');
    await page.getByTestId('registration-password-field').locator('input').fill('password1234');
    await page.getByTestId('registration-confirm-password-field').locator('input').fill('password1234');

    await page.getByTestId('signup-button').click();

    const snackbar = page.getByTestId('snackbar');
    await expect(snackbar).toBeVisible();
  });
});
