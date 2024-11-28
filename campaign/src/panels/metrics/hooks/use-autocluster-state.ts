import {atom} from 'jotai/index';
import {getEnumKeys} from 'src/enums.ts';
import {useGenericSectionState} from 'src/primitives/generic-section/use-generic-section-state.ts';

const configAutoclustersAtom = atom<ConfigAutocluster[]>([]);

export enum AutoclusterType {
  HdbscanEom = 'hdbscan-eom',
  HdbscanLeaf = 'hdbscan-leaf',
}

export interface ConfigAutocluster {
  index: number;
  type: keyof typeof AutoclusterType;
  minClusterSize: number;
  minSamples: number;
  alpha: number;
  epsilon: number;
}

export function useAutoclusterState() {
  const {
    items: autoclusters,
    setItems: setAutoclusters,
    add,
    update,
  } = useGenericSectionState({
    atom: configAutoclustersAtom,
    createItem: (index) => ({
      index,
      type: getEnumKeys(AutoclusterType)[0],
      minClusterSize: 15,
      minSamples: 15,
      alpha: 1,
      epsilon: 0.1,
    }),
  });

  return {
    autoclusters,
    setAutoclusters,
    add,
    update,
  };
}
