import {REFS} from 'src/renderer/constants';
import {AbstractStatusView} from 'src/renderer/views/abstract-status-view';

const node = REFS.VERSION_STATUS;

export class VersionStatusView extends AbstractStatusView {
  public constructor() {
    super(node);
  }

  public showUpToDate() {
    this.renderSuccess();
    node.textContent = 'Up to date';
  }

  public showOutdated(upstreamVersion: string) {
    this.renderError();
    node.textContent = `${upstreamVersion} available`;
  }

  public showNoConnection() {
    this.renderWarning();
    node.textContent = 'No internet';
  }
}
