import {FrontBridge} from '../bridges/FrontBridge';
import {ElectronWindow} from './ElectronWindow';

export class FrontWindow extends ElectronWindow {
  public constructor(storagePath: string) {
    super({});

    this.storagePath = storagePath;
  }

  public async load() {
    await this.window.loadFile(FrontBridge.servicePath);
  }
}
