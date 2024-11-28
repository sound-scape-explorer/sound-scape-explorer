import 'react-tabs/style/react-tabs.css';
import 'react-toastify/dist/ReactToastify.css';

import {useAtom, useAtomValue} from 'jotai';
import {useMemo} from 'react';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import {ToastContainer} from 'react-toastify';
import {inputFilesAtom, tabIndexAtom} from 'src/atoms.ts';
import {FilesGrid} from 'src/components/files-grid/files-grid.tsx';
import styles from 'src/components/layout.module.scss';
import {ExportPage} from 'src/components/pages/export.page.tsx';
import {FolderPage} from 'src/components/pages/folder.page.tsx';
import {MetricsPage} from 'src/components/pages/metrics.page.tsx';
import {RangesPage} from 'src/components/pages/ranges.page.tsx';
import {SettingsPage} from 'src/components/pages/settings.page.tsx';
import {ConfigPage} from 'src/components/settings/config.page.tsx';
import {useSettings} from 'src/hooks/use-settings.ts';

export function Layout() {
  const [tabIndex, setTabIndex] = useAtom(tabIndexAtom);
  const files = useAtomValue(inputFilesAtom);
  const hasFiles = useMemo(() => files.length > 0, [files]);
  const {hasSettings} = useSettings();

  return (
    <div className={styles.container}>
      <ToastContainer />
      <Tabs
        selectedIndex={tabIndex}
        onSelect={(newIndex: number) => setTabIndex(newIndex)}
      >
        <TabList>
          <Tab disabled={hasFiles}>Folder</Tab>
          <Tab disabled={!hasFiles}>Files</Tab>
          <Tab disabled={!hasFiles}>Settings</Tab>
          <Tab disabled={!hasFiles}>Config</Tab>
          <Tab disabled={!hasFiles}>Ranges</Tab>
          <Tab disabled={!hasSettings}>Metrics</Tab>
          <Tab disabled={!hasSettings}>Export</Tab>
        </TabList>

        <TabPanel className={styles.panel}>
          <FolderPage />
        </TabPanel>
        <TabPanel className={styles.panel}>
          <FilesGrid />
        </TabPanel>
        <TabPanel className={styles.panel}>
          <SettingsPage />
        </TabPanel>
        <TabPanel className={styles.panel}>
          <ConfigPage />
        </TabPanel>
        <TabPanel className={styles.panel}>
          <RangesPage />
        </TabPanel>
        <TabPanel className={styles.panel}>
          <MetricsPage />
        </TabPanel>
        <TabPanel className={styles.panel}>
          <ExportPage />
        </TabPanel>
      </Tabs>
    </div>
  );
}
