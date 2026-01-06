import {ipcMain} from 'electron';

import {Channels} from '../channels';

let storagePath: string | null = null;

export class StorageBridge {
  public constructor() {
    this.setGetter();
    this.setSetter();
  }

  private setSetter() {
    ipcMain.handle(Channels.STORAGE_SET, (_e, path: string) => {
      storagePath = path;
    });
  }

  private setGetter() {
    ipcMain.handle(Channels.STORAGE_GET, () => {
      return storagePath;
    });
  }
}
