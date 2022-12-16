import {reactive} from 'vue';
import type {PointMetadata} from '../lib/scatter-gl-0.0.13';

interface UMAPSelectionStoreInterface {
  // TODO: `undefined` is weird
  selection: (PointMetadata | undefined)[];
}

export const UMAPSelectionStore = reactive<UMAPSelectionStoreInterface>({
  selection: [],
});
