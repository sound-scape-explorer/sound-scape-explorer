import {expect, test} from '@playwright/test';

import {loadAndSelectView, readDownloadAsCsvContent} from './_shared';

test('scatter export', async ({page}) => {
  await loadAndSelectView(page);

  // click on csv export
  const downloadPromise = page.waitForEvent('download');
  await page.locator('div:nth-child(4) > a:nth-child(3)').click();
  const download = await downloadPromise;
  const csvContent = await readDownloadAsCsvContent(download);

  // count lines
  const lines = csvContent.trim().split('\n');
  expect(lines.length).toBe(216 + 1);

  // check that we have all columns
  const columns =
    'intervalIndex,start,end,site,tag___SITE,tag_AUTOCLUSTER_0,tag_AUTOCLUSTER_1,tag_LOCATION,tag_YEAR,tag_REPLICA,tag_SNAP,tag_DEPTH,tag_GEOMORPH,tag_SUBSTRATE,tag_PERIOD,tag_BOAT,tag_RAIN,tag_SONAR,tag_ABUNDANCE,tag_RICHNESS,tag_ABVOCAL,tag_RVOCAL,tag_LOCATION+YEAR+REPLICA,red_0,red_1,red_2,emb_0,emb_1,emb_2,emb_3,emb_4,emb_5,emb_6,emb_7,emb_8,emb_9,emb_10,emb_11,emb_12,emb_13,emb_14,emb_15,emb_16,emb_17,emb_18,emb_19,emb_20,emb_21,emb_22,emb_23,emb_24,emb_25,emb_26,emb_27,emb_28,emb_29,emb_30,emb_31,emb_32,emb_33,emb_34,emb_35,emb_36,emb_37,emb_38,emb_39,emb_40,emb_41,emb_42,emb_43,emb_44,emb_45,emb_46,emb_47,emb_48,emb_49,emb_50,emb_51,emb_52,emb_53,emb_54,emb_55,emb_56,emb_57,emb_58,emb_59,emb_60,emb_61,emb_62,emb_63,emb_64,emb_65,emb_66,emb_67,emb_68,emb_69,emb_70,emb_71,emb_72,emb_73,emb_74,emb_75,emb_76,emb_77,emb_78,emb_79,emb_80,emb_81,emb_82,emb_83,emb_84,emb_85,emb_86,emb_87,emb_88,emb_89,emb_90,emb_91,emb_92,emb_93,emb_94,emb_95,emb_96,emb_97,emb_98,emb_99,emb_100,emb_101,emb_102,emb_103,emb_104,emb_105,emb_106,emb_107,emb_108,emb_109,emb_110,emb_111,emb_112,emb_113,emb_114,emb_115,emb_116,emb_117,emb_118,emb_119,emb_120,emb_121,emb_122,emb_123,emb_124,emb_125,emb_126,emb_127';
  expect(lines[0].trim()).toBe(columns);
});

test('silhouette export', async ({page}) => {
  await loadAndSelectView(page);

  // open heatmap menu
  await page.locator('div:nth-child(7) > .n-button').click();

  // open metric dropdown
  await page
    .locator('div')
    .filter({hasText: /^Metric\.\.\.$/})
    .nth(4)
    .click();

  // select silhouette
  await page.getByText('- SILHOUETTE').click();

  // open tag dropdown
  await page
    .locator('div')
    .filter({hasText: /^Label A\.\.\.$/})
    .nth(4)
    .click();

  // select AUTOCLUSTER_0
  await page.getByText('AUTOCLUSTER_0').nth(1).click();

  // click on csv export
  const downloadPromise = page.waitForEvent('download');
  await page.locator('._plot_1b5ec_13 > div:nth-child(2) > .n-button').click();
  const download = await downloadPromise;
  const csvContent = await readDownloadAsCsvContent(download);

  // check line count
  const lines = csvContent.trim().split('\n');
  expect(lines.length).toBe(5 + 1);

  // check col names
  const columns =
    'SILHOUETTE,AUTOCLUSTER_0: -1,AUTOCLUSTER_0: 0,AUTOCLUSTER_0: 1,AUTOCLUSTER_0: 2,AUTOCLUSTER_0: 3';
  expect(lines[0].trim()).toBe(columns);
});

test('temporal export', async ({page}) => {
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
  await page.getByText('1 - Leq').click();

  await page.waitForTimeout(2000);

  // download
  const downloadPromise = page.waitForEvent('download');
  await page.locator('._row_1pxym_1 > div:nth-child(2) > .n-button').click();
  const download = await downloadPromise;

  const csvContent = await readDownloadAsCsvContent(download);

  // check line count
  const lines = csvContent.trim().split('\n');
  expect(lines.length).toBe(216 + 1);

  // check col names
  const columns = 'intervalIndex,site,timestamp,scalar';
  expect(lines[0].trim()).toBe(columns);
});
