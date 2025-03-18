import {isAfter, isBefore} from 'date-fns';
import {useCallback} from 'react';
import {
  type ConfigTrajectory,
  useTrajectoryState,
} from 'src/panels/metrics/hooks/use-trajectory-state.ts';
import {useGenericSectionValidation} from 'src/primitives/generic-section/use-generic-section-validation.ts';

export function useTrajectoryValidation() {
  const {collectValues, createValidation} = useGenericSectionValidation();
  const {trajectories} = useTrajectoryState();

  const isNameValid = useCallback(
    (t: ConfigTrajectory) => {
      if (t.name === '') {
        return false;
      }

      const names = collectValues(trajectories, t, 'name');
      return !names.includes(t.name);
    },
    [trajectories, collectValues],
  );

  const isLabelPropertyValid = useCallback((t: ConfigTrajectory) => {
    return t.labelProperty !== undefined;
  }, []);

  const isStartValid = useCallback(
    (t: ConfigTrajectory) => isBefore(new Date(t.start), new Date(t.end)),
    [],
  );

  const isEndValid = useCallback(
    (t: ConfigTrajectory) => isAfter(new Date(t.end), new Date(t.start)),
    [],
  );

  const validate = useCallback(() => {
    const l = trajectories.length;

    const v = createValidation();
    v.intent = l > 0 ? 'success' : 'primary';
    v.content = `${l} ${l > 1 ? 'trajectories' : 'trajectory'}`;

    for (const t of trajectories) {
      if (!isNameValid(t)) {
        v.intent = 'danger';
        v.content = 'invalid names';
        break;
      }

      if (!isLabelPropertyValid(t)) {
        v.intent = 'danger';
        v.content = 'invalid label properties';
        break;
      }

      if (!isStartValid(t) || !isEndValid(t)) {
        v.intent = 'danger';
        v.content = 'invalid dates';
        break;
      }
    }

    return v;
  }, [
    trajectories,
    createValidation,
    isNameValid,
    isLabelPropertyValid,
    isStartValid,
    isEndValid,
  ]);

  return {
    validate,
    isNameValid,
    isLabelPropertyValid,
    isStartValid,
    isEndValid,
  };
}
