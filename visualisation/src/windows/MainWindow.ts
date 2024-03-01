import path from 'path';

import {ElectronWindow} from './ElectronWindow';

export class MainWindow extends ElectronWindow {
  public constructor() {
    super({
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    });
  }

  public async load() {
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
      await this.window.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
      return;
    }

    await this.window.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }
}
