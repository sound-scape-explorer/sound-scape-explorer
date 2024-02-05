import {BrowserWindow} from 'electron';

import {APP_SHORT} from '../constants';
import {VERSION} from '../version';

export abstract class ElectronWindow {
  public static readonly iconPath: string = '../assets/icon';

  protected window: Electron.BrowserWindow;

  protected storagePath: string | undefined;

  protected constructor(preferences: Electron.WebPreferences) {
    this.window = new BrowserWindow({
      width: 800,
      height: 600,
      icon: `${ElectronWindow.iconPath}.png`,
      webPreferences: {...preferences},
    });

    this.load().then(() => {
      if (this.isDev) {
        this.openDevTools();
      }

      this.appendTitle();

      if (this.storagePath) {
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        params.set('storagePath', this.storagePath);
        url.search = params.toString();
        window.history.pushState({}, '', url);
      }
    });
  }

  private get isDev() {
    return process.env?.NODE_ENV === 'development';
  }

  abstract load(): Promise<void>;

  private openDevTools() {
    this.window.webContents.openDevTools();
  }

  private appendTitle() {
    const title = this.window.title;
    const suffix = `(${APP_SHORT} ${VERSION})`;
    this.window.setTitle(`${title} ${suffix}`);
  }
}
