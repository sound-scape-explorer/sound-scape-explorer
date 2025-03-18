import {isAfter} from 'date-fns';
import {useCallback, useMemo} from 'react';
import {TIMELINE_ORIGIN_MIN} from 'src/constants.ts';
import {ComputationStrategy} from 'src/enums.ts';
import {useFileValidation} from 'src/hooks/use-file-validation.ts';
import {useSettingsState} from 'src/hooks/use-settings-state.ts';

export function useSettingsValidation() {
  const {settings} = useSettingsState();
  const {arePathsValid} = useFileValidation();

  const isStoragePathValid = useCallback(() => {
    return settings.storagePath !== '';
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
    return isAfter(
      new Date(settings.timelineOrigin),
      new Date(TIMELINE_ORIGIN_MIN),
    );
  }, [settings]);

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
    () => settings.computationStrategy === ComputationStrategy.Umap,
    [settings.computationStrategy],
  );

  const isComputationStrategyPca = useMemo(
    () => settings.computationStrategy === ComputationStrategy.Pca,
    [settings.computationStrategy],
  );

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
      isDisplaySeedValid()
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
  ]);

  return {
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
    isValid,
  };
}
