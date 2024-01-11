import {existsSync} from 'node:fs';
import path from 'node:path';

import {ipcMain, ipcRenderer} from 'electron';

import {Channels} from '../channels';
import {FrontWindow} from '../windows/FrontWindow';

export class FrontBridge {
  public static servicePath = path.join(
    path.dirname(__dirname),
    '..',
    'front',
    'index.html',
  );

  public constructor() {
    this.validateServicePath();
    this.setHandlers();
  }

  public static async createFromRenderer() {
    await ipcRenderer.invoke(Channels.FrontCreate);
  }

  private validateServicePath() {
    if (!existsSync(FrontBridge.servicePath)) {
      throw new Error('Front service build could not be found');
    }
  }

  private create() {
    new FrontWindow();
  }

  private setHandlers() {
    this.setCreateHandler();
  }

  private setCreateHandler() {
    ipcMain.handle(Channels.FrontCreate, this.create);
  }
}
