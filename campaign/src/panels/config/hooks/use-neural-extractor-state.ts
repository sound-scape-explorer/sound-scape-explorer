import {atom} from 'jotai/index';
import {getEnumKeys} from 'src/enums.ts';
import {useReducerState} from 'src/panels/config/hooks/use-reducer-state.ts';
import {useGenericSectionState} from 'src/primitives/generic-section/use-generic-section-state.ts';

const configNeuralExtractorsAtom = atom<ConfigNeuralExtractor[]>([]);

export enum NeuralExtractorType {
  VGGish = 'vgg',
  Melogram = 'melogram',
  Melspectrum = 'melspectrum',
}

export interface ConfigNeuralExtractor {
  index: number;
  name: string; // unique
  type: keyof typeof NeuralExtractorType;
  offset: number;
  step: number;
  isPersist: boolean;
}

export function useNeuralExtractorState() {
  const {purgeExtractors} = useReducerState();

  const {
    items: extractors,
    setItems: setExtractors,
    add,
    update,
  } = useGenericSectionState({
    atom: configNeuralExtractorsAtom,
    createItem: (index) => ({
      index,
      name: '',
      type: getEnumKeys(NeuralExtractorType)[0],
      offset: 0,
      step: 1000,
      isPersist: false,
    }),
    onDelete: (extractor) => {
      purgeExtractors(extractor);
    },
  });

  return {
    extractors,
    setExtractors,
    add,
    update,
  };
}
