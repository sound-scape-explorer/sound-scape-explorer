import {
  Alignment,
  Card,
  Icon,
  Navbar,
  NavbarGroup,
  NavbarHeading,
  Section,
  Tab,
  TabPanel,
  Tabs,
} from '@blueprintjs/core';
import {Flash, Moon} from '@blueprintjs/icons';
import clsx from 'clsx';
import {Toaster} from 'src/components/toaster.tsx';
import {usePanels} from 'src/hooks/use-panels.tsx';
import {type TabIndex, useTabNavigation} from 'src/hooks/use-tab-navigation.ts';
import {useTheme} from 'src/hooks/use-theme.ts';
import {useTableLoader} from 'src/panels/files/hooks/use-table-loader.ts';

import styles from './default-layout.module.scss';

export function DefaultLayout() {
  const {isDark, toggle} = useTheme();
  const {isLoaded} = useTableLoader();
  const {index, setIndex} = useTabNavigation();
  const {current} = usePanels();

  return (
    <Section className={clsx(styles.container, isDark && 'bp5-dark')}>
      <Toaster />

      <Card>
        <Navbar>
          <NavbarGroup>
            <NavbarHeading
              className="hover"
              onClick={toggle}
            >
              <Icon icon={isDark ? <Moon /> : <Flash />} />
            </NavbarHeading>
          </NavbarGroup>
          <NavbarGroup
            className={styles.navbar}
            align={Alignment.END}
          >
            <Tabs
              id="tabs"
              selectedTabId={index}
              onChange={(newIndex) => setIndex(newIndex as TabIndex)}
              fill
            >
              <Tab
                id="import"
                title="Import"
                disabled={isLoaded}
              />
              <Tab
                id="files"
                title="Files"
                disabled={!isLoaded}
              />
              <Tab
                id="settings"
                title="Settings"
                disabled={!isLoaded}
              />
              <Tab
                id="config"
                title="Config"
                disabled={!isLoaded}
              />
              <Tab
                id="metrics"
                title="Metrics"
                disabled={!isLoaded}
              />
              <Tab
                id="export"
                title="Export"
                disabled={!isLoaded}
              />
            </Tabs>
          </NavbarGroup>
        </Navbar>

        <TabPanel
          id={index}
          selectedTabId={index}
          parentId="tabs"
          panel={current}
        />
      </Card>
    </Section>
  );
}
