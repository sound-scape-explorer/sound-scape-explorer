import {isAfter, isBefore} from 'date-fns';
import {useCallback} from 'react';
import {type ExtractionConfig, type TrajectoryConfig} from 'src/interfaces';
import {createDefaultValidation} from 'src/utils/validation';

export function useTrajectoriesValidation() {
  const isNameValid = useCallback(
    (trajectory: TrajectoryConfig, extraction: ExtractionConfig) => {
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

  const isTagNameValid = useCallback((trajectory: TrajectoryConfig) => {
    return trajectory.tagName !== undefined;
  }, []);

  const isTagValueValid = useCallback((trajectory: TrajectoryConfig) => {
    return trajectory.tagValue !== '';
  }, []);

  const isStartValid = useCallback(
    (trajectory: TrajectoryConfig) =>
      isBefore(new Date(trajectory.start), new Date(trajectory.end)),
    [],
  );

  const isEndValid = useCallback(
    (trajectory: TrajectoryConfig) =>
      isAfter(new Date(trajectory.end), new Date(trajectory.start)),
    [],
  );

  const isTrajectoryWindowValid = useCallback(
    (trajectory: TrajectoryConfig) => {
      return trajectory.smoothingWindow > 0;
    },
    [],
  );

  const validate = useCallback(
    (extraction: ExtractionConfig) => {
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

        if (!isTrajectoryWindowValid(t)) {
          v.intent = 'danger';
          v.content = 'invalid window';
          break;
        }
      }

      return v;
    },
    [
      isNameValid,
      isTagNameValid,
      isTagValueValid,
      isStartValid,
      isEndValid,
      isTrajectoryWindowValid,
    ],
  );

  return {
    validate,
    isNameValid,
    isTagNameValid,
    isTagValueValid,
    isStartValid,
    isEndValid,
    isTrajectoryWindowValid,
  };
}
