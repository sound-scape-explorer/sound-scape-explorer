import {Section} from '@blueprintjs/core';
import {SectionCard} from '@blueprintjs/core/lib/esnext';
import {SettingsComputationsDrawerContent} from 'src/panels/settings/settings-computations-drawer-content.tsx';
import {SettingsPanelComputationDimensions} from 'src/panels/settings/settings-panel-computation-dimensions.tsx';
import {SettingsPanelComputationIterations} from 'src/panels/settings/settings-panel-computation-iterations.tsx';
import {SettingsPanelComputationStrategy} from 'src/panels/settings/settings-panel-computation-strategy.tsx';
import {HelpDrawer} from 'src/primitives/help-drawer.tsx';

export function SettingsComputations() {
  return (
    <Section
      title="Computations"
      compact
      collapsible
      collapseProps={{defaultIsOpen: false}}
      rightElement={
        <HelpDrawer>
          <SettingsComputationsDrawerContent />
        </HelpDrawer>
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
