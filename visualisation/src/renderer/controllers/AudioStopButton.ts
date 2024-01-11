import {render} from '../renderer';

export class AudioStopButton {
  private node = document.getElementById('audio-stop-button');

  public constructor() {
    this.attachClick();
  }

  private attachClick() {
    this.node.addEventListener('click', async () => {
      await window.electronAPI.stopAudioService();
      await render();
    });
  }
}
