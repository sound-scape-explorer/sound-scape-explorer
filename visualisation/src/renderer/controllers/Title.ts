import {APP_LONG, APP_SHORT} from 'src/constants';
import {VERSION} from 'src/version';

export class Title {
  private readonly node = document.getElementById('title');

  public constructor() {
    this.populate();
  }

  private populate() {
    document.title = APP_LONG;
    this.node.textContent = `Welcome to ${APP_SHORT} ${VERSION}`;
  }
}
