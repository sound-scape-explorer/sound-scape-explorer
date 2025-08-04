import {REFS} from 'src/renderer/constants';

const node = REFS.CAMPAIGN_BUTTON;

export class CampaignModuleController {
  public render() {
    this.attachClick();
  }

  private attachClick() {
    node.addEventListener('click', async () => {
      await window.electronAPI.createCampaignWindow();
    });
  }
}
