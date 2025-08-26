import {render} from '../renderer';

// todo: remove
export class AudioStopButton {
  private readonly node = document.getElementById('audio-stop-button');

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
