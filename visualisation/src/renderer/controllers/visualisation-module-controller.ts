import {REFS} from 'src/renderer/constants';

const node = REFS.VISUALISATION_BUTTON;

export class VisualisationModuleController {
  public constructor() {
    this.attachClick();
  }

  private attachClick() {
    node.addEventListener('click', async () => {
      if (node.disabled) {
        return;
      }

      await window.electronAPI.createFrontWindow();
    });
  }
}
