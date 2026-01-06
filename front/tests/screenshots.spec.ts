import {expect, test} from '@playwright/test';

import {loadAndSelectView} from './_shared';

test('scatter png screenshot', async ({page}) => {
  await loadAndSelectView(page);
  const promise = page.waitForEvent('download');
  await page.locator('a').nth(5).click();
  const download = await promise;
  const url = download.url();
  const [header, content] = url.split(',');
  expect(header).toBe('data:image/octet-stream;base64');
  expect(content).not.toBe('');
});

test('scatter svg screenshot', async ({page}) => {
  await loadAndSelectView(page);
  const promise = page.waitForEvent('download');
  await page.locator('div:nth-child(4) > a:nth-child(2)').first().click();
  const download = await promise;
  const url = download.url();
  const [header, content] = url.split(',');
  expect(header).toContain('blob:http://localhost:5530/');
  expect(content).not.toBe('');
});
