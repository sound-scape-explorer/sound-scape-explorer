import {FrontBridge} from '../bridges/FrontBridge';
import {DEV_FRONT_URL} from '../constants';
import {ElectronWindow} from './ElectronWindow';

export class FrontWindow extends ElectronWindow {
  public constructor() {
    super({});
  }

  public async load() {
    if (this.isDev) {
      await this.window.loadURL(DEV_FRONT_URL);
      return;
    }

    await this.window.loadFile(FrontBridge.servicePath);
  }
}
