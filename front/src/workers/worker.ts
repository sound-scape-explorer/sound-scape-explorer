import type {Dataset, File as H5File, Group} from 'h5wasm';
import h5wasm from 'h5wasm';
import {StoragePath} from '../storage/StoragePath';
import {trimRectangular} from '../utils/trim-rectangular';
import type {StorageReducer} from 'src/hooks/useStorageReducers';
import type {StorageMetas} from 'src/hooks/useStorageMetas';
import type {StorageSettings} from 'src/storage/StorageSettings';
import type {StorageRanges} from 'src/hooks/useStorageRanges';
import {StorageMode} from 'src/storage/StorageMode';
import type {ConfigTrajectory} from 'src/hooks/useConfigTrajectories';
import type {ConfigBand} from 'src/hooks/useConfigBands';
import type {ConfigIntegration} from 'src/hooks/useConfigIntegrations';
import type {ConfigFile} from 'src/hooks/useConfigFiles';

interface Volume {
  index: number;
  name: string;
  values: number[];
}

type Indicator = Volume;
type Matrix = Volume;

interface Pairing {
  index: number;
  name: string;
  values: number[][];
}

let h5: H5File;
const PATH = '/work';

console.log('worker');

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

  h5 = new h5wasm.File(`${PATH}/${file.name}`, StorageMode.readonly);

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
    h5.get(StoragePath.integrations_durations) as Dataset
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

export async function readConfigFiles(file: File): Promise<ConfigFile[]> {
  const h5 = await load(file);

  const namesDataset = h5.get(StoragePath.files_names) as Dataset;
  const names = namesDataset.to_array() as string[];

  const timestampsDataset = h5.get(StoragePath.files_timestamps) as Dataset;
  const timestamps = timestampsDataset.to_array() as number[];

  const sitesDataset = h5.get(StoragePath.files_sites) as Dataset;
  const sites = sitesDataset.to_array() as string[];

  const metasDataset = h5.get(StoragePath.files_metas) as Dataset;
  const metas = metasDataset.to_array() as string[][];

  const files: ConfigFile[] = [];
  const length = namesDataset.shape[0];

  for (let index = 0; index < length; index += 1) {
    const file: ConfigFile = {
      index: index,
      name: names[index],
      timestamp: timestamps[index],
      site: sites[index],
      meta: metas[index],
    };

    files.push(file);
  }

  return files;
}

export async function readFilenames(file: File) {
  const h5 = await load(file);
  const path = StoragePath.files_names;
  const dataset = h5.get(path) as Dataset;
  return dataset.to_array() as string[];
}

export async function readFilename(file: File, fileIndex: number) {
  const filenames = await readFilenames(file);
  return filenames[fileIndex];
}

export async function readFilesFeatures(file: File, band: string) {
  const h5 = await load(file);
  const path = `${StoragePath.files_features}/${band}`;
  const features = h5.get(path) as Dataset;
  return features.to_array() as number[][];
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

  const autoclusters = await readAutoclusters(file, band, integration);

  if (autoclusters.length > 0) {
    let a = 0;

    for (const autocluster of autoclusters) {
      const autoclusterSet = new Set(
        autocluster
          .map((n) => n.toString())
          .sort((a, b) => a.localeCompare(b, undefined, {numeric: true})),
      );

      metas[`AUTOCLUSTER_${a}`] = [...autoclusterSet];

      a += 1;
    }
  }

  for (let i = 0; i < metaPropertiesList.length; i += 1) {
    const property = metaPropertiesList[i];
    metas[property] = metaSetsList[i].filter((element) => element !== '');
  }

  return metas;
}

export async function readConfigBands(file: File): Promise<ConfigBand[]> {
  const h5 = await load(file);

  const namesDataset = h5.get(StoragePath.bands_names) as Dataset;
  const names = namesDataset.to_array() as string[];

  const lowsDataset = h5.get(StoragePath.bands_lows) as Dataset;
  const lows = lowsDataset.to_array() as number[];

  const highsDataset = h5.get(StoragePath.bands_highs) as Dataset;
  const highs = highsDataset.to_array() as number[];

  const bands = [];
  const length = namesDataset.shape[0];

  for (let index = 0; index < length; index += 1) {
    const band: ConfigBand = {
      index: index,
      name: names[index],
      low: lows[index],
      high: highs[index],
    };

    bands.push(band);
  }

  return bands;
}

export async function readConfigIntegrations(file: File) {
  const h5 = await load(file);

  const namesDataset = h5.get(StoragePath.integrations_names) as Dataset;
  const names = namesDataset.to_array() as string[];

  const durationsDataset = h5.get(
    StoragePath.integrations_durations,
  ) as Dataset;
  const durations = durationsDataset.to_array() as number[];

  const integrations: ConfigIntegration[] = [];
  const length = namesDataset.shape[0];

  for (let index = 0; index < length; index += 1) {
    const integration: ConfigIntegration = {
      index: index,
      name: names[index],
      duration: durations[index],
    };

    integrations.push(integration);
  }

  return integrations;
}

export async function readRanges(file: File) {
  const h5 = await load(file);

  const namesDataset = h5.get(StoragePath.ranges_names) as Dataset;
  const names = namesDataset.to_array() as string[];

  const startsDataset = h5.get(StoragePath.ranges_starts) as Dataset;
  const starts = startsDataset.to_array() as number[];

  const endsDataset = h5.get(StoragePath.ranges_ends) as Dataset;
  const ends = endsDataset.to_array() as number[];

  const ranges: StorageRanges = {};

  for (const n in names) {
    const range = names[n];
    const timestamp = [starts[n], ends[n]];

    ranges[range] = timestamp;
  }

  return ranges;
}

export async function readReducers(file: File) {
  const h5 = await load(file);

  const namesDataset = h5.get(StoragePath.reducers_names) as Dataset;
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

  const reducers: StorageReducer[] = [];

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
  const features = h5.get(path) as Dataset;
  const featuresList = features.to_array() as number[][];
  return featuresList;
}

export async function readAutoclusters(
  file: File,
  band: string,
  integration: number,
): Promise<number[][]> {
  const h5 = await load(file);

  const namesDataset = h5.get(StoragePath.autoclusters_names) as Dataset;
  const namesList = namesDataset.to_array() as string[];
  const namesCount = namesList.length;

  if (namesCount === 0) {
    return [];
  }

  const autoclusters = [];

  for (let i = 0; i < namesCount; i += 1) {
    const path = `${StoragePath.autocluster_}${i}/${band}/${integration}`;
    const dataset = h5.get(path) as Dataset;
    const values = dataset.to_array() as number[];
    autoclusters.push(values);
  }

  return autoclusters;
}

export async function readIndicators(
  file: File,
  band: string,
  integration: number,
) {
  const h5 = await load(file);

  const namesDataset = h5.get(StoragePath.indicators_names_names) as Dataset;
  const names = namesDataset.to_array() as string[];

  const indicators: Indicator[] = [];

  names.forEach((name, i) => {
    const path = `${StoragePath.indicator_}${i}/${band}/${integration}`;
    const dataset = h5.get(path) as Dataset;
    const values = dataset.to_array() as number[];

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

  const namesDataset = h5.get(StoragePath.volumes_names_names) as Dataset;
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

  const namesDataset = h5.get(StoragePath.matrices_names_names) as Dataset;
  const names = namesDataset.to_array() as string[];

  const matrices: Matrix[] = [];

  names.forEach((name, m) => {
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

  const namesDataset = h5.get(StoragePath.pairings_names_names) as Dataset;
  const names = namesDataset.to_array() as string[];

  const pairings: Pairing[] = [];

  names.forEach((name, p) => {
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
) {
  const h5 = await load(file);
  const path = `${StoragePath.grouped_features}/${band}/${integration}`;
  const features = h5.get(path) as Dataset;
  const array = features.to_array() as number[][];
  return array;
}

export async function readGroupedTimestamps(
  file: File,
  band: string,
  integration: number,
) {
  const h5 = await load(file);
  const path = `${StoragePath.grouped_timestamps}/${band}/${integration}`;
  const timestamps = h5.get(path) as Dataset;
  const array = timestamps.to_array() as number[];
  return array;
}

export async function readGroupedMetas(
  file: File,
  band: string,
  integration: number,
) {
  const files = await readFilenames(file);
  const filesMetas = await readFilesMetas(file);
  const autoclusters = await readAutoclusters(file, band, integration);
  const groupCounts = await readFilesGroupCounts(file, integration);

  const groupedMetas: string[][][] = [];
  let pointIndex = 0;

  for (let f = 0; f < files.length; f += 1) {
    const groupCount = groupCounts[f];
    groupedMetas[f] = [];

    for (let g = 0; g < groupCount; g += 1) {
      let metas: string[] = [];

      if (autoclusters.length > 0) {
        for (const autocluster of autoclusters) {
          metas.push(autocluster[pointIndex].toString());
        }
      }

      metas = [...metas, ...filesMetas[f]];
      groupedMetas[f].push(metas);

      pointIndex += 1;
    }
  }

  return groupedMetas.flat();
}

export async function readGroupedFilenames(file: File, integration: number) {
  const filenames = await readFilenames(file);
  const groupCounts = await readFilesGroupCounts(file, integration);

  const groupedFilenames: string[] = [];

  for (let f = 0; f < filenames.length; f += 1) {
    const groupCount = groupCounts[f];

    for (let s = 0; s < groupCount; s += 1) {
      const filename = filenames[f];
      groupedFilenames.push(filename);
    }
  }

  return groupedFilenames;
}

export async function readFilesGroupCounts(
  file: File,
  integration: number,
): Promise<number[]> {
  const h5 = await load(file);
  const path = `${StoragePath.files_group_counts}/${integration}`;
  const dataset = h5.get(path) as Dataset;
  const filesGroupCounts = dataset.to_array() as number[][];
  return filesGroupCounts.map((groupsCount) => groupsCount[0]);
}

export async function readConfigTrajectories(
  file: File,
): Promise<ConfigTrajectory[]> {
  const h5 = await load(file);

  const namesDataset = h5.get(StoragePath.trajectories_names) as Dataset;
  const names = namesDataset.to_array() as string[];

  const startsDataset = h5.get(StoragePath.trajectories_starts) as Dataset;
  const starts = startsDataset.to_array() as number[];

  const endsDataset = h5.get(StoragePath.trajectories_ends) as Dataset;
  const ends = endsDataset.to_array() as number[];

  const length = namesDataset.shape[0];

  const trajectories = [];

  for (let index = 0; index < length; index += 1) {
    const trajectory: ConfigTrajectory = {
      index: index,
      name: names[index],
      start: starts[index],
      end: ends[index],
    };

    trajectories.push(trajectory);
  }

  return trajectories;
}

export async function readTrajectory(
  file: File,
  band: string,
  integration: number,
  trajectoryIndex: number,
  reducerIndex: number,
): Promise<number[][]> {
  const h5 = await load(file);
  const path = `${StoragePath.trajectory_}${trajectoryIndex}/${reducerIndex}/${band}/${integration}`;
  const dataset = h5.get(path) as Dataset;
  const trajectories = dataset.to_array() as number[][];
  return trajectories;
}
