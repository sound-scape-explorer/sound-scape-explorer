import {expect, test} from '@playwright/test';

import {interceptAudioContext, loadAndSelectView} from './_shared';

test('audio from calendar', async ({page}) => {
  await interceptAudioContext(page);
  await loadAndSelectView(page);

  // open calendar
  await page.getByRole('button').nth(5).click();

  // open range dropdown
  await page.getByText('-1 - __FULL').click();

  // change range
  await page
    .locator('div')
    .filter({hasText: /^3 - r_dec_2022$/})
    .first()
    .click();

  // change window
  await page.getByRole('button', {name: '4h'}).click();

  // click on interval
  await page
    .locator('canvas')
    .nth(2)
    .click({
      position: {
        x: 142,
        y: 29,
      },
    });

  // audio panel should have opened automatically
  // click play button
  await page
    .locator(
      'div:nth-child(9) > div:nth-child(3) > ._content_6c78s_14 > ._container_59gu6_1 > div > .n-button',
    )
    .first()
    .click();

  // change gain
  await page
    .locator('div:nth-child(2) > .n-slider-rail > .n-slider-handles')
    .first()
    .click();

  await page.waitForTimeout(1000);

  // @ts-ignore
  const timeA = await page.evaluate(() => window.__audioContext.currentTime);

  await page.waitForTimeout(2000);

  // @ts-ignore
  const timeB = await page.evaluate(() => window.__audioContext.currentTime);

  expect(timeB).toBeGreaterThan(timeA);

  // click stop button
  await page
    .locator(
      'div:nth-child(9) > div:nth-child(3) > ._content_6c78s_14 > ._container_59gu6_1 > div:nth-child(2) > .n-button',
    )
    .click();
});
