import {addHours} from 'date-fns';
import {atom} from 'jotai';
import {useGenericSectionState} from 'src/primitives/generic-section/use-generic-section-state.ts';
import {formatDateToString, getToday} from 'src/utils/dates.ts';

const state = atom<ConfigTrajectory[]>([]);

export enum ConfigTrajectoryStep {
  Hour = 'hour',
  Day = 'day',
  Month = 'month',
}

export interface ConfigTrajectory {
  index: number;
  name: string; // unique
  start: string; // date string
  end: string; // date string
  labelProperty: string;
  labelValue: string;
  step: ConfigTrajectoryStep;
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
      labelProperty: '',
      labelValue: '',
      step: ConfigTrajectoryStep.Hour,
    }),
  });

  return {
    trajectories,
    setTrajectories,
    add,
    update,
  };
}
