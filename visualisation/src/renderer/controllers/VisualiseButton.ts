export class VisualiseButton {
  private readonly node = document.getElementById('visualise-button');

  public constructor() {
    this.attachClick();
  }

  private attachClick() {
    this.node.addEventListener('click', async () => {
      await window.electronAPI.createFrontWindow();
    });
  }
}
