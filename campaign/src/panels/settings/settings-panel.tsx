import {Card} from '@blueprintjs/core';
import {SettingsCallout} from 'src/components/settings-callout.tsx';
import {SettingsRanges} from 'src/panels/metrics/components/settings-ranges.tsx';
import {SettingsComputations} from 'src/panels/settings/settings-computations.tsx';
import {SettingsGlobal} from 'src/panels/settings/settings-global.tsx';
import {SettingsOptional} from 'src/panels/settings/settings-optional.tsx';

export function SettingsPanel() {
  return (
    <Card className="flex column gap">
      <SettingsCallout />
      <SettingsGlobal />
      <SettingsOptional />
      <SettingsComputations />
      <SettingsRanges />
    </Card>
  );
}
