import {CampaignButton} from 'src/renderer/controllers/CampaignButton';

import {AudioPath} from './AudioPath';
import {AudioStopButton} from './AudioStopButton';
import {VisualiseButton} from './VisualiseButton';

export class LoadedZone {
  private readonly node = document.getElementById('loaded-zone');

  private readonly audioStopButton: AudioStopButton;

  private readonly visualiseButton: VisualiseButton;

  private readonly campaignButton: CampaignButton;

  private readonly audioPath: AudioPath;

  public constructor() {
    this.audioStopButton = new AudioStopButton();
    this.visualiseButton = new VisualiseButton();
    this.campaignButton = new CampaignButton();
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
