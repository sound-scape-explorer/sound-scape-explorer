import {Button, Section} from '@blueprintjs/core';
import {SectionCard} from '@blueprintjs/core/lib/esnext';
import {Help} from '@blueprintjs/icons';
import {ICON_SIZE} from '@shared/constants';
import {SettingsComputationsDrawerContent} from 'src/panels/settings/settings-computations-drawer-content.tsx';
import {SettingsPanelComputationDimensions} from 'src/panels/settings/settings-panel-computation-dimensions.tsx';
import {SettingsPanelComputationIterations} from 'src/panels/settings/settings-panel-computation-iterations.tsx';
import {SettingsPanelComputationStrategy} from 'src/panels/settings/settings-panel-computation-strategy.tsx';
import {Drawer} from 'src/primitives/drawer.tsx';

export function SettingsComputations() {
  return (
    <Section
      title="Computations"
      compact
      collapsible
      collapseProps={{defaultIsOpen: false}}
      rightElement={
        <Drawer content={<SettingsComputationsDrawerContent />}>
          <Button icon={<Help size={ICON_SIZE} />} />
        </Drawer>
      }
    >
      <SectionCard className="flex column gap">
        <SettingsPanelComputationStrategy />
        <SettingsPanelComputationDimensions />
        <SettingsPanelComputationIterations />
      </SectionCard>
    </Section>
  );
}
