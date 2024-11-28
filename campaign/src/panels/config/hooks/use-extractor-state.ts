import {atom} from 'jotai/index';
import {
  IS_PERSIST_DEFAULT,
  OFFSET_DEFAULT,
  STEP_DEFAULT,
} from 'src/constants.ts';
import {useReducerState} from 'src/panels/config/hooks/use-reducer-state.ts';
import {useGenericSectionState} from 'src/primitives/generic-section/use-generic-section-state.ts';

const configExtractorsAtom = atom<ConfigExtractor[]>([]);

export enum ConfigExtractorType {
  vgg = 'vgg',
  melogram = 'melogram',
  melspectrum = 'melspectrum',
}

export interface ConfigExtractor {
  index: number;
  name: string; // unique
  type: ConfigExtractorType;
  offset: number;
  step: number;
  isPersist: boolean;
}

export function useExtractorState() {
  const {purgeExtractorsFromReducers} = useReducerState();

  const {
    items: extractors,
    setItems: setExtractors,
    add,
    update,
  } = useGenericSectionState({
    atom: configExtractorsAtom,
    createItem: (index) => ({
      index,
      name: '',
      type: ConfigExtractorType.vgg,
      offset: OFFSET_DEFAULT,
      step: STEP_DEFAULT,
      isPersist: IS_PERSIST_DEFAULT,
    }),
    onDelete: (extractor) => {
      purgeExtractorsFromReducers(extractor);
    },
  });

  return {
    extractors,
    setExtractors,
    add,
    update,
  };
}
