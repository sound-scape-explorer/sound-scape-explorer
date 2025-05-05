import {useMemo} from 'react';
import {useTabNavigation} from 'src/hooks/use-tab-navigation';
import {ExportPanel} from 'src/panels/export-panel';
import {ExtractionsPanel} from 'src/panels/extractions/extractions-panel.tsx';
import {FilesPanel} from 'src/panels/files/files-panel';
import {ImportPanel} from 'src/panels/import-panel';
import {SettingsPanel} from 'src/panels/settings/settings-panel';

export function usePanels() {
  const {index} = useTabNavigation();

  const current = useMemo(() => {
    switch (index) {
      case 'import': {
        return <ImportPanel />;
      }
      case 'files': {
        return <FilesPanel />;
      }
      case 'settings': {
        return <SettingsPanel />;
      }
      case 'extractions': {
        return <ExtractionsPanel />;
      }
      case 'export': {
        return <ExportPanel />;
      }
      default: {
        return <ImportPanel />;
      }
    }
  }, [index]);

  return {
    current,
  };
}
