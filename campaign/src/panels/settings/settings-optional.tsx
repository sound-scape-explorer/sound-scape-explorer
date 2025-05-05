import {Section} from '@blueprintjs/core';
import {SectionCard} from '@blueprintjs/core/lib/esnext';
import {SettingsPanelAudioHost} from 'src/panels/settings/settings-panel-audio-host.tsx';
import {SettingsPanelDisplaySeed} from 'src/panels/settings/settings-panel-display-seed.tsx';
import {SettingsPanelMemoryLimit} from 'src/panels/settings/settings-panel-memory-limit.tsx';
import {SettingsPanelTimezone} from 'src/panels/settings/settings-panel-timezone.tsx';

export function SettingsOptional() {
  return (
    <Section
      title="Optional"
      compact
      collapsible
      collapseProps={{defaultIsOpen: false}}
    >
      <SectionCard className="flex column gap">
        <SettingsPanelAudioHost />
        <SettingsPanelTimezone />
        <SettingsPanelDisplaySeed />
        <SettingsPanelMemoryLimit />
      </SectionCard>
    </Section>
  );
}
