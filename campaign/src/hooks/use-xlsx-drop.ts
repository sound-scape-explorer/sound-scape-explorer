import {type ExtractionDto} from '@shared/dtos';
import {useCallback} from 'react';
import {useNotify} from 'src/hooks/use-notify';
import {useSettingsState} from 'src/hooks/use-settings-state';
import {useTabNavigation} from 'src/hooks/use-tab-navigation';
import {useExtractionState} from 'src/panels/extractions/hooks/use-extraction-state.ts';
import {useExtractorDefaults} from 'src/panels/extractions/hooks/use-extractor-defaults.ts';
import {useRangeState} from 'src/panels/extractions/hooks/use-range-state.ts';
import {useTableLoader} from 'src/panels/files/hooks/use-table-loader';
import {XlsxParser} from 'src/utils/xlsx-parser';

export function useXlsxDrop() {
  const {notify} = useNotify();
  const {navigate} = useTabNavigation();
  const {loadFromDto} = useTableLoader();
  const {setSettings} = useSettingsState();
  const {setRanges} = useRangeState();
  const {createExtractorWithDefaults} = useExtractorDefaults();
  const {loadExtractions} = useExtractionState();

  const handleXlsx = useCallback(
    (file: File) => {
      (async () => {
        try {
          const parser = await XlsxParser.fromFile(file);

          const files = parser.parseFiles();
          loadFromDto(files);

          const settings = parser.parseSettings();
          setSettings(settings);

          const bands = parser.parseBands();
          const integrations = parser.parseIntegrations();
          const extractors = parser.parseExtractorsAndIndices();
          const reducers = parser.parseReducers();
          const autoclusters = parser.parseAutoclusters();
          const metrics = parser.parseDigesters();
          const tagNames = Object.keys(files[0].tags);
          const trajectories = parser.parseTrajectories(tagNames);

          const extractions: ExtractionDto[] = [
            {
              index: 0,
              name: 'Extraction',
              bands,
              integrations,
              extractors: extractors.map((ex) =>
                createExtractorWithDefaults(ex),
              ),
              reducers,
              autoclusters,
              metrics,
              trajectories,
            },
          ];

          loadExtractions(extractions);

          const ranges = parser.parseRanges();
          setRanges(ranges);

          navigate('settings');
        } catch (error) {
          notify(`${error}`, 'danger');
        }
      })();
    },
    [
      notify,
      navigate,
      loadFromDto,
      setSettings,
      setRanges,
      createExtractorWithDefaults,
      loadExtractions,
    ],
  );

  return {
    handleXlsx,
  };
}
