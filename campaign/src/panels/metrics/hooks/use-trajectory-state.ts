import {TrajectoryStep} from '@shared/enums.ts';
import {addHours} from 'date-fns';
import {atom} from 'jotai';
import {useCallback} from 'react';
import {useGenericSectionState} from 'src/primitives/generic-section/use-generic-section-state.ts';
import {formatDateToString, getToday} from 'src/utils/dates.ts';

const state = atom<ConfigTrajectory[]>([]);

export interface ConfigTrajectory {
  index: number;
  name: string; // unique
  start: string; // date string
  end: string; // date string
  labelProperty: string | undefined;
  labelValue: string | undefined;
  step: TrajectoryStep;
}

export function useTrajectoryState() {
  const {
    items: trajectories,
    setItems: setTrajectories,
    add,
    update,
  } = useGenericSectionState({
    atom: state,
    createItem: (index) => ({
      index,
      name: '',
      start: formatDateToString(getToday()),
      end: formatDateToString(addHours(getToday(), 1)),
      labelProperty: undefined,
      labelValue: undefined,
      step: TrajectoryStep.Hour,
    }),
  });

  const purgeLabelFromTrajectories = useCallback(
    (property: string) => {
      setTrajectories((prev) => {
        return prev.map((trajectory) => ({
          ...trajectory,
          labelProperty:
            trajectory.labelProperty === property
              ? undefined
              : trajectory.labelProperty,
        }));
      });
    },
    [setTrajectories],
  );

  return {
    trajectories,
    setTrajectories,
    add,
    update,
    purgeLabelFromTrajectories,
  };
}
