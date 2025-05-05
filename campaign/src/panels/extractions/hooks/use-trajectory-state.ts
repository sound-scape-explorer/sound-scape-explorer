import {type TrajectoryDto} from '@shared/dtos.ts';
import {TrajectoryStepEnum} from '@shared/enums.ts';
import {addHours} from 'date-fns';
import {useCallback, useMemo} from 'react';
import {
  type ExtractionConfigWithId,
  useExtractionState,
} from 'src/panels/extractions/hooks/use-extraction-state.ts';
import {formatDateToString, getToday} from 'src/utils/dates.ts';

export function useTrajectoryState(extraction: ExtractionConfigWithId) {
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
      step: TrajectoryStepEnum.enum.HOUR,
    });

    updateExtraction(extraction);
  }, [extraction, updateExtraction]);

  const deleteTrajectory = useCallback(
    (trajectory: TrajectoryDto) => {
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
    (trajectory: TrajectoryDto, index: number) => {
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
    (trajectory: TrajectoryDto, name: string) => {
      trajectory.name = name;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateStart = useCallback(
    (trajectory: TrajectoryDto, start: string) => {
      trajectory.start = start;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateEnd = useCallback(
    (trajectory: TrajectoryDto, end: string) => {
      trajectory.end = end;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateProperty = useCallback(
    (trajectory: TrajectoryDto, property: string) => {
      trajectory.tagName = property;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateValue = useCallback(
    (trajectory: TrajectoryDto, value: string) => {
      trajectory.tagValue = value;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateStep = useCallback(
    (trajectory: TrajectoryDto, step: TrajectoryStepEnum) => {
      trajectory.step = step;
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
    updateStep,
  };
}
