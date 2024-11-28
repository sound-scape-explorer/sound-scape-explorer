import {atom} from 'jotai';
import {getEnumKeys} from 'src/enums.ts';
import {useGenericSectionState} from 'src/primitives/generic-section/use-generic-section-state.ts';

const state = atom<ConfigExtractor[]>([]);

export enum ConfigExtractorType {
  LeqMaad = 'leq_maad',
  Ht = 'ht',
  Hf = 'hf',
  Med = 'med',
  Ndsi = 'ndsi',
  Aci = 'aci',
  Adi = 'adi',
  Bi = 'bi',
}

export interface ConfigExtractor {
  index: number;
  type: keyof typeof ConfigExtractorType;
}

export function useExtractorState() {
  const {
    items: extractors,
    setItems: setExtractors,
    add,
    update,
  } = useGenericSectionState({
    atom: state,
    createItem: (index) => ({
      index,
      type: getEnumKeys(ConfigExtractorType)[0],
    }),
  });

  return {
    extractors,
    setExtractors,
    add,
    update,
  };
}
