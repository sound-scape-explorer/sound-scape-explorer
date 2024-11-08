export class AudioPath {
  private readonly node = document.getElementById('audio-path');

  private readonly span = this.node.querySelector('span');

  public render(path: string) {
    this.span.innerText = path;
  }
}
