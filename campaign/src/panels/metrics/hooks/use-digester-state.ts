import {atom} from 'jotai/index';
import {getEnumKeys} from 'src/enums.ts';
import {useGenericSectionState} from 'src/primitives/generic-section/use-generic-section-state.ts';

const configDigestersAtom = atom<ConfigDigester[]>([]);

export enum DigesterTypeNew {
  Silhouette = 'silhouette',
  Contingency = 'contingency',
}

export interface ConfigDigester {
  index: number;
  type: keyof typeof DigesterTypeNew;
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
      type: getEnumKeys(DigesterTypeNew)[0],
    }),
  });

  return {
    digesters,
    setDigesters,
    add,
    update,
  };
}
