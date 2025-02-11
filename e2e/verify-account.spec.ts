import { test, expect } from '@playwright/test';

test.describe('Verify Account View', () => {
  const mockNotLoggedIn = async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ logged_in: false, account: null }),
    });
  };

  test.beforeEach(async ({ page }) => {
    await page.route('**/accounts/logged_in', mockNotLoggedIn);
  });

  test('successful account verification redirects to login and shows success snackbar', async ({ page }) => {
    await page.route('**/verify-account', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({}),
      });
    });

    await page.goto('/verify-account?key=test-key');

    await expect(page).toHaveURL(/login/);

    const snackbar = page.getByTestId('snackbar');
    await expect(snackbar).toBeVisible();
    await expect(snackbar).toHaveText(/Účet byl ověřen!/i);
  });

  test('failed account verification redirects to login and shows error snackbar', async ({ page }) => {
    await page.route('**/verify-account', async (route) => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Verification failed' }),
      });
    });

    await page.goto('/verify-account?key=test-key');

    await expect(page).toHaveURL(/login/);

    const snackbar = page.getByTestId('snackbar');
    await expect(snackbar).toBeVisible();
    await expect(snackbar).toHaveText(/Ověření účtu selhalo/i);
  });

  test('missing key query parameter redirects to login', async ({ page }) => {
    await page.goto('/verify-account');

    await expect(page).toHaveURL(/login/);
  });
});
