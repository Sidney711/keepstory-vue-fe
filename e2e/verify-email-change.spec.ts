import { test, expect } from '@playwright/test';

test.describe('Verify Email Change View', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/accounts/logged_in', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ logged_in: true, account: { id: 1, email: 'test@example.com' } }),
      });
    });
  });

  test('successful email change verification redirects to login and shows success snackbar', async ({ page }) => {
    await page.route('**/verify-login-change', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({}),
      });
    });

    await page.goto('/verify-email-change?key=test-key');

    const snackbar = page.getByTestId('snackbar');
    await expect(snackbar).toBeVisible();
    await expect(snackbar).toHaveText(/E-mail byl úspěšně změněn!/i);
  });

  test('failed email change verification redirects to homepage and shows error snackbar', async ({ page }) => {
    await page.route('**/verify-login-change', async (route) => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Verification failed' }),
      });
    });

    await page.goto('/verify-email-change?key=test-key');

    await expect(page).toHaveURL(/\/$/);

    const snackbar = page.getByTestId('snackbar');
    await expect(snackbar).toBeVisible();
    await expect(snackbar).toHaveText(/Změna e-mailu selhala/i);
  });

  test('missing key query parameter redirects to homepage', async ({ page }) => {
    await page.goto('/verify-email-change');

    await expect(page).toHaveURL(/\/$/);
  });
});
