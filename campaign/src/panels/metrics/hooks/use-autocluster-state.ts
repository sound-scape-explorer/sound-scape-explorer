import {AutoclusterImpl} from '@shared/enums.ts';
import {atom} from 'jotai/index';
import {
  AUTOCLUSTER_ALPHA_DEFAULT,
  AUTOCLUSTER_EPSILON_DEFAULT,
  AUTOCLUSTER_MIN_CLUSTER_SIZE_DEFAULT,
  AUTOCLUSTER_MIN_SAMPLES_DEFAULT,
} from 'src/constants.ts';
import {useGenericSectionState} from 'src/primitives/generic-section/use-generic-section-state.ts';

const configAutoclustersAtom = atom<ConfigAutocluster[]>([]);

export interface ConfigAutocluster {
  index: number;
  impl: AutoclusterImpl;
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
      impl: AutoclusterImpl.hdbscan_eom,
      minClusterSize: AUTOCLUSTER_MIN_CLUSTER_SIZE_DEFAULT,
      minSamples: AUTOCLUSTER_MIN_SAMPLES_DEFAULT,
      alpha: AUTOCLUSTER_ALPHA_DEFAULT,
      epsilon: AUTOCLUSTER_EPSILON_DEFAULT,
    }),
  });

  return {
    autoclusters,
    setAutoclusters,
    add,
    update,
  };
}
