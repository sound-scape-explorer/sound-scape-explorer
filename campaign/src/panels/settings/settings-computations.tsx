import {Section, SectionCard} from '@blueprintjs/core';
import {SettingsComputationsDimensions} from 'src/panels/settings/settings-computations-dimensions.tsx';
import {SettingsComputationsDrawerContent} from 'src/panels/settings/settings-computations-drawer-content.tsx';
import {SettingsComputationsIterations} from 'src/panels/settings/settings-computations-iterations.tsx';
import {SettingsComputationsStrategy} from 'src/panels/settings/settings-computations-strategy.tsx';
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
        <SettingsComputationsStrategy />
        <SettingsComputationsDimensions />
        <SettingsComputationsIterations />
      </SectionCard>
    </Section>
  );
}
