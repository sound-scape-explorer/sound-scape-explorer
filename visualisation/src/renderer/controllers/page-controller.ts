import {APP_LONG, APP_SHORT} from 'src/constants';
import {REFS} from 'src/renderer/constants';
import {VERSION} from 'src/version';

const title = REFS.HEADER;
const version = REFS.VERSION;

export class PageController {
  public render() {
    this.renderHeader();
    this.renderTitle();
    this.renderVersion();
  }

  private renderHeader() {
    document.title = `${APP_SHORT} ${VERSION}`;
  }

  private renderTitle() {
    title.textContent = `Welcome to ${APP_LONG}`;
  }

  private renderVersion() {
    version.textContent = `${VERSION}`;
  }
}
