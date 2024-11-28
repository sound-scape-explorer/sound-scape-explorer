import {addHours} from 'date-fns';
import {atom} from 'jotai';
import {useGenericSectionState} from 'src/primitives/generic-section/use-generic-section-state.ts';
import {formatDateToString, getToday} from 'src/utils/dates.ts';

const configRangesAtom = atom<ConfigRange[]>([]);

export interface ConfigRange {
  index: number;
  name: string; // unique
  start: string; // date string
  end: string; // date string
}

export function useRangeState() {
  const {
    items: ranges,
    setItems: setRanges,
    add,
    update,
  } = useGenericSectionState({
    atom: configRangesAtom,
    createItem: (index) => ({
      index,
      name: '',
      start: formatDateToString(getToday()),
      end: formatDateToString(addHours(getToday(), 1)),
    }),
  });

  return {
    ranges,
    setRanges,
    add,
    update,
  };
}
