import {REFS} from 'src/renderer/constants';
import {AbstractStatusView} from 'src/renderer/views/abstract-status-view';

const node = REFS.AUDIO_STATUS;

export class AudioStatusView extends AbstractStatusView {
  public constructor() {
    super(node);
  }

  public render({isAudioRunning = false}) {
    if (isAudioRunning) {
      this.renderSuccess();
      node.textContent = 'Running';
      return;
    }

    this.renderError();
    node.textContent = 'Stopped';
  }
}
