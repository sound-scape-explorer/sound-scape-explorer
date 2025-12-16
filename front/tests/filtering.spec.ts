import {expect, test} from '@playwright/test';

import {loadAndSelectView} from './_shared';

test('tag filtering', async ({page}) => {
  await loadAndSelectView(page);

  // open tag panel
  await page.locator('div:nth-child(4) > .n-button').first().click();

  // expand __SITE
  await page.locator('._chevron_1xs32_24').first().click();

  // filter boats
  await page.getByRole('checkbox', {name: 'boat'}).click();

  // expect 72 intervals
  await expect(page.locator('#app')).toContainText('72');
});

test('calendar filtering', async ({page}) => {
  await loadAndSelectView(page);

  // open calendar panel
  await page.getByRole('button').nth(5).click();

  // open range dropdown
  await page.getByText('-1 - __FULL').click();

  // change range
  await page.getByText('- r_nov1_2022').click();

  // change window
  await page.getByRole('button', {name: '4h'}).click();

  // activate filtering
  await page.getByText('No').nth(1).click();

  // check that we get 36 intervals
  await expect(page.locator('#app')).toContainText('36');
});

test('spatial filtering', async ({page}) => {
  await loadAndSelectView(page);

  // open spatial panel
  await page.locator('div:nth-child(5) > .n-button').click();

  // expand all axis ranges
  await page.getByRole('button', {name: 'expand'}).click();

  // trim first axis range
  await page.locator('.n-slider-handles').first().click();

  // enable filtering
  await page.getByText('No', {exact: true}).nth(3).click();

  // verify we get 84 intervals
  await expect(page.locator('#app')).toContainText('84');
});

test('temporal filtering', async ({page}) => {
  await loadAndSelectView(page);

  // open temporal panel
  await page.locator('div:nth-child(6) > .n-button').click();

  // open dropdown
  await page
    .locator(
      '._first_1pxym_13 > div > div > .n-select > .n-base-selection > .n-base-selection-label',
    )
    .click();

  // select Leq
  await page.getByText('- Leq').click();

  // click on low threshold input
  await page.getByRole('textbox', {name: 'From'}).click();

  // enter -60 dBFS
  await page.getByRole('textbox', {name: 'From'}).fill('-60');

  // validate
  await page.getByRole('textbox', {name: 'From'}).press('Enter');

  // verify we get 25 intervals
  await expect(page.locator('#app')).toContainText('25');
});
