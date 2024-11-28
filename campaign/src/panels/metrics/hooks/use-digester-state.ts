import {atom} from 'jotai/index';
import {useGenericSectionState} from 'src/primitives/generic-section/use-generic-section-state.ts';

const configDigestersAtom = atom<ConfigDigester[]>([]);

export enum DigesterType {
  silhouette = 'silhouette',
  contingency = 'contingency',
  sum_var = 'sum_var',
  sum_std = 'sum_std',
  mean_std = 'mean_std',
  mean_spreading = 'mean_spreading',
  distance = 'distance',
  overlap = 'overlap',
}

export interface ConfigDigester {
  index: number;
  type: DigesterType;
}

export function useDigesterState() {
  const {
    items: digesters,
    setItems: setDigesters,
    add,
    update,
  } = useGenericSectionState({
    atom: configDigestersAtom,
    createItem: (index) => ({
      index,
      type: DigesterType.silhouette,
    }),
  });

  return {
    digesters,
    setDigesters,
    add,
    update,
  };
}
