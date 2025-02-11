import { test, expect } from '@playwright/test';

test.describe('Profile View', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/accounts/logged_in', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ logged_in: true, account: { id: 1, email: 'test@example.com' } }),
      });
    });
    await page.goto('/profile');
  });

  test('displays profile view sections', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText(/Profil/i);
    await expect(page.locator('h2', { hasText: /Změna hesla/i })).toBeVisible();
    await expect(page.locator('h2', { hasText: /Změna e-mailu/i })).toBeVisible();
    await expect(page.locator('h2', { hasText: /Smazat účet/i })).toBeVisible();
  });

  test('successful change password', async ({ page }) => {
    await page.route('**/change-password', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({}),
      });
    });

    await page.getByTestId('profile-change-password-current-field').locator('input').fill('oldpassword');
    await page.getByTestId('profile-change-password-new-field').locator('input').fill('newpassword123');
    await page.getByTestId('profile-change-password-confirm-field').locator('input').fill('newpassword123');

    await page.getByTestId('profile-change-password-button').click();

    const snackbar = page.getByTestId('snackbar');
    await expect(snackbar).toBeVisible();
    await expect(snackbar).toHaveText(/Heslo bylo úspěšně změněno/i);
  });

  test('failed change password', async ({ page }) => {
    await page.route('**/change-password', async (route) => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Change password failed' }),
      });
    });

    await page.getByTestId('profile-change-password-current-field').locator('input').fill('oldpassword');
    await page.getByTestId('profile-change-password-new-field').locator('input').fill('newpassword123');
    await page.getByTestId('profile-change-password-confirm-field').locator('input').fill('newpassword123');

    await page.getByTestId('profile-change-password-button').click();

    const snackbar = page.getByTestId('snackbar');
    await expect(snackbar).toBeVisible();
    await expect(snackbar).toHaveText(/Došlo k chybě při změně hesla/i);
  });

  test('successful change email', async ({ page }) => {
    await page.route('**/change-login', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({}),
      });
    });

    await page.getByTestId('profile-change-email-email-field').locator('input').fill('new@example.com');
    await page.getByTestId('profile-change-email-password-field').locator('input').fill('currentpassword');

    await page.getByTestId('profile-change-email-button').click();

    const snackbar = page.getByTestId('snackbar');
    await expect(snackbar).toBeVisible();
    await expect(snackbar).toHaveText(/Žádost o změnu e-mailu byla odeslána na váš e-mail/i);
  });

  test('failed change email', async ({ page }) => {
    await page.route('**/change-login', async (route) => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Change email failed' }),
      });
    });

    await page.getByTestId('profile-change-email-email-field').locator('input').fill('new@example.com');
    await page.getByTestId('profile-change-email-password-field').locator('input').fill('currentpassword');

    await page.getByTestId('profile-change-email-button').click();

    const snackbar = page.getByTestId('snackbar');
    await expect(snackbar).toBeVisible();
    await expect(snackbar).toHaveText(/Došlo k chybě při změně e-mailu/i);
  });

  test('successful delete account (confirm)', async ({ page }) => {
    await page.route('**/close-account', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({}),
      });
    });

    await page.getByTestId('profile-delete-account-password-field').locator('input').fill('deletepassword');
    await page.getByTestId('profile-delete-account-button').click();

    const confirmButton = page.getByTestId('global-confirm-confirm-button');
    await expect(confirmButton).toBeVisible();

    await confirmButton.click();

    const snackbar = page.getByTestId('snackbar');
    await expect(snackbar).toBeVisible();
    await expect(snackbar).toHaveText(/Účet byl smazán/i);
  });

  test('delete account canceled does not call API and no snackbar appears', async ({ page }) => {
    let closeAccountCalled = false;
    await page.route('**/close-account', async (route) => {
      closeAccountCalled = true;
      await route.abort();
    });

    await page.getByTestId('profile-delete-account-password-field').locator('input').fill('deletepassword');
    await page.getByTestId('profile-delete-account-button').click();

    const cancelButton = page.getByTestId('global-confirm-cancel-button');
    await expect(cancelButton).toBeVisible();
    await cancelButton.click();

    await page.waitForTimeout(500);
    expect(closeAccountCalled).toBeFalsy();

    await expect(cancelButton).toBeHidden();

    const snackbar = page.getByTestId('snackbar');
    await expect(snackbar).toBeHidden();
  });
});
