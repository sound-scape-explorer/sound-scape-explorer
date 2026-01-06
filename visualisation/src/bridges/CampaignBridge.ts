import {existsSync} from 'node:fs';
import path from 'node:path';

import {ipcMain, ipcRenderer} from 'electron';

import {Channels} from '../channels';
import {CampaignWindow} from '../windows/CampaignWindow';

export class CampaignBridge {
  public static readonly servicePath = path.join(
    path.dirname(__dirname),
    '..',
    'campaign',
    'index.html',
  );

  public constructor() {
    this.validateServicePath();
    this.setHandlers();
  }

  public static async createFromRenderer() {
    await ipcRenderer.invoke(Channels.CAMPAIGN_CREATE);
  }

  private validateServicePath() {
    if (!existsSync(CampaignBridge.servicePath)) {
      throw new Error('Campaign service build could not be found');
    }
  }

  private create() {
    return new CampaignWindow();
  }

  private setHandlers() {
    this.setCreateHandler();
  }

  private setCreateHandler() {
    ipcMain.handle(Channels.CAMPAIGN_CREATE, this.create.bind(this));
  }
}
