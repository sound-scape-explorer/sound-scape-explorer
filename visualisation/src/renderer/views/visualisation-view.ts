import {REFS} from 'src/renderer/constants';

const button = REFS.VISUALISATION_BUTTON;

export class VisualisationView {
  public render({isAudioRunning = false}) {
    if (isAudioRunning) {
      button.disabled = false;
      return;
    }

    button.disabled = true;
  }
}
