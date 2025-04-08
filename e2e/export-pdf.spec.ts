import { test, expect } from '@playwright/test';

test.describe('PDF Export', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/accounts/logged_in', route =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ logged_in: true, account: { id: 1, email: 'test@example.com' } }),
      })
    );

    await page.route('**/family-members/123', route =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            id: '123',
            attributes: {
              'first-name': 'Jan',
              'last-name': 'Novák',
              'date-of-birth': '1980-01-01',
              'short-description': 'Popis',
              deceased: false,
              gender: 'male',
              'relationship-tree': [],
              'marriage-details': [],
              'education-details': [],
              'employment-details': [],
              'residence-address-details': [],
              'additional-attribute-details': [],
              'hobbies-and-interests': '',
              'short-message': '',
              religion: '',
              'birth-last-name': '',
              'birth-place': '',
              'birth-time': '',
              'profile-picture-url': null,
              'signature-url': null,
            },
          },
        }),
      })
    );

    await page.route('**/stories?family-member-id=123*', route =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ data: [] }) })
    );

    await page.route('**/family-members?fields**', route =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ data: [] }) })
    );

    await page.goto('/family-member-detail/123');
    await expect(page.getByTestId('export-button')).toBeVisible();
  });

  const exportOptions = [
    { type: 'family_tree', endpoint: '**/export_to_pdf/family_tree/123' },
    { type: 'member', endpoint: '**/export_to_pdf/family_member/123' },
    { type: 'family', endpoint: '**/export_to_pdf/family' },
  ];

  exportOptions.forEach(({ type, endpoint }) => {
    test(`successfully exports PDF (${type})`, async ({ page }) => {
      await page.route(endpoint, route =>
        route.fulfill({ status: 200, contentType: 'application/pdf', body: '' })
      );

      await page.getByTestId('export-button').click();
      await expect(page.getByTestId('export-pdf-modal')).toBeVisible();

      await page.getByTestId(`export-radio-${type}`).click();
      await page.getByTestId('export-submit-btn').click();

      await expect(page.getByTestId('snackbar')).toBeVisible();
      await expect(page.getByTestId('snackbar')).toContainText(/success|úspěšně/i);
      await expect(page.getByTestId('export-pdf-modal')).not.toBeVisible();
    });
  });

  test('shows error snackbar when export fails', async ({ page }) => {
    await page.route('**/export_to_pdf/**', route =>
      route.fulfill({ status: 500, contentType: 'application/json', body: '{"error":"Server Error"}' })
    );

    await page.getByTestId('export-button').click();
    await expect(page.getByTestId('export-pdf-modal')).toBeVisible();
    await page.getByTestId('export-submit-btn').click();

    await expect(page.getByTestId('snackbar')).toBeVisible();
    await expect(page.getByTestId('snackbar')).toContainText(/error|selhal/i);
    await expect(page.getByTestId('export-pdf-modal')).not.toBeVisible();
  });
});
