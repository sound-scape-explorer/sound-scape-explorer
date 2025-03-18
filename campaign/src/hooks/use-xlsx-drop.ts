import {useCallback} from 'react';
import {useNotify} from 'src/hooks/use-notify.ts';
import {useSettingsState} from 'src/hooks/use-settings-state.ts';
import {useTabNavigation} from 'src/hooks/use-tab-navigation.ts';
import {useBandState} from 'src/panels/config/hooks/use-band-state.ts';
import {useExtractorState} from 'src/panels/config/hooks/use-extractor-state.ts';
import {useIntegrationState} from 'src/panels/config/hooks/use-integration-state.ts';
import {useReducerState} from 'src/panels/config/hooks/use-reducer-state.ts';
import {useTableLoader} from 'src/panels/files/hooks/use-table-loader.ts';
import {useTablePropertyFilterUtil} from 'src/panels/files/hooks/use-table-property-filter-util.ts';
import {useAutoclusterState} from 'src/panels/metrics/hooks/use-autocluster-state.ts';
import {useDigesterState} from 'src/panels/metrics/hooks/use-digester-state.ts';
import {useIndexState} from 'src/panels/metrics/hooks/use-index-state.ts';
import {useRangeState} from 'src/panels/metrics/hooks/use-range-state.ts';
import {useTrajectoryState} from 'src/panels/metrics/hooks/use-trajectory-state.ts';
import {XlsxParser} from 'src/utils/xlsx-parser.ts';

export function useXlsxDrop() {
  const {notify} = useNotify();
  const {navigate} = useTabNavigation();
  const {loadFromXlsx} = useTableLoader();
  const {setSettings} = useSettingsState();
  const {setBands} = useBandState();
  const {setIntegrations} = useIntegrationState();
  const {setExtractors} = useExtractorState();
  const {setIndices} = useIndexState();
  const {setRanges} = useRangeState();
  const {setReducers} = useReducerState();
  const {setAutoclusters} = useAutoclusterState();
  const {setDigesters} = useDigesterState();
  const {setTrajectories} = useTrajectoryState();
  const {filterPropertiesWithoutPrefix} = useTablePropertyFilterUtil();

  const handleXlsx = useCallback(
    (file: File) => {
      (async () => {
        try {
          const parser = await XlsxParser.fromFile(file);

          const files = parser.parseFiles();
          loadFromXlsx(files);

          const settings = parser.parseSettings();
          setSettings(settings);

          const bands = parser.parseBands();
          setBands(bands);

          const integrations = parser.parseIntegrations();
          setIntegrations(integrations);

          const {extractors, indices} = parser.parseExtractorsAndIndices();
          setExtractors(extractors);
          setIndices(indices);

          const ranges = parser.parseRanges();
          setRanges(ranges);

          const reducers = parser.parseReducers({bands, integrations});
          setReducers(reducers);

          const autoclusters = parser.parseAutoclusters();
          setAutoclusters(autoclusters);

          const digesters = parser.parseDigesters();
          setDigesters(digesters);

          const properties = filterPropertiesWithoutPrefix(files);
          const trajectories = parser.parseTrajectories(properties);
          setTrajectories(trajectories);

          navigate('settings');
        } catch (error) {
          notify(`${error}`, 'danger');
        }
      })();
    },
    [
      notify,
      navigate,
      loadFromXlsx,
      setSettings,
      setBands,
      setIntegrations,
      setExtractors,
      setIndices,
      setRanges,
      setReducers,
      setAutoclusters,
      setDigesters,
      setTrajectories,
      filterPropertiesWithoutPrefix,
    ],
  );

  return {
    handleXlsx,
  };
}
