import {expect, test} from '@playwright/test';
import path from 'path';

// this supposes you have the example campaign generated to h5
test('should load to scatter to tags', async ({page}) => {
  await page.goto('http://localhost:5530/');

  // Fix file upload - use setInputFiles on the input element, not the button
  const fileInput = page.locator('input[type="file"]');
  const filePath = path.join(
    __dirname,
    '..',
    '..',
    'examples',
    'coral-reef-light.h5',
  );
  console.log(filePath);
  await fileInput.setInputFiles(filePath);

  // Wait for file to be processed before interacting
  await page.waitForLoadState('networkidle');

  // Extraction dropdown
  await page
    .locator('div')
    .filter({hasText: /^Extraction\.\.\.$/})
    .nth(4)
    .click();
  await page.locator('.n-base-select-option').click();

  // Band dropdown
  await page
    .locator('div')
    .filter({hasText: /^Band\.\.\.$/})
    .nth(4)
    .click();
  await page.getByText('- poissons - 70Hz - 2000Hz').click();

  // Integration dropdown
  await page
    .locator('div')
    .filter({hasText: /^Integration\.\.\.$/})
    .nth(4)
    .click();
  await page
    .locator(
      '.n-base-select-menu.n-select-menu.fade-in-scale-up-transition-enter-active > .n-scrollbar > .n-virtual-list > .v-vl-items > .v-vl-visible-items > .n-base-select-option',
    )
    .click();

  // Reducer dropdown
  await page
    .locator('div')
    .filter({hasText: /^Reducer\.\.\.$/})
    .nth(4)
    .click();
  await page
    .locator('div')
    .filter({hasText: /^0 - UMAP - 3d$/})
    .first()
    .click();

  // Wait for canvas to render
  await page.waitForSelector('#scene canvas', {state: 'visible'});

  // Verify canvas is visible
  await expect(page.locator('#scene canvas')).toBeVisible();

  // Click tag button
  await page.locator('div:nth-child(4) > .n-button').first().click();

  // Verify first is visible
  await expect(page.getByText('__SITE')).toBeVisible();
});
