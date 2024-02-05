import {ipcMain, ipcRenderer} from 'electron';

import {Channels} from '../channels';

export class StorageBridge {
  private path: string;

  public constructor() {
    this.path = null;
    this.setHandlers();
  }

  public static async getFromRenderer() {
    return (await ipcRenderer.invoke(Channels.StorageGet)) as string;
  }

  public static async setFromRenderer(storagePath: string) {
    await ipcRenderer.invoke(Channels.StorageSet, [storagePath]);
  }

  public getPath() {
    return this.path;
  }

  private setHandlers() {
    this.setSetHandler();
    this.setGetHandler();
  }

  private setSetHandler() {
    ipcMain.handle(Channels.StorageSet, (_, [storagePath]: [string]) => {
      this.path = storagePath;
    });
  }

  private setGetHandler() {
    ipcMain.handle(Channels.StorageGet, this.getPath.bind(this));
  }
}
