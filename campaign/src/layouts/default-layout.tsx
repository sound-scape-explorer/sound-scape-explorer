import 'react-tabs/style/react-tabs.css';
import 'react-toastify/dist/ReactToastify.css';

import {
  Alignment,
  Card,
  Navbar,
  NavbarGroup,
  NavbarHeading,
  Tab,
  TabPanel,
  Tabs,
} from '@blueprintjs/core';
import {useAtom, useAtomValue} from 'jotai';
import {useMemo} from 'react';
import {ToastContainer} from 'react-toastify';
import {importFilesAtom, tabIndexAtom} from 'src/atoms.ts';
import {ConfigPanel} from 'src/panels/config/config-panel';
import {useConfigValidation} from 'src/panels/config/hooks/use-config-validation.ts';
import {ExportPanel} from 'src/panels/export-panel';
import {FilesPanel} from 'src/panels/files/files-panel';
import {ImportPanel} from 'src/panels/import-panel';
import {MetricsPanel} from 'src/panels/metrics/metrics-panel';
import {SettingsPanel} from 'src/panels/settings/settings-panel';
import {type TabIndex} from 'src/types.ts';

export function DefaultLayout() {
  const [tabIndex, setTabIndex] = useAtom(tabIndexAtom);
  const files = useAtomValue(importFilesAtom);
  const hasFiles = useMemo(() => files.length > 0, [files]);
  const {isValid} = useConfigValidation();

  const panel = useMemo(() => {
    switch (tabIndex) {
      case 'import': {
        return <ImportPanel />;
      }
      case 'files': {
        return <FilesPanel />;
      }
      case 'settings': {
        return <SettingsPanel />;
      }
      case 'config': {
        return <ConfigPanel />;
      }
      case 'metrics': {
        return <MetricsPanel />;
      }
      case 'export': {
        return <ExportPanel />;
      }
      default: {
        return <ImportPanel />;
      }
    }
  }, [tabIndex]);

  return (
    <>
      {/* TODO: Replace with blueprintjs toaster */}
      <ToastContainer />

      <Card>
        <Navbar>
          <NavbarGroup>
            <NavbarHeading>{tabIndex}</NavbarHeading>
          </NavbarGroup>
          <NavbarGroup align={Alignment.END}>
            <Tabs
              id="tabs"
              selectedTabId={tabIndex}
              onChange={(newIndex) => setTabIndex(newIndex as TabIndex)}
              fill
            >
              <Tab
                id="import"
                title="Import"
                disabled={hasFiles}
              />
              <Tab
                id="files"
                title="Files"
                disabled={!hasFiles}
              />
              <Tab
                id="settings"
                title="Settings"
                disabled={!hasFiles}
              />
              <Tab
                id="config"
                title="Config"
                disabled={!hasFiles}
              />
              <Tab
                id="metrics"
                title="Metrics"
                disabled={!isValid}
              />
              <Tab
                id="export"
                title="Export"
                disabled={!isValid}
              />
            </Tabs>
          </NavbarGroup>
        </Navbar>

        <TabPanel
          id={tabIndex}
          selectedTabId={tabIndex}
          parentId="tabs"
          panel={panel}
        />
      </Card>
    </>
  );
}
