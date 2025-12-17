import {test, expect} from '@playwright/test';
import {startElectron} from './_shared';
import {join} from 'path';
import {readFileSync, unlinkSync} from 'fs';
import {ConfigDto} from '../../shared/dtos';

test('default json import to export', async () => {
  const {app, main} = await startElectron();

  await main.getByRole('button', {name: 'CONFIGURE'}).click();
  await main.waitForTimeout(1000);

  const campaignWindow = app.windows()[1];

  const filePath = join(
    __dirname,
    '..',
    '..',
    'examples',
    'coral-reef-light.json',
  );

  await campaignWindow
    .getByRole('button', {name: 'Load .json or .xlsx Browse'})
    .setInputFiles(filePath);

  // grab storage input box
  const storageInput = campaignWindow.getByRole('textbox').first();
  const storageValue = await storageInput.inputValue();

  // check default storage name
  expect(storageValue).toBe('coral-reef-light.h5');

  // change storage name
  await storageInput.click();
  await storageInput.press('ControlOrMeta+a');
  await storageInput.fill('storage.h5');

  // grab settings box
  const settingsBox = campaignWindow.getByLabel('Settings');

  // check that settings are invalid
  expect(settingsBox).toContainText('Settings are invalid');

  // grab audio path input box
  const audioPathInput = campaignWindow.getByRole('textbox').nth(1);
  const audioPathValue = await audioPathInput.inputValue();

  // check that audio path is default "REPLACE_ME"
  expect(audioPathValue).toBe('REPLACE_ME');

  // replace audio path value
  await audioPathInput.click();
  await audioPathInput.press('ControlOrMeta+a');
  const audioPath = join(filePath, '..', 'audio');
  await audioPathInput.fill(audioPath);

  // check that settings are valid
  expect(settingsBox).toContainText('Settings are valid');

  // switch to export panel
  await campaignWindow.getByRole('tab', {name: 'Export'}).click();

  // check that export button is in success state
  const exportButton = campaignWindow.getByRole('button', {
    name: 'Download campaign JSON',
  });
  await expect(exportButton).toHaveClass(/bp6-intent-success/);

  // quit
  await main.waitForTimeout(1000);
  await app.close();
});
