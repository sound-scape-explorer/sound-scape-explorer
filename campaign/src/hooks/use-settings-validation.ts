import {STORAGE_PATH_SUFFIX, TIMELINE_ORIGIN_MIN} from '@shared/constants';
import {ComputationStrategy} from '@shared/enums';
import {isAfter, isEqual} from 'date-fns';
import {useCallback, useMemo} from 'react';
import {useFileValidation} from 'src/hooks/use-file-validation';
import {useSettingsState} from 'src/hooks/use-settings-state';
import {useTableState} from 'src/panels/files/hooks/use-table-state';
import {findEarliestDate} from 'src/utils/dates';

export function useSettingsValidation() {
  const {settings} = useSettingsState();
  const {arePathsValid} = useFileValidation();
  const {state} = useTableState();

  const isStoragePathValid = useCallback(() => {
    if (settings.storagePath === '') {
      return false;
    }

    return settings.storagePath.endsWith(STORAGE_PATH_SUFFIX);
  }, [settings]);

  const isAudioPathValid = useCallback(() => {
    return (
      arePathsValid && window.electronAPI.getPathExistence(settings.audioPath)
    );
  }, [settings, arePathsValid]);

  const isSampleRateValid = useCallback(() => {
    return settings.expectedSampleRate > 0;
  }, [settings]);

  const isTimelineOriginValid = useCallback(() => {
    const isAfterMinimum = isAfter(
      new Date(settings.timelineOrigin),
      new Date(TIMELINE_ORIGIN_MIN),
    );

    const isEqualMinimum = isEqual(
      new Date(settings.timelineOrigin),
      new Date(TIMELINE_ORIGIN_MIN),
    );

    const dates = state.rows['col_date'];
    const earliestDate = findEarliestDate(dates);

    const isBeforeEarliestFile = isAfter(
      earliestDate,
      new Date(settings.timelineOrigin),
    );

    return (isAfterMinimum || isEqualMinimum) && isBeforeEarliestFile;
  }, [settings, state]);

  // ...
  const isAudioHostValid = useCallback(() => true, []);
  const isTimezoneValid = useCallback(() => true, []);

  const isComputationDimensionsValid = useCallback(() => {
    return settings.computationDimensions > 0;
  }, [settings]);

  const isComputationIterationsValid = useCallback(() => {
    return settings.computationIterations > 0;
  }, [settings]);

  const isDisplaySeedValid = useCallback(() => {
    return settings.displaySeed > 0;
  }, [settings]);

  const isComputationStrategyUmap = useMemo(
    () => settings.computationStrategy === ComputationStrategy.enum.UMAP,
    [settings.computationStrategy],
  );

  const isComputationStrategyPca = useMemo(
    () => settings.computationStrategy === ComputationStrategy.enum.PCA,
    [settings.computationStrategy],
  );

  const isMemoryLimitValid = useCallback(() => {
    return settings.memoryLimit > 0;
  }, [settings.memoryLimit]);

  const isValid = useMemo(() => {
    return (
      isStoragePathValid() &&
      isAudioPathValid() &&
      isSampleRateValid() &&
      isTimelineOriginValid() &&
      isAudioHostValid() &&
      isTimezoneValid() &&
      isComputationDimensionsValid() &&
      isComputationIterationsValid() &&
      isDisplaySeedValid() &&
      isMemoryLimitValid()
    );
  }, [
    isStoragePathValid,
    isAudioPathValid,
    isSampleRateValid,
    isTimelineOriginValid,
    isAudioHostValid,
    isTimezoneValid,
    isComputationDimensionsValid,
    isComputationIterationsValid,
    isDisplaySeedValid,
    isMemoryLimitValid,
  ]);

  return {
    isValid,
    isStoragePathValid,
    isAudioPathValid,
    isSampleRateValid,
    isTimelineOriginValid,
    isAudioHostValid,
    isTimezoneValid,
    isComputationDimensionsValid,
    isComputationIterationsValid,
    isDisplaySeedValid,
    isComputationStrategyUmap,
    isComputationStrategyPca,
    isMemoryLimitValid,
  };
}
