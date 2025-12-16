import {type Page} from '@playwright/test';
import path from 'path';

export async function loadAndSelectView(page: Page) {
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
}
