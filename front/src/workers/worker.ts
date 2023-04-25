import type {Dataset, File as H5File, Group} from 'h5wasm';
import h5wasm from 'h5wasm';
import {MATRIX_NAMES, PAIRING_NAMES} from '../constants';
import type {
  Reducer,
  StorageBands,
  StorageIntegrations,
  StorageMetas,
  StorageRanges,
  StorageSettings,
} from '../storage/storage';
import {StoragePath} from '../storage/StoragePath';
import type {Indicator, Matrix, Pairing} from '../storage/useStorage';
import {buildNestedArray} from '../utils/build-nested-array';
import {trimRectangular} from '../utils/trim-rectangular';

interface Volume {
  index: number;
  name: string;
  values: number[];
}

let h5: H5File;
const PATH = '/work';

export async function load(file: File) {
  if (h5) {
    return h5;
  }

  const {FS} = await h5wasm.ready;

  FS.mkdir(PATH);

  FS.mount(
    // @ts-expect-error: TS2339
    FS.filesystems.WORKERFS,
    {
      files: [file],
    },
    PATH,
  );

  h5 = new h5wasm.File(`${PATH}/${file.name}`, 'r');

  return h5;
}

export async function readSecondsFromIntegration(
  file: File,
  integrationName: string,
) {
  const h5 = await load(file);

  const integrations = (
    h5.get(StoragePath.integrations_names) as Dataset
  ).to_array() as string[];

  const seconds = (
    h5.get(StoragePath.integrations_seconds) as Dataset
  ).to_array() as number[];

  const index = integrations.indexOf(integrationName);

  if (index === -1) {
    throw new Error(`Integration not found: ${integrationName}`);
  }

  return seconds[index];
}

export async function readSettings(file: File) {
  const h5 = await load(file);

  const path = StoragePath.configuration;
  const configuration = h5.get(path) as Group;
  const settings = {} as StorageSettings;

  for (const setting in configuration.attrs) {
    // @ts-expect-error: TS2322
    settings[setting] = configuration.attrs[setting].to_array();
  }

  return settings;
}

export async function readFiles(file: File) {
  const h5 = await load(file);
  const path = StoragePath.files;
  const dataset = h5.get(path) as Dataset;
  return dataset.to_array() as string[];
}

export async function readFile(file: File, fileIndex: number) {
  const filenames = await readFiles(file);
  return filenames[fileIndex];
}

export async function readFilesFeatures(file: File, band: string) {
  const files = await readFiles(file);

  const h5 = await load(file);
  const features = [];

  for (const f in files) {
    const path = `${StoragePath.features}/${band}/${f}`;
    const feature = h5.get(path) as Dataset;
    features.push(feature.to_array() as number[]);
  }

  return features;
}

export async function readFilesMetas(file: File) {
  const h5 = await load(file);
  const path = StoragePath.files_metas;
  const metas = h5.get(path) as Dataset;
  return metas.to_array() as string[][];
}

export async function readMetas(file: File, band: string, integration: number) {
  const h5 = await load(file);
  const metaProperties = h5.get(StoragePath.meta_properties) as Dataset;
  const metaPropertiesList = metaProperties.to_array() as string[];

  const metaSets = h5.get(StoragePath.meta_sets) as Dataset;
  const metaSetsList = metaSets.to_array() as string[][];

  const metas: StorageMetas = {};

  const autoclusterPath = `${StoragePath.autocluster}/${band}/${integration}`;
  const autocluster = h5.get(autoclusterPath) as Dataset | null;

  if (autocluster !== null) {
    const autoclusterList = new Set(
      (autocluster.to_array() as number[]).map((n) => n.toString()).sort(),
    );
    metas['AUTOCLUSTER'] = [...autoclusterList];
  }

  for (let i = 0; i < metaPropertiesList.length; i += 1) {
    const property = metaPropertiesList[i];
    metas[property] = metaSetsList[i].filter((element) => element !== '');
  }

  return metas;
}

export async function readBands(file: File) {
  const h5 = await load(file);

  const namesDataset = h5.get(StoragePath.bands_names) as Dataset;
  const names = namesDataset.to_array() as string[];

  const frequenciesDataset = h5.get(StoragePath.bands_frequencies) as Dataset;
  const frequencies = frequenciesDataset.to_array() as number[][];

  const bands: StorageBands = {};

  for (const [b, band] of names.entries()) {
    bands[band] = frequencies[b];
  }

  return bands;
}

export async function readIntegrations(file: File) {
  const h5 = await load(file);
  const names = h5.get(StoragePath.integrations_names) as Dataset;
  const namesList = names.to_array() as string[];

  const seconds = h5.get(StoragePath.integrations_seconds) as Dataset;
  const secondsList = seconds.to_array() as number[];

  const integrations: StorageIntegrations = {};

  for (const [i, integration] of namesList.entries()) {
    integrations[integration] = secondsList[i];
  }

  return integrations;
}

export async function readRanges(file: File) {
  const h5 = await load(file);

  const namesDataset = h5.get(StoragePath.ranges_names) as Dataset;
  const names = namesDataset.to_array() as string[];
  const timestampsDataset = h5.get(StoragePath.ranges_timestamps) as Dataset;
  const timestamps = timestampsDataset.to_array() as number[][];

  const ranges: StorageRanges = {};

  for (const n in names) {
    const range = names[n];
    ranges[range] = timestamps[n];
  }

  return ranges;
}

export async function readReducers(file: File) {
  const h5 = await load(file);

  const namesDataset = h5.get(StoragePath.reducers) as Dataset;
  const names = namesDataset.to_array() as string[];

  const dimensionsDataset = h5.get(StoragePath.reducers_dimensions) as Dataset;
  const dimensions = dimensionsDataset.to_array() as number[];

  const bandsDataset = h5.get(StoragePath.reducers_bands) as Dataset;
  const bandsRectangular = bandsDataset.to_array() as string[][];
  const bands = trimRectangular(bandsRectangular, '');

  const integrationsDataset = h5.get(
    StoragePath.reducers_integrations,
  ) as Dataset;
  const integrationsRectangular = integrationsDataset.to_array() as string[][];
  const integrations = trimRectangular(integrationsRectangular, '');

  const rangesDataset = h5.get(StoragePath.reducers_ranges) as Dataset;
  const rangesRectangular = rangesDataset.to_array() as string[][];
  const ranges = trimRectangular(rangesRectangular, '');

  const reducers: Reducer[] = [];

  for (let i = 0; i < names.length; i += 1) {
    const reducer = {
      index: i,
      name: names[i],
      dimensions: dimensions[i],
      bands: bands[i],
      integrations: integrations[i],
      ranges: ranges[i],
    };

    reducers.push(reducer);
  }

  return reducers;
}

/**
 * @param {File} file - The input file.
 * @param {number} r - The reducer index.
 * @param {string} band - The band name.
 * @param {number} integration - The number of seconds for the current integration.
 */
export async function readReducedFeatures(
  file: File,
  r: number,
  band: string,
  integration: number,
): Promise<number[][]> {
  const h5 = await load(file);
  const path = `${StoragePath.reduced_}${r}/${band}/${integration}`;

  const group = h5.get(path) as Group;
  const features = [];

  for (const fileIndex in group.keys()) {
    const dataset = group.get(fileIndex) as Dataset;
    const array = dataset.to_array() as number[][];
    features.push(...array);
  }

  return features;
}

export async function getLengthPerGroup(
  file: File,
  band: string,
  integration: number,
) {
  const h5 = await load(file);

  const f = 0;
  const path = `${StoragePath.grouped_timestamps}/${band}/${integration}/${f}`;
  const dataset = h5.get(path) as Dataset;
  return dataset.shape[0];
}

export async function readAutocluster(
  file: File,
  band: string,
  integration: number,
) {
  const h5 = await load(file);
  const path = `${StoragePath.autocluster}/${band}/${integration}`;
  const autoclusterDatasetOrNull = h5.get(path) as Dataset | null;

  if (autoclusterDatasetOrNull === null) {
    return [];
  }

  const lengthPerGroup = await getLengthPerGroup(file, band, integration);
  const autoclusterFlat = autoclusterDatasetOrNull.to_array() as number[];

  return buildNestedArray(autoclusterFlat, lengthPerGroup);
}

export async function readIndicators(
  file: File,
  band: string,
  integration: number,
) {
  const h5 = await load(file);

  const namesDataset = h5.get(StoragePath.indicators) as Dataset;
  const names = namesDataset.to_array() as string[];

  const indicators: Indicator[] = [];

  names.forEach((name, i) => {
    const path = `${StoragePath.indicator_}${i}/${band}/${integration}`;
    const group = h5.get(path) as Group;

    let values: number[] = [];

    for (const g in group.keys()) {
      const dataset = h5.get(`${path}/${g}`) as Dataset;
      values = [...values, ...(dataset.to_array() as number[])];
    }

    const indicator: Indicator = {
      index: i,
      name: name,
      values: values,
    };

    indicators.push(indicator);
  });

  return indicators;
}

export async function readVolumes(
  file: File,
  band: string,
  integration: number,
) {
  const h5 = await load(file);

  const namesDataset = h5.get(StoragePath.volumes) as Dataset;
  const names = namesDataset.to_array() as string[];

  const volumes: Volume[] = [];

  names.forEach((name, v) => {
    const groupPath = `${StoragePath.volume_}${v}/${band}/${integration}`;
    const group = h5.get(groupPath) as Group;

    if (group === null) {
      return;
    }

    let values: number[] = [];

    for (const g in group.keys()) {
      const path = `${groupPath}/${g}`;
      const dataset = h5.get(path) as Dataset;
      values = [...values, ...(dataset.to_array() as number[])];
    }

    const volume: Volume = {
      index: v,
      name: name,
      values: values,
    };

    volumes.push(volume);
  });

  return volumes;
}

export async function readVolume(
  file: File,
  band: string,
  integration: number,
  volumeIndex: number,
  metaIndex: number,
) {
  const h5 = await load(file);

  const path = `${StoragePath.volume_}${volumeIndex}/${band}/${integration}/${metaIndex}`;
  const dataset = h5.get(path) as Dataset;

  return dataset.to_array() as number[];
}

export async function readMatrices(
  file: File,
  band: string,
  integration: number,
) {
  const h5 = await load(file);

  const matrices: Matrix[] = [];

  MATRIX_NAMES.forEach((name, m) => {
    const groupPath = `${StoragePath.matrix_}${m}/${band}/${integration}`;
    const group = h5.get(groupPath) as Group;

    let values: number[] = [];

    for (const g in group.keys()) {
      const path = `${groupPath}/${g}`;
      const dataset = h5.get(path) as Dataset;
      values = [...values, ...(dataset.to_array() as number[])];
    }

    const matrix: Matrix = {
      index: m,
      name: name,
      values: values,
    };

    matrices.push(matrix);
  });

  return matrices;
}

export async function readMatrix(
  file: File,
  band: string,
  integration: number,
  matrixIndex: number,
  metaIndex: number,
) {
  const h5 = await load(file);
  const path = `${StoragePath.matrix_}${matrixIndex}/${band}/${integration}/${metaIndex}`;
  const dataset = h5.get(path) as Dataset;
  return dataset.to_array() as number[];
}

export async function readPairings(
  file: File,
  band: string,
  integration: number,
) {
  const h5 = await load(file);

  const pairings: Pairing[] = [];

  PAIRING_NAMES.forEach((name, p) => {
    const path = `${StoragePath.pairing_}${p}/${band}/${integration}`;
    const group1 = h5.get(path) as Group;

    let values: number[][] = [];

    for (const g1 in group1.keys()) {
      const group2 = h5.get(`${path}/${g1}`) as Group;

      for (const g2 in group2.keys()) {
        const dataset = h5.get(`${path}/${g1}/${g2}`) as Dataset;
        values = [...values, dataset.to_array() as number[]];
      }
    }

    const pairing: Pairing = {
      index: p,
      name: name,
      values: values,
    };

    pairings.push(pairing);
  });

  return pairings;
}

export async function readPairing(
  file: File,
  band: string,
  integration: number,
  pairingIndex: number,
  metaIndexA: number,
  metaIndexB: number,
) {
  const h5 = await load(file);
  const path = `${StoragePath.pairing_}${pairingIndex}/${band}/${integration}/${metaIndexA}/${metaIndexB}`;
  const dataset = h5.get(path) as Dataset;
  return dataset.to_array() as number[];
}

export async function readGroupedFeatures(
  file: File,
  band: string,
  integration: number,
  fileIndex: number,
  groupIndex: number,
) {
  const h5 = await load(file);
  const path = `${StoragePath.grouped_features}/${band}/${integration}/${fileIndex}`;
  const features = h5.get(path) as Dataset;
  const array = features.to_array() as number[][];
  return array[groupIndex];
}

export async function readGroupedTimestamps(
  file: File,
  band: string,
  integration: number,
) {
  const h5 = await load(file);
  const path = `${StoragePath.grouped_timestamps}/${band}/${integration}`;

  const timestampsGroup = h5.get(path) as Group;

  const timestamps: number[][] = [];

  for (const fileIndex in timestampsGroup.keys()) {
    const dataset = timestampsGroup.get(fileIndex) as Dataset;
    const array = dataset.to_array() as number[];
    timestamps.push(array);
  }

  return timestamps;
}
