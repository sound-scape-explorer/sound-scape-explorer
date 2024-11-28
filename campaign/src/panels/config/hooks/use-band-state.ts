import {atom} from 'jotai/index';
import {useReducerState} from 'src/panels/config/hooks/use-reducer-state.ts';
import {useGenericSectionState} from 'src/primitives/generic-section/use-generic-section-state.ts';

const configBandsAtom = atom<ConfigBand[]>([]);

export interface ConfigBand {
  index: number;
  name: string; // unique
  low: number;
  high: number;
}

export function useBandState() {
  const {purgeBandsFromReducers} = useReducerState();

  const {
    items: bands,
    setItems: setBands,
    add,
    update,
  } = useGenericSectionState({
    atom: configBandsAtom,
    createItem: (index) => ({
      index,
      name: '',
      low: 0,
      high: 20000,
    }),
    onDelete: (band) => {
      purgeBandsFromReducers(band);
    },
  });

  return {
    bands,
    setBands,
    add,
    update,
  };
}
