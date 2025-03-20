import {DigesterImpl} from '@shared/enums.ts';
import {atom} from 'jotai/index';
import {useGenericSectionState} from 'src/primitives/generic-section/use-generic-section-state.ts';

const configDigestersAtom = atom<ConfigDigester[]>([]);

export interface ConfigDigester {
  index: number;
  impl: DigesterImpl;
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
      impl: DigesterImpl.silhouette,
    }),
  });

  return {
    digesters,
    setDigesters,
    add,
    update,
  };
}
