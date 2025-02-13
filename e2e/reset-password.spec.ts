import { test, expect } from '@playwright/test';

test.describe('Reset Password Page', () => {
  const getPageUrl = (key?: string) => key ? `/reset-password?key=${key}` : '/reset-password';

  test('displays the reset password form', async ({ page }) => {
    await page.goto(getPageUrl('test-key'));

    await expect(page.getByTestId('reset-password-logo')).toBeVisible();

    await expect(page.getByTestId('reset-password-new-password-field')).toBeVisible();
    await expect(page.getByTestId('reset-password-new-password-field').locator('input')).toBeVisible();

    await expect(page.getByTestId('reset-password-confirm-password-field')).toBeVisible();
    await expect(page.getByTestId('reset-password-confirm-password-field').locator('input')).toBeVisible();

    await expect(page.getByTestId('reset-password-reset-button')).toBeVisible();

    await expect(page.getByTestId('reset-password-back-to-login')).toBeVisible();
  });

  test('redirects to login if key query parameter is missing', async ({ page }) => {
    await page.goto(getPageUrl());
    await expect(page).toHaveURL(/login/);
  });

  test('successful reset password request navigates to login and shows success snackbar', async ({ page }) => {
    await page.route('**/reset-password', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({}),
      });
    });

    await page.goto(getPageUrl('test-key'));

    const newPasswordField = page.getByTestId('reset-password-new-password-field').locator('input');
    const confirmPasswordField = page.getByTestId('reset-password-confirm-password-field').locator('input');

    await newPasswordField.fill('password1234');
    await confirmPasswordField.fill('password1234');

    await page.getByTestId('reset-password-reset-button').click();

    const snackbar = page.getByTestId('snackbar');
    await expect(snackbar).toBeVisible();

    await expect(page).toHaveURL(/login/);
  });

  test('failed reset password request shows error snackbar', async ({ page }) => {
    await page.route('**/reset-password', async (route) => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Reset failed' }),
      });
    });

    await page.goto(getPageUrl('test-key'));

    const newPasswordField = page.getByTestId('reset-password-new-password-field').locator('input');
    const confirmPasswordField = page.getByTestId('reset-password-confirm-password-field').locator('input');

    await newPasswordField.fill('password1234');
    await confirmPasswordField.fill('password1234');

    await page.getByTestId('reset-password-reset-button').click();

    const snackbar = page.getByTestId('snackbar');
    await expect(snackbar).toBeVisible();
  });
});
