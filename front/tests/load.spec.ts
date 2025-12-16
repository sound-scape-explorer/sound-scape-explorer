import {expect, test} from '@playwright/test';

import {loadAndSelectView} from './shared';

// this supposes you have the example campaign generated to h5
test('should load', async ({page}) => {
  loadAndSelectView(page);

  // Wait for canvas to render
  await page.waitForSelector('#scene canvas', {state: 'visible'});

  // Verify canvas is visible
  await expect(page.locator('#scene canvas')).toBeVisible();

  // Click tag button
  await page.locator('div:nth-child(4) > .n-button').first().click();

  // Verify first is visible
  await expect(page.getByText('__SITE')).toBeVisible();
});
