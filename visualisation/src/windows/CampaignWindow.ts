import path from 'path';

import {CampaignBridge} from '../bridges/CampaignBridge';
import {DEV_CAMPAIGN_URL} from '../constants';
import {ElectronWindow} from './ElectronWindow';

export class CampaignWindow extends ElectronWindow {
  public constructor() {
    super({
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    });
  }

  public async load() {
    if (this.isDev) {
      await this.window.loadURL(DEV_CAMPAIGN_URL);
      return;
    }

    await this.window.loadFile(CampaignBridge.servicePath);
  }
}
