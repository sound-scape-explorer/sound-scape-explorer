import {useMemo} from 'react';
import {useTabNavigation} from 'src/hooks/use-tab-navigation.ts';
import {ConfigPanel} from 'src/panels/config/config-panel';
import {ExportPanel} from 'src/panels/export-panel';
import {FilesPanel} from 'src/panels/files/files-panel';
import {ImportPanel} from 'src/panels/import-panel';
import {MetricsPanel} from 'src/panels/metrics/metrics-panel';
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
  }, [index]);

  return {
    current,
  };
}
