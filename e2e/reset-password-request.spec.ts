import { test, expect } from '@playwright/test';

test.describe('Reset Password Request View', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/reset-password-request');
  });

  test('displays the reset password form', async ({ page }) => {
    await expect(page.getByTestId('reset-password-logo')).toBeVisible();

    await expect(page.getByTestId('reset-password-email-field')).toBeVisible();

    await expect(page.getByTestId('reset-password-sendlink-button')).toBeVisible();

    await expect(page.getByTestId('reset-password-back-to-login')).toBeVisible();
  });

  test('successful reset password request navigates to login and shows success snackbar', async ({ page }) => {
    await page.route('**/reset-password-request', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({}),
      });
    });

    await page.getByTestId('reset-password-email-field').locator('input').fill('test@example.com');

    await page.getByTestId('reset-password-sendlink-button').click();

    const snackbar = page.getByTestId('snackbar');
    await expect(snackbar).toBeVisible();

    await expect(page).toHaveURL(/login/);
  });

  test('failed reset password request shows error snackbar', async ({ page }) => {
    await page.route('**/reset-password-request', async (route) => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Error' }),
      });
    });

    await page.getByTestId('reset-password-email-field').locator('input').fill('test@example.com');

    await page.getByTestId('reset-password-sendlink-button').click();

    const snackbar = page.getByTestId('snackbar');
    await expect(snackbar).toBeVisible();
  });
});
