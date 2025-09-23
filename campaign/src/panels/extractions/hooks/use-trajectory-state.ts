import {
  SMOOTHING_WINDOW_CUSTOM,
  SMOOTHING_WINDOW_PRESETS,
} from '@shared/constants.ts';
import {formatDateToString, getToday} from '@shared/dates';
import {addHours} from 'date-fns';
import {useCallback, useMemo} from 'react';
import {type ExtractionConfig, type TrajectoryConfig} from 'src/interfaces.ts';
import {useExtractionState} from 'src/panels/extractions/hooks/use-extraction-state.ts';

// todo: reimplement me
// const purgeLabelFromTrajectories = useCallback(
//   (property: string) => {
//     setTrajectories((prev) => {
//       return prev.map((trajectory) => ({
//         ...trajectory,
//         labelProperty:
//           trajectory.labelProperty === property
//             ? undefined
//             : trajectory.labelProperty,
//       }));
//     });
//   },
//   [setTrajectories],
// );

export function useTrajectoryState(extraction: ExtractionConfig) {
  const {updateExtraction} = useExtractionState();

  const trajectories = useMemo(
    () => extraction.trajectories,
    [extraction.trajectories],
  );

  const addTrajectory = useCallback(() => {
    extraction.trajectories.push({
      index: extraction.trajectories.length,
      name: '',
      start: formatDateToString(getToday()),
      end: formatDateToString(addHours(getToday(), 1)),
      tagName: '',
      tagValue: '',
      smoothingWindowPreset: 'HOUR',
      smoothingWindow: SMOOTHING_WINDOW_PRESETS.HOUR,
    });

    updateExtraction(extraction);
  }, [extraction, updateExtraction]);

  const deleteTrajectory = useCallback(
    (trajectory: TrajectoryConfig) => {
      const newTrajectories = extraction.trajectories.filter(
        (t) => t.index !== trajectory.index,
      );
      newTrajectories.forEach((t, index) => {
        t.index = index;
      });
      extraction.trajectories = newTrajectories;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateIndex = useCallback(
    (trajectory: TrajectoryConfig, index: number) => {
      const newTrajectories = [...extraction.trajectories];
      const newIndex = trajectory.index + index;

      if (newIndex < 0 || newIndex >= extraction.trajectories.length) {
        return;
      }

      const existing = newTrajectories.find((t) => t.index === newIndex);
      const updated = newTrajectories.find((t) => t.index === trajectory.index);
      if (existing && updated) {
        existing.index = trajectory.index;
        updated.index = newIndex;
      }

      extraction.trajectories = newTrajectories;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateName = useCallback(
    (trajectory: TrajectoryConfig, name: string) => {
      trajectory.name = name;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateStart = useCallback(
    (trajectory: TrajectoryConfig, start: string) => {
      trajectory.start = start;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateEnd = useCallback(
    (trajectory: TrajectoryConfig, end: string) => {
      trajectory.end = end;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateProperty = useCallback(
    (trajectory: TrajectoryConfig, property: string) => {
      trajectory.tagName = property;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateValue = useCallback(
    (trajectory: TrajectoryConfig, value: string) => {
      trajectory.tagValue = value;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateSmoothingWindowPreset = useCallback(
    (
      trajectory: TrajectoryConfig,
      preset: TrajectoryConfig['smoothingWindowPreset'],
    ) => {
      if (preset === SMOOTHING_WINDOW_CUSTOM) {
        return;
      }

      trajectory.smoothingWindowPreset = preset;
      trajectory.smoothingWindow = SMOOTHING_WINDOW_PRESETS[preset];
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateSmoothingWindowCustom = useCallback(
    (trajectory: TrajectoryConfig, value: number) => {
      trajectory.smoothingWindowPreset = SMOOTHING_WINDOW_CUSTOM;
      trajectory.smoothingWindow = value;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  return {
    trajectories,
    addTrajectory,
    deleteTrajectory,
    updateIndex,
    updateName,
    updateStart,
    updateEnd,
    updateProperty,
    updateValue,
    updateSmoothingWindowPreset,
    updateSmoothingWindowCustom,
  };
}
