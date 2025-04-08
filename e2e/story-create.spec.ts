import { test, expect } from '@playwright/test';

test.describe('Story Creation', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/accounts/logged_in', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          logged_in: true,
          account: { id: 1, email: 'test@example.com' }
        }),
      });
    });

    await page.route('**/family-members*sort=first-name', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: [
            {
              id: "123",
              attributes: {
                "first-name": "Test",
                "last-name": "User",
                "date-of-birth": "2000-01-01"
              }
            }
          ]
        })
      });
    });

    await page.goto('/new-story?person=123');
  });

  test('successful story creation publishes story and navigates to detail page', async ({ page }) => {
    await page.route('**/stories', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ id: '23', attributes: {} }),
      });
    });

    await page.getByTestId('story-title-field').locator('input').fill('My New Story');

    await page.getByTestId('quill-editor').locator('.ql-editor').first().fill('This is the story content.');

    await page.getByTestId('selected-persons-select').click();
    const option = page.getByText('Test User (nar. 2000-01-01)');
    await expect(option).toBeVisible();
    await option.click();

    await page.getByTestId('story-date-field').locator('input').fill('2023-01-01');

    await page.getByTestId('publish-story-button').click();

    await expect(page).toHaveURL(/\/story-detail\/23/);
  });

  test('failed story creation shows error snackbar', async ({ page }) => {
    await page.route('**/stories', async (route) => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Creation failed' }),
      });
    });

    await page.getByTestId('story-title-field').locator('input').fill('My New Story');
    await page.getByTestId('quill-editor').locator('.ql-editor').first().fill('This is the story content.');
    await page.getByTestId('selected-persons-select').click();
    const option = page.getByText('Test User (nar. 2000-01-01)');
    await expect(option).toBeVisible();
    await option.click();
    await page.getByTestId('story-date-field').locator('input').fill('2023-01-01');

    await page.getByTestId('publish-story-button').click();

    await expect(page.getByTestId('snackbar')).toBeVisible();
  });
});
