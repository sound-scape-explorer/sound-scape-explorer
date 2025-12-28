import {expect, test} from '@playwright/test';
import {startElectron} from './_shared';
import {join} from 'path';

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

test('folder drag and drop to extraction creation to extraction import', async () => {
  const {app, main} = await startElectron();
  await main.getByRole('button', {name: 'CONFIGURE'}).click();
  await main.waitForTimeout(1000);

  const campaignWindow = app.windows()[1];

  ////////////
  // import //
  ////////////

  // get audio folder path
  const audioFolder = join(__dirname, '..', '..', 'examples', 'audio');

  // fill dropzone input
  const fileInput = campaignWindow.locator('input[type="file"]').nth(1);
  await fileInput.setInputFiles(audioFolder);

  //////////////
  // settings //
  //////////////

  // check that audio path is correct
  const audioPathInput = campaignWindow.getByRole('textbox').nth(1);
  await expect(audioPathInput).toHaveValue(audioFolder);

  // check that settings are valid
  await expect(campaignWindow.getByLabel('Settings')).toContainText(
    'Settings are valid',
  );

  ///////////
  // files //
  ///////////

  // navigate to files tab
  await campaignWindow.getByRole('tab', {name: 'Files'}).click();

  // check that files are valid
  await expect(campaignWindow.getByLabel('Files')).toContainText(
    'Files are valid',
  );

  // check that line count is correct
  await expect(campaignWindow.getByLabel('Files')).toContainText('54');

  /////////////////
  // extractions //
  /////////////////

  // navigate to extractions tab
  await campaignWindow.getByRole('tab', {name: 'Extractions'}).click();

  // add new extraction
  await campaignWindow.getByRole('button', {name: 'Add'}).click();

  // expand bands
  await campaignWindow.getByText('Bandsempty').click();

  // add new band
  await campaignWindow
    .getByRole('button')
    .filter({hasText: /^$/})
    .nth(2)
    .click();
  await campaignWindow.getByLabel('Bands').getByRole('textbox').click();
  await campaignWindow.getByLabel('Bands').getByRole('textbox').fill('human');
  await campaignWindow.getByLabel('Bands').getByRole('textbox').press('Enter');

  // validate band status
  await expect(campaignWindow.getByLabel('Bands')).toContainText('1 band');

  // expand integrations
  await campaignWindow.getByText('Integrationsempty').click();

  // add new integration
  await campaignWindow
    .locator(
      '.bp6-section-card.bp6-padded._row_14ovf_1._narrow_14ovf_17._row_or2l4_1 > div > .bp6-button',
    )
    .click();
  await campaignWindow.getByLabel('Integrations').getByRole('textbox').click();
  await campaignWindow
    .getByLabel('Integrations')
    .getByRole('textbox')
    .fill('i15');
  await campaignWindow
    .getByLabel('Integrations')
    .getByRole('textbox')
    .press('Enter');

  // validate integration status
  await expect(campaignWindow.getByLabel('Integrations')).toContainText(
    '1 integration',
  );

  // expand extractors
  await campaignWindow.getByText('Extractorsempty').click();

  // add new extractor
  await campaignWindow
    .locator(
      '.bp6-section-card.bp6-padded._row_14ovf_1._narrow_14ovf_17._row_1dbdu_4 > div > .bp6-button',
    )
    .click();
  await campaignWindow.getByRole('combobox', {name: 'Search...'}).click();
  await campaignWindow
    .getByRole('option', {name: 'BIRDNET'})
    .locator('a')
    .click();
  await campaignWindow.getByLabel('Extractors').getByRole('textbox').click();
  await campaignWindow
    .getByLabel('Extractors')
    .getByRole('textbox')
    .fill('birdnet');
  await campaignWindow
    .getByLabel('Extractors')
    .getByRole('textbox')
    .press('Enter');

  // validate extractors status
  await expect(campaignWindow.getByLabel('Extractors')).toContainText(
    '1 extractor',
  );

  // expand reducers
  await campaignWindow.getByText('Reducersempty').click();

  // add new reducer
  await campaignWindow
    .locator(
      '.bp6-section-card.bp6-padded._row_14ovf_1._narrow_14ovf_17._row_1h9og_1 > div > .bp6-button',
    )
    .click();
  await campaignWindow.getByRole('button', {name: 'UMAP'}).click();
  await campaignWindow.getByRole('menuitem', {name: 'UMAP'}).click();

  // add second reducer
  await campaignWindow
    .locator(
      '.bp6-section-card.bp6-padded._row_14ovf_1._narrow_14ovf_17._row_1h9og_1 > div > .bp6-button',
    )
    .click();

  // check status invalid because of same reducer and dimensions
  await expect(campaignWindow.getByLabel('Reducers')).toContainText(
    'invalid dimensions',
  );

  // change second dimensions to 2
  await campaignWindow.locator('#numericInput-14').click();
  await campaignWindow.locator('#numericInput-14').fill('2');
  await campaignWindow.locator('#numericInput-14').press('Enter');

  // check valid reducer status
  await expect(campaignWindow.getByLabel('Reducers')).toContainText(
    '2 reducers',
  );

  // expand metrics, add one and validate
  await campaignWindow.getByText('Metrics0 metric').click();
  await campaignWindow
    .locator(
      '.bp6-section-card.bp6-padded._row_14ovf_1._narrow_14ovf_17._row_9d0cp_1 > div > .bp6-button',
    )
    .click();
  await expect(campaignWindow.getByLabel('Metrics')).toContainText('1 metric');

  // expand autoclusters, add one and validate
  await campaignWindow.getByText('Autoclusters0 autocluster').click();
  await campaignWindow
    .locator(
      '.bp6-section-card.bp6-padded._row_14ovf_1._narrow_14ovf_17._row_4jy7s_1 > div > .bp6-button',
    )
    .click();
  await expect(campaignWindow.getByLabel('Autoclusters')).toContainText(
    '1 autocluster',
  );

  // expand trajectories, add one and validate
  await campaignWindow.getByText('Trajectories0 trajectory').click();
  await campaignWindow
    .locator(
      '.bp6-section-card.bp6-padded._row_14ovf_1._narrow_14ovf_17._row_1ei34_1 > div > .bp6-button',
    )
    .click();
  await campaignWindow.getByLabel('Trajectories').getByRole('textbox').click();
  await campaignWindow
    .getByLabel('Trajectories')
    .getByRole('textbox')
    .fill('A');
  await campaignWindow
    .getByRole('combobox', {name: 'Search...'})
    .nth(1)
    .click();
  await campaignWindow
    .getByRole('combobox', {name: 'Search...'})
    .nth(1)
    .click();
  await campaignWindow.locator('a').click();
  await campaignWindow
    .getByRole('combobox', {name: 'Search...'})
    .nth(2)
    .click();
  await campaignWindow.locator('a').click();

  const tagNameInput = campaignWindow
    .getByRole('combobox', {name: 'Search...'})
    .nth(1);

  const tagValueInput = campaignWindow
    .getByRole('combobox', {name: 'Search...'})
    .nth(2);

  expect(await tagNameInput.inputValue()).toBe('__SITE');
  expect(await tagValueInput.inputValue()).toBe('__ALL');

  await expect(campaignWindow.getByLabel('Trajectories')).toContainText(
    '1 trajectory',
  );

  // go to export tab to check extractions are valid
  await campaignWindow.getByRole('tab', {name: 'Export'}).click();
  await expect(campaignWindow.getByLabel('Export')).toContainText(
    'Extractions are valid',
  );

  // go back to extractions and import the extraction in default config which has no trajectory configured
  await campaignWindow.getByRole('tab', {name: 'Extractions'}).click();
  await campaignWindow.getByRole('button', {name: 'Import'}).click();
  const filePath = join(
    __dirname,
    '..',
    '..',
    'examples',
    'coral-reef-light.json',
  );
  await campaignWindow
    .getByRole('button', {name: 'Provide existing JSON'})
    .setInputFiles(filePath);
  await campaignWindow.getByText('#0 extraction (VGGISH, LEQ)').click();
  await campaignWindow
    .getByLabel('Import extractors')
    .getByRole('button', {name: 'Import'})
    .click();
  await campaignWindow.getByText('#1 extraction').click();
  await expect(
    campaignWindow.getByLabel('#1 extraction').getByLabel('Trajectories'),
  ).toContainText('0 trajectory');

  // quit
  await main.waitForTimeout(1000);
  await app.close();
});
