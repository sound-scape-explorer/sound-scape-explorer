export class VisualiseButton {
  private node = document.getElementById('visualise-button');

  public constructor() {
    this.attachClick();
  }

  private attachClick() {
    this.node.addEventListener('click', async () => {
      await window.electronAPI.createFrontWindow();
    });
  }
}
