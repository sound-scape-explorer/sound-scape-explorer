import {test, expect} from '@playwright/test';
import {join} from 'path';
import {startElectron} from './_shared';

test('campaign window', async () => {
  const {app, main} = await startElectron();

  // open configuration window
  await main.click('text=CONFIGURE');
  await main.waitForTimeout(1000);

  // check configuration window existence
  expect(app.windows().length).toBe(2);
  const secondWindow = app.windows()[1];
  expect(await secondWindow.title()).toContain('SSE Campaign');
  await main.waitForTimeout(1000);

  // quit
  await app.close();
});

test('audio engine into visualisation window', async () => {
  const {app, main} = await startElectron();

  // fill audio path
  const audioPath = join(__dirname, '..', '..', 'examples', 'audio');
  await main.fill('id=sse-audio-text-input', audioPath);
  await main.waitForTimeout(1000);

  // check audio engine status
  expect(await main.textContent('id=sse-audio-status')).toBe('Stopped');

  // start audio engine
  await main.click('text=START');
  await main.waitForTimeout(1000);

  // check audio engine status
  expect(await main.textContent('id=sse-audio-status')).toBe('Running');

  // open exploration window
  await main.click('id=sse-visualisation-button');
  await main.waitForTimeout(1000);

  // check exploration window existence
  expect(app.windows().length).toBe(2);
  const secondWindow = app.windows()[1];
  expect(await secondWindow.title()).toContain('SoundScapeExplorer');
  await main.waitForTimeout(1000);

  // close second window and stop audio engine
  await secondWindow.close();
  await main.click('id=sse-audio-stop-button');
  await main.waitForTimeout(1000);

  // check audio engine stopped
  expect(await main.textContent('id=sse-audio-status')).toBe('Stopped');
  await main.waitForTimeout(1000);

  // quit
  await app.close();
});
