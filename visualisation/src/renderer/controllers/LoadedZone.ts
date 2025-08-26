import {CampaignButtonOld} from 'src/renderer/controllers/campaign-button-old';
import {VisualisationModuleController} from 'src/renderer/controllers/visualisation-module-controller';

import {AudioPath} from './AudioPath';
import {AudioStopButton} from './AudioStopButton';

// todo: remove
export class LoadedZone {
  private readonly node = document.getElementById('loaded-zone');

  private readonly audioStopButton: AudioStopButton;

  private readonly visualiseButton: VisualisationModuleController;

  private readonly campaignButton: CampaignButtonOld;

  private readonly audioPath: AudioPath;

  public constructor() {
    this.audioStopButton = new AudioStopButton();
    this.visualiseButton = new VisualisationModuleController();
    this.campaignButton = new CampaignButtonOld();
    this.audioPath = new AudioPath();
  }

  public hide() {
    this.node.style.display = 'none';
  }

  public show(audioPath: string) {
    this.node.style.display = 'block';
    this.audioPath.render(audioPath);
  }
}
