import {Section} from '@blueprintjs/core';
import {SectionCard} from '@blueprintjs/core/lib/esnext';
import {SettingsPanelAudioPath} from 'src/panels/settings/settings-panel-audio-path.tsx';
import {SettingsPanelSampleRate} from 'src/panels/settings/settings-panel-sample-rate.tsx';
import {SettingsPanelStoragePath} from 'src/panels/settings/settings-panel-storage-path.tsx';
import {SettingsPanelTimelineOrigin} from 'src/panels/settings/settings-panel-timeline-origin.tsx';

export function SettingsGlobal() {
  return (
    <Section compact>
      <SectionCard className="flex column gap">
        <SettingsPanelStoragePath />
        <SettingsPanelAudioPath />
        <SettingsPanelSampleRate />
        <SettingsPanelTimelineOrigin />
      </SectionCard>
    </Section>
  );
}
