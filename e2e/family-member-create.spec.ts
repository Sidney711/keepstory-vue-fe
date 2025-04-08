import { test, expect } from '@playwright/test';

test.describe('Family Member Creation', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/accounts/logged_in', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ logged_in: true, account: { id: 1, email: 'test@example.com' } }),
      });
    });
    await page.goto('/');
  });

  test('opens the family member creation modal', async ({ page }) => {
    await page.getByTestId('open-create-modal-button').click();

    await expect(page.getByTestId('modal-title')).toHaveText(/Vytvořit novou osobu/i);
  });

  test('successful family member creation closes modal and shows success snackbar', async ({ page }) => {
    await page.route('**/family-members', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({}),
      });
    });

    await page.getByTestId('open-create-modal-button').click();

    await page.getByTestId('first-name-field').locator('input').fill('John');
    await page.getByTestId('last-name-field').locator('input').fill('Doe');
    await page.getByTestId('date-of-birth-field').locator('input').fill('1980-01-01');

    await page.getByTestId('create-family-member-button').click();

    await expect(page.getByTestId('modal-title')).toBeHidden();

    await expect(page.getByTestId('snackbar')).toBeVisible();
  });

  test('failed family member creation shows error snackbar', async ({ page }) => {
    await page.route('**/family-members', async (route) => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Creation failed' }),
      });
    });

    await page.getByTestId('open-create-modal-button').click();

    await page.getByTestId('first-name-field').locator('input').fill('John');
    await page.getByTestId('last-name-field').locator('input').fill('Doe');
    await page.getByTestId('date-of-birth-field').locator('input').fill('1980-01-01');

    await page.getByTestId('create-family-member-button').click();

    await expect(page.getByTestId('snackbar')).toBeVisible();
    await expect(page.getByTestId('modal-title')).toBeVisible();
  });
});
