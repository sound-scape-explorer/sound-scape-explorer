import {useCallback} from 'react';
import {type ExportJson} from 'src/hooks/use-export.ts';
import {useNotify} from 'src/hooks/use-notify.ts';
import {useSettingsState} from 'src/hooks/use-settings-state.ts';
import {useTabNavigation} from 'src/hooks/use-tab-navigation.ts';
import {useBandState} from 'src/panels/config/hooks/use-band-state.ts';
import {useExtractorState} from 'src/panels/config/hooks/use-extractor-state.ts';
import {useIntegrationState} from 'src/panels/config/hooks/use-integration-state.ts';
import {useReducerState} from 'src/panels/config/hooks/use-reducer-state.ts';
import {useTableLoader} from 'src/panels/files/hooks/use-table-loader.ts';
import {useAutoclusterState} from 'src/panels/metrics/hooks/use-autocluster-state.ts';
import {useDigesterState} from 'src/panels/metrics/hooks/use-digester-state.ts';
import {useIndexState} from 'src/panels/metrics/hooks/use-index-state.ts';
import {useRangeState} from 'src/panels/metrics/hooks/use-range-state.ts';
import {useTrajectoryState} from 'src/panels/metrics/hooks/use-trajectory-state.ts';
import {readJson} from 'src/utils/json.ts';

export function useJsonDrop() {
  const {notify} = useNotify();
  const {navigate} = useTabNavigation();
  const {setSettings} = useSettingsState();
  const {setBands} = useBandState();
  const {setIntegrations} = useIntegrationState();
  const {setExtractors} = useExtractorState();
  const {setRanges} = useRangeState();
  const {setIndices} = useIndexState();
  const {setTrajectories} = useTrajectoryState();
  const {setAutoclusters} = useAutoclusterState();
  const {setReducers} = useReducerState();
  const {setDigesters} = useDigesterState();
  const {loadFromJson} = useTableLoader();

  const read = useCallback(
    (file: File): Promise<ExportJson> => {
      return new Promise((resolve) => {
        readJson(file, (e) => {
          const data = e.target?.result;

          if (typeof data !== 'string') {
            notify('Could not read file', 'danger');
            return;
          }

          const json = JSON.parse(data);
          resolve(json);
        });
      });
    },
    [notify],
  );

  const handleJson = useCallback(
    async (file: File) => {
      const json = await read(file);
      setSettings(json.settings);
      setBands(json.bands);
      setIntegrations(json.integrations);
      setExtractors(json.extractors);
      setRanges(json.ranges);
      setIndices(json.indices);
      setTrajectories(json.trajectories);
      setAutoclusters(json.autoclusters);
      setReducers(json.reducers);
      setDigesters(json.digesters);

      loadFromJson(json.files);

      navigate('settings');
    },
    [
      navigate,
      read,
      setSettings,
      setBands,
      setIntegrations,
      setExtractors,
      setRanges,
      setIndices,
      setTrajectories,
      setAutoclusters,
      setReducers,
      setDigesters,
      loadFromJson,
    ],
  );

  return {
    handleJson,
  };
}
