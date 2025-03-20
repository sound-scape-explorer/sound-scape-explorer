import {IndexImpl} from '@shared/enums.ts';
import {atom} from 'jotai';
import {
  IS_PERSIST_DEFAULT,
  OFFSET_DEFAULT,
  STEP_DEFAULT,
} from 'src/constants.ts';
import {useGenericSectionState} from 'src/primitives/generic-section/use-generic-section-state.ts';

const state = atom<MetricsIndex[]>([]);

export interface MetricsIndex {
  index: number;
  impl: IndexImpl;
  offset: number;
  step: number;
  isPersist: boolean;
}

export function useIndexState() {
  const {
    items: indices,
    setItems: setIndices,
    add,
    update,
  } = useGenericSectionState({
    atom: state,
    createItem: (index) => ({
      index,
      impl: IndexImpl.leq_maad,
      offset: OFFSET_DEFAULT,
      step: STEP_DEFAULT,
      isPersist: IS_PERSIST_DEFAULT,
    }),
  });

  return {
    indices,
    setIndices,
    add,
    update,
  };
}
