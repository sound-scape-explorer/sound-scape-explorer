import {expect, test} from '@playwright/test';

import {loadAndSelectView} from './_shared';

test('filter tag', async ({page}) => {
  await loadAndSelectView(page);

  // open tag menu
  await page.locator('div:nth-child(4) > .n-button').first().click();

  // expand __site
  await page.locator('._chevron_1xs32_24').first().click();

  // filter boats
  await page.getByRole('checkbox', {name: 'boat'}).click();

  // expect 72 intervals
  await expect(page.locator('#app')).toContainText('72');
});
