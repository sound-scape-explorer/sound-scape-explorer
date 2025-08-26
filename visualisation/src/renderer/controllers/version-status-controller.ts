import semver from 'semver';
import {VersionStatusView} from 'src/renderer/views/version-status-view';
import {VERSION} from 'src/version';

export class VersionStatusController {
  private view: VersionStatusView;

  public constructor() {
    this.view = new VersionStatusView();
  }

  public async render() {
    try {
      const owner = 'sound-scape-explorer';
      const repo = owner;
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/releases/latest`,
        {
          headers: {
            Accept: 'application/vnd.github+json',
          },
        },
      );

      const release: {tag_name: string} = await response.json();

      const upstreamVersion = semver.valid(release.tag_name);
      const currentVersion = semver.valid(VERSION);
      const isOutdated = semver.lt(currentVersion, upstreamVersion);

      if (isOutdated) {
        this.view.showOutdated(upstreamVersion);
        return;
      }

      this.view.showUpToDate();
    } catch {
      this.view.showNoConnection();
    }
  }
}
