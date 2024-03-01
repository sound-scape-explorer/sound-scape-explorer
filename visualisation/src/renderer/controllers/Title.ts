import {APP_LONG, APP_SHORT} from '../../constants';
import {VERSION} from '../../version';

export class Title {
  private node = document.getElementById('title');

  public constructor() {
    this.populate();
  }

  private populate() {
    document.title = APP_LONG;
    this.node.textContent = `Welcome to ${APP_SHORT} ${VERSION}`;
  }
}
