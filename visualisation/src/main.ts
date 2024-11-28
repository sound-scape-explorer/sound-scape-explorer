import {app, BrowserWindow} from 'electron';
import {CampaignBridge} from 'src/bridges/CampaignBridge';

import {AudioBridge} from './bridges/AudioBridge';
import {FrontBridge} from './bridges/FrontBridge';
import {MainWindow} from './windows/MainWindow';

let mainWindow: MainWindow | null = null;
const isSingleInstance = app.requestSingleInstanceLock();

if (!isSingleInstance) {
  app.quit();
} else {
  const audioBridge = new AudioBridge();
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  const frontBridge = new FrontBridge();
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  const campaignBridge = new CampaignBridge();

  // Handle creating/removing shortcuts on Windows when installing/uninstalling.
  if (require('electron-squirrel-startup')) {
    app.quit();
  }

  app.on('second-instance', () => {
    if (mainWindow === null) {
      return;
    }

    mainWindow.focus();
  });

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', () => {
    mainWindow = new MainWindow();
  });

  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  app.on('window-all-closed', () => {
    audioBridge.stop();

    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      mainWindow = new MainWindow();
    }
  });

  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and import them here.
}
