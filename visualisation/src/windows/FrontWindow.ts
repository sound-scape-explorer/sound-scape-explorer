import {FrontBridge} from '../bridges/FrontBridge';
import {ElectronWindow} from './ElectronWindow';

export class FrontWindow extends ElectronWindow {
  public constructor() {
    super({});
  }

  public async load() {
    await this.window.loadFile(FrontBridge.servicePath);
  }
}
