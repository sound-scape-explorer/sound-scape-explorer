import {Card} from '@blueprintjs/core';
import {SettingsCallout} from 'src/components/settings-callout.tsx';
import {SettingsPanelAudioHost} from 'src/panels/settings/settings-panel-audio-host.tsx';
import {SettingsPanelAudioPath} from 'src/panels/settings/settings-panel-audio-path.tsx';
import {SettingsPanelComputationDimensions} from 'src/panels/settings/settings-panel-computation-dimensions.tsx';
import {SettingsPanelComputationIterations} from 'src/panels/settings/settings-panel-computation-iterations.tsx';
import {SettingsPanelComputationStrategy} from 'src/panels/settings/settings-panel-computation-strategy.tsx';
import {SettingsPanelDisplaySeed} from 'src/panels/settings/settings-panel-display-seed.tsx';
import {SettingsPanelMemoryLimit} from 'src/panels/settings/settings-panel-memory-limit.tsx';
import {SettingsPanelSampleRate} from 'src/panels/settings/settings-panel-sample-rate.tsx';
import {SettingsPanelStoragePath} from 'src/panels/settings/settings-panel-storage-path.tsx';
import {SettingsPanelTimelineOrigin} from 'src/panels/settings/settings-panel-timeline-origin.tsx';
import {SettingsPanelTimezone} from 'src/panels/settings/settings-panel-timezone.tsx';

export function SettingsPanel() {
  return (
    <Card className="flex column gap">
      <SettingsCallout />
      <SettingsPanelStoragePath />
      <SettingsPanelAudioPath />
      <SettingsPanelSampleRate />
      <SettingsPanelTimelineOrigin />
      <SettingsPanelAudioHost />
      <SettingsPanelTimezone />
      <SettingsPanelComputationStrategy />
      <SettingsPanelComputationDimensions />
      <SettingsPanelComputationIterations />
      <SettingsPanelDisplaySeed />
      <SettingsPanelMemoryLimit />
    </Card>
  );
}
