import {BrowserWindow} from 'electron';

import {APP_SHORT} from '../constants';
import {VERSION} from '../version';

export abstract class ElectronWindow {
  public static readonly iconPath: string = '../assets/icon';

  protected window: Electron.BrowserWindow;

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
    });
  }

  private get isDev() {
    return process.env?.NODE_ENV === 'development';
  }

  abstract load(): Promise<void>;

  public focus() {
    if (this.window.isMinimized()) {
      this.window.restore();
    }

    this.window.focus();
  }

  private openDevTools() {
    this.window.webContents.openDevTools();
  }

  private appendTitle() {
    const title = this.window.title;
    const suffix = `(${APP_SHORT} ${VERSION})`;
    this.window.setTitle(`${title} ${suffix}`);
  }
}
