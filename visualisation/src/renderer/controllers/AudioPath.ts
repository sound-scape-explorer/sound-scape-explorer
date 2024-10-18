export class AudioPath {
  private node = document.getElementById('audio-path');

  private span = this.node.querySelector('span');

  public render(path: string) {
    this.span.innerText = path;
  }
}
