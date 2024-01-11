import {AudioStopButton} from './AudioStopButton';
import {VisualiseButton} from './VisualiseButton';

export class LoadedZone {
  private node = document.getElementById('loaded-zone');

  private audioStopButton: AudioStopButton;

  private visualiseButton: VisualiseButton;

  public constructor() {
    this.audioStopButton = new AudioStopButton();
    this.visualiseButton = new VisualiseButton();
  }

  public hide() {
    this.node.style.display = 'none';
  }

  public show() {
    this.node.style.display = 'block';
  }
}
