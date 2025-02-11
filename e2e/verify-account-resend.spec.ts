import { test, expect } from '@playwright/test';

test.describe('Verify Account Resend Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/verify-account-resend');
  });

  test('displays the verify email form', async ({ page }) => {
    await expect(page.getByTestId('verify-email-logo')).toBeVisible();

    const emailField = page.getByTestId('verify-email-email-field');
    await expect(emailField).toBeVisible();
    await expect(emailField.locator('input')).toBeVisible();

    await expect(page.getByTestId('verify-email-resend-button')).toBeVisible();

    await expect(page.getByTestId('verify-email-back-to-login')).toBeVisible();
  });

  test('successful verify email resend navigates to login and shows success snackbar', async ({ page }) => {
    await page.route('**/verify-account-resend', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({}),
      });
    });

    await page.getByTestId('verify-email-email-field').locator('input').fill('test@example.com');

    await page.getByTestId('verify-email-resend-button').click();

    const snackbar = page.getByTestId('snackbar');
    await expect(snackbar).toBeVisible();

    await expect(page).toHaveURL(/login/);
  });

  test('failed verify email resend shows error snackbar', async ({ page }) => {
    await page.route('**/verify-account-resend', async (route) => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Error' }),
      });
    });

    await page.getByTestId('verify-email-email-field').locator('input').fill('test@example.com');

    await page.getByTestId('verify-email-resend-button').click();

    const snackbar = page.getByTestId('snackbar');
    await expect(snackbar).toBeVisible();
  });
});
