import semver from 'semver';
import {VersionStatusView} from 'src/renderer/views/version-status-view';
import {VersionTitleView} from 'src/renderer/views/version-title-view';
import {VERSION} from 'src/version';

export class VersionStatusController {
  private title: VersionTitleView;

  private status: VersionStatusView;

  public constructor() {
    this.title = new VersionTitleView();
    this.status = new VersionStatusView();
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

      this.title.update({upstreamVersion, currentVersion});

      if (isOutdated) {
        this.status.showOutdated(upstreamVersion);
        return;
      }

      this.status.showUpToDate();
    } catch {
      this.status.showNoConnection();
    }
  }
}
