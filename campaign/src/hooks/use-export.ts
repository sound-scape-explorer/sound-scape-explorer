import {useCallback} from 'react';
import {type Settings, useSettingsState} from 'src/hooks/use-settings-state.ts';
import {
  type ConfigFile,
  useTableStateConverter,
} from 'src/hooks/use-table-state-converter.ts';
import {
  type ConfigBand,
  useBandState,
} from 'src/panels/config/hooks/use-band-state.ts';
import {
  type ConfigExtractor,
  useExtractorState,
} from 'src/panels/config/hooks/use-extractor-state.ts';
import {
  type ConfigIntegration,
  useIntegrationState,
} from 'src/panels/config/hooks/use-integration-state.ts';
import {
  type ConfigReducer,
  useReducerState,
} from 'src/panels/config/hooks/use-reducer-state.ts';
import {
  type ConfigAutocluster,
  useAutoclusterState,
} from 'src/panels/metrics/hooks/use-autocluster-state.ts';
import {
  type ConfigDigester,
  useDigesterState,
} from 'src/panels/metrics/hooks/use-digester-state.ts';
import {
  type MetricsIndex,
  useIndexState,
} from 'src/panels/metrics/hooks/use-index-state.ts';
import {
  type ConfigRange,
  useRangeState,
} from 'src/panels/metrics/hooks/use-range-state.ts';
import {
  type ConfigTrajectory,
  useTrajectoryState,
} from 'src/panels/metrics/hooks/use-trajectory-state.ts';
import {version} from 'src/version.ts';

export interface ExportJson {
  version: string;
  isValid: boolean; // TODO: Add flag for processing easiness
  settings: Settings;
  files: ConfigFile[];
  bands: ConfigBand[];
  integrations: ConfigIntegration[];
  extractors: ConfigExtractor[];
  reducers: ConfigReducer[];
  ranges: ConfigRange[];
  autoclusters: ConfigAutocluster[];
  digesters: ConfigDigester[];
  trajectories: ConfigTrajectory[];
  indices: MetricsIndex[];
}

export function useExport() {
  const {settings} = useSettingsState();
  const {bands} = useBandState();
  const {integrations} = useIntegrationState();
  const {extractors} = useExtractorState();
  const {reducers} = useReducerState();
  const {ranges} = useRangeState();
  const {autoclusters} = useAutoclusterState();
  const {digesters} = useDigesterState();
  const {trajectories} = useTrajectoryState();
  const {indices} = useIndexState();
  const {getFiles} = useTableStateConverter();

  const download = useCallback(<T>(data: T, filename = 'campaign'): void => {
    try {
      const string = JSON.stringify(data, null, 2);
      const blob = new Blob([string], {type: 'application/json'});
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `${filename}.json`;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading JSON:', error);
    }
  }, []);

  const generate = useCallback(() => {
    const files = getFiles();

    const json: ExportJson = {
      version,
      settings,
      files,
      bands,
      integrations,
      extractors,
      reducers,
      ranges,
      autoclusters,
      digesters,
      trajectories,
      indices,
    };

    return json;
  }, [
    settings,
    bands,
    integrations,
    extractors,
    reducers,
    ranges,
    autoclusters,
    digesters,
    trajectories,
    indices,
    getFiles,
  ]);

  const exportToJson = useCallback(() => {
    const json = generate();
    download(json);
  }, [generate, download]);

  return {
    exportToJson,
  };
}
