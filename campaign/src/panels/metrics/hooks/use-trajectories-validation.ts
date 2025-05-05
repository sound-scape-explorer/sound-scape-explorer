import {type ExtractionDto, type TrajectoryDto} from '@shared/dtos';
import {isAfter, isBefore} from 'date-fns';
import {useCallback} from 'react';
import {createDefaultValidation} from 'src/utils/validation';

export function useTrajectoriesValidation() {
  const isNameValid = useCallback(
    (trajectory: TrajectoryDto, extraction: ExtractionDto) => {
      if (trajectory.name === '') {
        return false;
      }

      const names = extraction.trajectories
        .filter((t) => t.index !== trajectory.index)
        .map((t) => t.name);

      return !names.includes(trajectory.name);
    },
    [],
  );

  const isTagNameValid = useCallback((trajectory: TrajectoryDto) => {
    return trajectory.tagName !== undefined;
  }, []);

  const isTagValueValid = useCallback((trajectory: TrajectoryDto) => {
    return trajectory.tagValue !== '';
  }, []);

  const isStartValid = useCallback(
    (trajectory: TrajectoryDto) =>
      isBefore(new Date(trajectory.start), new Date(trajectory.end)),
    [],
  );

  const isEndValid = useCallback(
    (trajectory: TrajectoryDto) =>
      isAfter(new Date(trajectory.end), new Date(trajectory.start)),
    [],
  );

  const validate = useCallback(
    (extraction: ExtractionDto) => {
      const l = extraction.trajectories.length;

      const v = createDefaultValidation();
      v.intent = l > 0 ? 'success' : 'primary';
      v.content = `${l} ${l > 1 ? 'trajectories' : 'trajectory'}`;

      for (const t of extraction.trajectories) {
        if (!isNameValid(t, extraction)) {
          v.intent = 'danger';
          v.content = 'invalid names';
          break;
        }

        if (!isTagNameValid(t)) {
          v.intent = 'danger';
          v.content = 'invalid label properties';
          break;
        }

        if (!isTagValueValid(t)) {
          v.intent = 'danger';
          v.content = 'invalid label values';
          break;
        }

        if (!isStartValid(t) || !isEndValid(t)) {
          v.intent = 'danger';
          v.content = 'invalid dates';
          break;
        }
      }

      return v;
    },
    [isNameValid, isTagNameValid, isTagValueValid, isStartValid, isEndValid],
  );

  return {
    validate,
    isNameValid,
    isTagNameValid,
    isTagValueValid,
    isStartValid,
    isEndValid,
  };
}
