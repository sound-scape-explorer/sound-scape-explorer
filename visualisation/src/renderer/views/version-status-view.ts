import {REFS} from 'src/renderer/constants';
import {AbstractStatusView} from 'src/renderer/views/abstract-status-view';

const node = REFS.VERSION_STATUS;
const bulmaHoverableClass = 'is-hoverable';

export class VersionStatusView extends AbstractStatusView {
  private upstreamVersion: string | null;

  public constructor() {
    super(node);
    this.upstreamVersion = null;
  }

  public showUpToDate() {
    this.renderSuccess();
    node.classList.remove(bulmaHoverableClass);
    node.removeEventListener('click', this.handleClick.bind(this));
    node.textContent = 'Up to date';
  }

  public showOutdated(upstreamVersion: string) {
    this.upstreamVersion = upstreamVersion;
    this.renderError();
    node.classList.add(bulmaHoverableClass);
    node.addEventListener('click', this.handleClick.bind(this));
    node.textContent = `${this.upstreamVersion} available`;
  }

  public showNoConnection() {
    this.renderWarning();
    node.textContent = 'No internet';
  }

  private handleClick() {
    window.open(
      `https://github.com/sound-scape-explorer/sound-scape-explorer/releases/tag/v${this.upstreamVersion}`,
    );
  }
}
