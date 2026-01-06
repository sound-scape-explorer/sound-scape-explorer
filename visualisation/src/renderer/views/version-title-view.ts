import {REFS} from 'src/renderer/constants';
import {AbstractStatusView} from 'src/renderer/views/abstract-status-view';

const node = REFS.VERSION_TITLE;

interface UpdateProps {
  upstreamVersion: string;
  currentVersion: string;
}

export class VersionTitleView extends AbstractStatusView {
  public constructor() {
    super(node);
  }

  public update(props: UpdateProps) {
    node.textContent = `Version ${props.currentVersion} (upstream ${props.upstreamVersion})`;
  }
}
