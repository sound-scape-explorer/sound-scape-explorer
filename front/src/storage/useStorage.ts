import {asyncComputed} from '@vueuse/core';
import {computed, onMounted} from 'vue';
import {selectionStore} from '../components/Selection/selectionStore';
import {storage} from './storage';
import {metaPropertiesReactive} from './metaPropertiesReactive';
import {metaSetsReactive} from './metaSetsReactive';
import {indicatorsReactive} from './indicatorsReactive';
import {volumesReactive} from './volumesReactive';

export interface Volume {
  index: number;
  name: string;
  values: number[];
}

export type Indicator = Volume;

export type Matrix = Volume;

export interface Pairing {
  index: number;
  name: string;
  values: number[][];
}

type Worker = typeof import('../workers/worker');

let count = 0;

export async function useStorage() {
  count += 1;
  console.log('useStorage', count);
  const worker = new ComlinkWorker<Worker>(
    new URL('../workers/worker', import.meta.url),
  );

  const load = (file: File) => {
    storage.file = file;
  };

  const unload = () => {
    storage.file = null;
    window.location.reload();
  };

  const isReadyRef = computed(() => {
    return storage.file !== null;
  });

  const integrationRef = asyncComputed(async () => {
    if (storage.file === null || selectionStore.integration === null) {
      return null;
    }

    return await worker.readSecondsFromIntegration(
      storage.file,
      selectionStore.integration,
    );
  });

  // Settings
  asyncComputed(async () => {
    if (storage.file === null) {
      return;
    }

    storage.settings = await worker.readSettings(storage.file);
  });

  // Bands
  asyncComputed(async () => {
    if (storage.file === null) {
      return;
    }

    storage.bands = await worker.readBands(storage.file);
  });

  // Integrations
  asyncComputed(async () => {
    if (storage.file === null) {
      return;
    }

    storage.integrations = await worker.readIntegrations(storage.file);
  });

  // Ranges
  asyncComputed(async () => {
    if (storage.file === null) {
      return;
    }

    storage.ranges = await worker.readRanges(storage.file);
  });

  // Files
  asyncComputed(async () => {
    if (storage.file === null) {
      return;
    }

    storage.files = await worker.readFiles(storage.file);
  });

  // Files Metas
  asyncComputed(async () => {
    if (storage.file === null) {
      return;
    }

    storage.filesMetas = await worker.readFilesMetas(storage.file);
  });

  // Metas
  asyncComputed(async () => {
    if (
      storage.file === null ||
      selectionStore.band === null ||
      integrationRef.value === null
    ) {
      return;
    }

    storage.metas = await worker.readMetas(
      storage.file,
      selectionStore.band,
      integrationRef.value,
    );
  });

  // Meta properties
  const metaPropertiesRef = computed(() => {
    if (metaPropertiesReactive.data !== null) {
      return;
    }

    if (storage.metas === null) {
      return;
    }

    console.log('metaPropertiesRef');
    metaPropertiesReactive.data = Object.keys(storage.metas);
  });

  onMounted(() => {
    if (storage.file === null) {
      return;
    }
    console.log('hello');
  });

  // Meta sets
  const metaSetsRef = computed<void>(() => {
    if (storage.metas === null) {
      return;
    }

    console.log('metaSetsRef');
    metaSetsReactive.data = Object.values(storage.metas);
  });

  const lengthPerGroupRef = asyncComputed(async () => {
    if (
      storage.file === null ||
      selectionStore.band === null ||
      integrationRef.value === null
    ) {
      return null;
    }

    return await worker.getSlicesPerGroup(
      storage.file,
      selectionStore.band,
      integrationRef.value,
    );
  });

  // Reducers
  asyncComputed(async () => {
    if (storage.file === null) {
      return;
    }

    storage.reducers = await worker.readReducers(storage.file);
  });

  const indicatorsRef = asyncComputed(async () => {
    if (
      storage.file === null ||
      selectionStore.band === null ||
      integrationRef.value === null
    ) {
      return;
    }

    indicatorsReactive.data = await worker.readIndicators(
      storage.file,
      selectionStore.band,
      integrationRef.value,
    );
  });

  const volumesRef = asyncComputed(async () => {
    if (
      storage.file === null ||
      selectionStore.band === null ||
      integrationRef.value === null
    ) {
      return;
    }

    volumesReactive.data = await worker.readVolumes(
      storage.file,
      selectionStore.band,
      integrationRef.value,
    );
  });

  const autoclusterRef = asyncComputed(async () => {
    if (
      storage.file === null ||
      selectionStore.band === null ||
      integrationRef.value === null
    ) {
      return null;
    }

    return await worker.readAutocluster(
      storage.file,
      selectionStore.band,
      integrationRef.value,
    );
  });

  const groupedTimestampsRef = asyncComputed(async () => {
    if (
      storage.file === null ||
      selectionStore.band === null ||
      integrationRef.value === null
    ) {
      return null;
    }

    return await worker.readGroupedTimestamps(
      storage.file,
      selectionStore.band,
      integrationRef.value,
    );
  });

  const reducedFeaturesRef = asyncComputed(async () => {
    if (
      storage.file === null ||
      selectionStore.reducer === null ||
      selectionStore.band === null ||
      integrationRef.value === null
    ) {
      return null;
    }

    return await worker.readReducedFeatures(
      storage.file,
      selectionStore.reducer,
      selectionStore.band,
      integrationRef.value,
    );
  });

  const readReducedFeatures = async () => {
    if (
      storage.file === null ||
      selectionStore.reducer === null ||
      selectionStore.band === null ||
      integrationRef.value === null
    ) {
      return null;
    }

    return await worker.readReducedFeatures(
      storage.file,
      selectionStore.reducer,
      selectionStore.band,
      integrationRef.value,
    );
  };

  const matricesRef = asyncComputed(async () => {
    if (
      storage.file === null ||
      selectionStore.band === null ||
      integrationRef.value === null
    ) {
      return null;
    }

    return await worker.readMatrices(
      storage.file,
      selectionStore.band,
      integrationRef.value,
    );
  });

  const pairingsRef = asyncComputed(async () => {
    if (
      storage.file === null ||
      selectionStore.band === null ||
      integrationRef.value === null
    ) {
      return null;
    }

    return await worker.readPairings(
      storage.file,
      selectionStore.band,
      integrationRef.value,
    );
  });

  const readGroupedFeatures = async (fileIndex: number, groupIndex: number) => {
    if (
      storage.file === null ||
      selectionStore.band === null ||
      integrationRef.value === null
    ) {
      return null;
    }

    return worker.readGroupedFeatures(
      storage.file,
      selectionStore.band,
      integrationRef.value,
    );
  };

  const readFile = async (fileIndex: number) => {
    if (storage.file === null) {
      return null;
    }

    return await worker.readFile(storage.file, fileIndex);
  };

  const readGroupIndexFromTimestamp = async (timestamp: number) => {
    if (
      storage.file === null ||
      selectionStore.band === null ||
      integrationRef.value === null
    ) {
      return [];
    }

    const timestamps = await worker.readGroupedTimestamps(
      storage.file,
      selectionStore.band,
      integrationRef.value,
    );

    const groupLength = timestamps[0].length;
    const timestampIndex = timestamps.flat().indexOf(timestamp);
    const groupIndex = timestampIndex % groupLength;

    return [groupIndex, integrationRef.value];
  };

  const readVolume = async (volumeIndex: number, metaIndex: number) => {
    if (
      storage.file === null ||
      selectionStore.band === null ||
      integrationRef.value === null
    ) {
      return null;
    }

    return await worker.readVolume(
      storage.file,
      selectionStore.band,
      integrationRef.value,
      volumeIndex,
      metaIndex,
    );
  };

  const readMatrix = async (matrixIndex: number, metaIndex: number) => {
    if (
      storage.file === null ||
      selectionStore.band === null ||
      integrationRef.value === null
    ) {
      return null;
    }

    return worker.readMatrix(
      storage.file,
      selectionStore.band,
      integrationRef.value,
      matrixIndex,
      metaIndex,
    );
  };

  const readPairing = async (
    pairingIndex: number,
    metaIndexA: number,
    metaIndexB: number,
  ) => {
    if (
      storage.file === null ||
      selectionStore.band === null ||
      integrationRef.value === null
    ) {
      return null;
    }

    return await worker.readPairing(
      storage.file,
      selectionStore.band,
      integrationRef.value,
      pairingIndex,
      metaIndexA,
      metaIndexB,
    );
  };

  return {
    // Refs
    isReadyRef: isReadyRef,
    lengthPerGroupRef: lengthPerGroupRef,
    autoclusterRef: autoclusterRef,
    groupedTimestampsRef: groupedTimestampsRef,
    reducedFeaturesRef: reducedFeaturesRef,
    matricesRef: matricesRef,
    pairingsRef: pairingsRef,
    // Actions
    load: load,
    unload: unload,
    readGroupIndexFromTimestamp: readGroupIndexFromTimestamp,
    readGroupedFeatures: readGroupedFeatures,
    readFile: readFile,
    readVolume: readVolume,
    readMatrix: readMatrix,
    readPairing: readPairing,
    readReducedFeatures: readReducedFeatures,
  };
}
