export class CampaignButton {
  private readonly node = document.getElementById('campaign-button');

  public constructor() {
    this.attachClick();
  }

  private attachClick() {
    this.node.addEventListener('click', async () => {
      await window.electronAPI.createCampaignWindow();
    });
  }
}
