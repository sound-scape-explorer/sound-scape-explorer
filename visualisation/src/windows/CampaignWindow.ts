import path from 'path';
import {CampaignBridge} from 'src/bridges/CampaignBridge';

import {ElectronWindow} from './ElectronWindow';

export class CampaignWindow extends ElectronWindow {
  public constructor() {
    super({
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    });
  }

  public async load() {
    await this.window.loadFile(CampaignBridge.servicePath);
  }
}
