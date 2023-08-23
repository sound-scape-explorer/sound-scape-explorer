import type {Dataset, File as H5File, Group} from 'h5wasm';
import h5wasm from 'h5wasm';
import type {
  BlockDetails,
  IntervalDetails,
} from 'src/hooks/useAggregatedIntervalDetails';
import type {AggregatedSite} from 'src/hooks/useAggregatedSites';
import type {Band} from 'src/hooks/useBands';
import type {Extractor} from 'src/hooks/useExtractors';
import type {File as FileConfig} from 'src/hooks/useFiles';
import type {Integration} from 'src/hooks/useIntegrations';
import type {Labels} from 'src/hooks/useLabels';
import type {Range} from 'src/hooks/useRanges';
import type {ReducedFeatures} from 'src/hooks/useReducedFeatures';
import type {ReducerFromStorage} from 'src/hooks/useReducers';
import type {Site} from 'src/hooks/useSites';
import type {
  TracedData,
  TracedRelativeTimestamps,
  TracedTimestamps,
} from 'src/hooks/useTraced';
import type {Trajectory} from 'src/hooks/useTrajectories';
import {StorageMode} from 'src/storage/StorageMode';
import type {StorageSettings} from 'src/storage/StorageSettings';

import {StoragePath} from '../storage/StoragePath';
import {trimRectangular} from '../utils/trim-rectangular';

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

  const path = StoragePath.settings;
  const configuration = h5.get(path) as Group;
  const settings = {} as StorageSettings;

  for (const setting in configuration.attrs) {
    // @ts-expect-error: TS2322
    settings[setting] = configuration.attrs[setting].to_array();
  }

  return settings;
}

export async function readFiles(file: File): Promise<FileConfig[]> {
  const h5 = await load(file);

  const namesDataset = h5.get(StoragePath.files_names) as Dataset;
  const names = namesDataset.to_array() as string[];

  const timestampsDataset = h5.get(StoragePath.files_timestamps) as Dataset;
  const timestamps = timestampsDataset.to_array() as number[];

  const sitesDataset = h5.get(StoragePath.files_sites) as Dataset;
  const sites = sitesDataset.to_array() as string[];

  const labelsDataset = h5.get(StoragePath.files_labels) as Dataset;
  const labels = labelsDataset.to_array() as string[][];

  const files: FileConfig[] = [];
  const length = namesDataset.shape[0];

  for (let index = 0; index < length; index += 1) {
    const file: FileConfig = {
      index: index,
      name: names[index],
      timestamp: timestamps[index],
      site: sites[index],
      labels: labels[index],
    };

    files.push(file);
  }

  return files;
}

export async function readSites(file: File): Promise<Site[]> {
  const h5 = await load(file);

  const namesDataset = h5.get(StoragePath.sites_names) as Dataset;
  const names = namesDataset.to_array() as string[];

  const fileIndexesDataset = h5.get(StoragePath.sites_file_indexes) as Dataset;
  const fileIndexes = fileIndexesDataset.to_array() as number[][];

  const sites: Site[] = [];

  for (let index = 0; index < names.length; index += 1) {
    const site: Site = {
      index: index,
      name: names[index],
      fileIndexes: fileIndexes[index],
    };

    sites.push(site);
  }

  return sites;
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

export async function readFilesMetas(file: File) {
  const h5 = await load(file);
  const path = StoragePath.files_labels;
  const metas = h5.get(path) as Dataset;
  return metas.to_array() as string[][];
}

export async function readLabels(
  file: File,
  bandName: string,
  integrationSeconds: number,
): Promise<Labels> {
  const h5 = await load(file);

  const propertiesDataset = h5.get(StoragePath.labels_properties) as Dataset;
  const properties = propertiesDataset.to_array() as string[];

  const setsDataset = h5.get(StoragePath.labels_sets) as Dataset;
  const sets = setsDataset.to_array() as string[][];

  const labels: Labels = {};

  const autoclusters = await readAutoclusters(
    file,
    bandName,
    integrationSeconds,
  );

  if (autoclusters.length > 0) {
    let a = 0;

    for (const autocluster of autoclusters) {
      const autoclusterSet = new Set(
        autocluster
          .map((n) => n.toString())
          .sort((a, b) => a.localeCompare(b, undefined, {numeric: true})),
      );

      labels[`AUTOCLUSTER_${a}`] = [...autoclusterSet];

      a += 1;
    }
  }

  for (let i = 0; i < properties.length; i += 1) {
    const property = properties[i];
    labels[property] = sets[i].filter((element) => element !== '');
  }

  return labels;
}

export async function readBands(file: File): Promise<Band[]> {
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
    const band: Band = {
      index: index,
      name: names[index],
      low: lows[index],
      high: highs[index],
    };

    bands.push(band);
  }

  return bands;
}

export async function readIntegrations(file: File): Promise<Integration[]> {
  const h5 = await load(file);

  const namesDataset = h5.get(StoragePath.integrations_names) as Dataset;
  const names = namesDataset.to_array() as string[];

  const secondsDataset = h5.get(StoragePath.integrations_seconds) as Dataset;
  const seconds = secondsDataset.to_array() as number[];

  const integrations: Integration[] = [];
  const length = namesDataset.shape[0];

  for (let index = 0; index < length; index += 1) {
    const integration: Integration = {
      index: index,
      name: names[index],
      seconds: seconds[index],
    };

    integrations.push(integration);
  }

  return integrations;
}

export async function readRanges(file: File): Promise<Range[]> {
  const h5 = await load(file);

  const namesDataset = h5.get(StoragePath.ranges_names) as Dataset;
  const names = namesDataset.to_array() as string[];

  const startsDataset = h5.get(StoragePath.ranges_starts) as Dataset;
  const starts = startsDataset.to_array() as number[];

  const endsDataset = h5.get(StoragePath.ranges_ends) as Dataset;
  const ends = endsDataset.to_array() as number[];

  const ranges: Range[] = [];
  const length = namesDataset.shape[0];

  for (let index = 0; index < length; index += 1) {
    const range: Range = {
      index: index,
      name: names[index],
      start: starts[index],
      end: ends[index],
    };

    ranges.push(range);
  }

  return ranges;
}

export async function readExtractors(file: File): Promise<Extractor[]> {
  const h5 = await load(file);

  const namesDataset = h5.get(StoragePath.extractors_names) as Dataset;
  const names = namesDataset.to_array() as string[];

  const offsetsDataset = h5.get(StoragePath.extractors_offsets) as Dataset;
  const offsets = offsetsDataset.to_array() as number[];

  const stepsDataset = h5.get(StoragePath.extractors_steps) as Dataset;
  const steps = stepsDataset.to_array() as number[];

  const persistsDataset = h5.get(StoragePath.extractors_persists) as Dataset;
  const persists = persistsDataset.to_array() as number[];

  const extractors: Extractor[] = [];
  const length = namesDataset.shape[0];

  for (let index = 0; index < length; index += 1) {
    const extractor: Extractor = {
      index: index,
      name: names[index],
      offset: offsets[index],
      step: steps[index],
      persist: persists[index] === 1 ? true : false,
    };

    extractors.push(extractor);
  }

  return extractors;
}

export async function readReducers(file: File): Promise<ReducerFromStorage[]> {
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

  const reducers: ReducerFromStorage[] = [];
  const length = namesDataset.shape[0];

  for (let index = 0; index < length; index += 1) {
    const reducer: ReducerFromStorage = {
      index: index,
      name: names[index],
      dimensions: dimensions[index],
      bandsNames: bands[index],
      integrationsNames: integrations[index],
      rangesNames: ranges[index],
    };

    reducers.push(reducer);
  }

  return reducers;
}

export async function readReducedFeatures(
  file: File,
  bandName: string,
  integrationSeconds: number,
  extractorIndex: number,
  reducerIndex: number,
): Promise<ReducedFeatures> {
  const h5 = await load(file);
  const path = `${StoragePath.reduced}/${bandName}/${integrationSeconds}/${extractorIndex}/${reducerIndex}`;
  const dataset = h5.get(path) as Dataset;
  const features = dataset.to_array() as number[][];
  return features;
}

export async function readAutoclusters(
  file: File,
  bandName: string,
  integrationSeconds: number,
): Promise<string[][]> {
  const h5 = await load(file);

  const namesDataset = h5.get(StoragePath.autoclusters_names) as Dataset;
  const namesList = namesDataset.to_array() as string[];
  const namesCount = namesList.length;

  if (namesCount === 0) {
    return [];
  }

  const autoclusters = [];

  for (let i = 0; i < namesCount; i += 1) {
    const path = `${StoragePath.autoclustered}/${bandName}/${integrationSeconds}/${i}`;
    const dataset = h5.get(path) as Dataset;
    const values = dataset.to_array() as number[];
    autoclusters.push(values.map((v) => v.toString()));
  }

  return autoclusters;
}

// export async function readIndicators(
//   file: File,
//   band: string,
//   integration: number,
// ) {
//   const h5 = await load(file);
//
//   const namesDataset = h5.get(StoragePath.indicators_names_names) as Dataset;
//   const names = namesDataset.to_array() as string[];
//
//   const indicators: Indicator[] = [];
//
//   names.forEach((name, i) => {
//     const path = `${StoragePath.indicator_}${i}/${band}/${integration}`;
//     const dataset = h5.get(path) as Dataset;
//     const values = dataset.to_array() as number[];
//
//     const indicator: Indicator = {
//       index: i,
//       name: name,
//       values: values,
//     };
//
//     indicators.push(indicator);
//   });
//
//   return indicators;
// }

// export async function readVolumes(
//   file: File,
//   band: string,
//   integration: number,
// ) {
//   const h5 = await load(file);
//
//   const namesDataset = h5.get(StoragePath.volumes_names_names) as Dataset;
//   const names = namesDataset.to_array() as string[];
//
//   const volumes: Volume[] = [];
//
//   names.forEach((name, v) => {
//     const groupPath = `${StoragePath.volume_}${v}/${band}/${integration}`;
//     const group = h5.get(groupPath) as Group;
//
//     if (group === null) {
//       return;
//     }
//
//     let values: number[] = [];
//
//     for (const g in group.keys()) {
//       const path = `${groupPath}/${g}`;
//       const dataset = h5.get(path) as Dataset;
//       values = [...values, ...(dataset.to_array() as number[])];
//     }
//
//     const volume: Volume = {
//       index: v,
//       name: name,
//       values: values,
//     };
//
//     volumes.push(volume);
//   });
//
//   return volumes;
// }

// export async function readVolume(
//   file: File,
//   band: string,
//   integration: number,
//   volumeIndex: number,
//   metaIndex: number,
// ): Promise<number[]> {
//   const h5 = await load(file);
//   const path = `${StoragePath.volume_}${volumeIndex}/${band}/${integration}/${metaIndex}`;
//   const dataset = h5.get(path) as Dataset;
//   const values = dataset.to_array() as number[];
//   return values;
// }

// export async function readMatrices(
//   file: File,
//   band: string,
//   integration: number,
// ) {
//   const h5 = await load(file);
//
//   const namesDataset = h5.get(StoragePath.matrices_names_names) as Dataset;
//   const names = namesDataset.to_array() as string[];
//
//   const matrices: Matrix[] = [];
//
//   names.forEach((name, m) => {
//     const groupPath = `${StoragePath.matrix_}${m}/${band}/${integration}`;
//     const group = h5.get(groupPath) as Group;
//
//     let values: number[] = [];
//
//     for (const g in group.keys()) {
//       const path = `${groupPath}/${g}`;
//       const dataset = h5.get(path) as Dataset;
//       values = [...values, ...(dataset.to_array() as number[])];
//     }
//
//     const matrix: Matrix = {
//       index: m,
//       name: name,
//       values: values,
//     };
//
//     matrices.push(matrix);
//   });
//
//   return matrices;
// }

// export async function readMatrix(
//   file: File,
//   band: string,
//   integration: number,
//   matrixIndex: number,
//   metaIndex: number,
// ): Promise<number[][]> {
//   const h5 = await load(file);
//   const path = `${StoragePath.matrix_}${matrixIndex}/${band}/${integration}/${metaIndex}`;
//   const dataset = h5.get(path) as Dataset;
//   const values = dataset.to_array() as number[][];
//   return values;
// }

// export async function readPairings(
//   file: File,
//   band: string,
//   integration: number,
// ) {
//   const h5 = await load(file);
//
//   const namesDataset = h5.get(StoragePath.pairings_names_names) as Dataset;
//   const names = namesDataset.to_array() as string[];
//
//   const pairings: Pairing[] = [];
//
//   names.forEach((name, p) => {
//     const path = `${StoragePath.pairing_}${p}/${band}/${integration}`;
//     const group1 = h5.get(path) as Group;
//
//     let values: number[][] = [];
//
//     for (const g1 in group1.keys()) {
//       const group2 = h5.get(`${path}/${g1}`) as Group;
//
//       for (const g2 in group2.keys()) {
//         const dataset = h5.get(`${path}/${g1}/${g2}`) as Dataset;
//         values = [...values, dataset.to_array() as number[]];
//       }
//     }
//
//     const pairing: Pairing = {
//       index: p,
//       name: name,
//       values: values,
//     };
//
//     pairings.push(pairing);
//   });
//
//   return pairings;
// }

// export async function readPairing(
//   file: File,
//   band: string,
//   integration: number,
//   pairingIndex: number,
//   metaIndexA: number,
//   metaIndexB: number,
// ): Promise<number[][]> {
//   const h5 = await load(file);
//   const path = `${StoragePath.pairing_}${pairingIndex}/${band}/${integration}/${metaIndexA}/${metaIndexB}`;
//   const dataset = h5.get(path) as Dataset;
//   const values = dataset.to_array() as number[][];
//   return values;
// }

export async function readGroupedFeatures(
  file: File,
  bandName: string,
  integrationSeconds: number,
  extractorIndex: number,
) {
  const h5 = await load(file);
  const path = `${StoragePath.aggregated}/${bandName}/${integrationSeconds}/${extractorIndex}`;
  const features = h5.get(path) as Dataset;
  const array = features.to_array() as number[][];
  return array;
}

export async function readGroupedTimestamps(
  file: File,
  bandName: string,
  integrationSeconds: number,
  extractorIndex: number,
) {
  const h5 = await load(file);
  const path = `${StoragePath.aggregated_timestamps}/${bandName}/${integrationSeconds}/${extractorIndex}`;
  const timestamps = h5.get(path) as Dataset;
  const array = timestamps.to_array() as number[];
  return array;
}

// export async function readGroupedMetas(
//   file: File,
//   band: string,
//   integration: number,
// ) {
//   const files = await readFilenames(file);
//   const filesMetas = await readFilesMetas(file);
//   const autoclusters = await readAutoclusters(file, band, integration);
//   const groupCounts = await readFilesGroupCounts(file, integration);
//
//   const groupedMetas: string[][][] = [];
//   let pointIndex = 0;
//
//   for (let f = 0; f < files.length; f += 1) {
//     const groupCount = groupCounts[f];
//     groupedMetas[f] = [];
//
//     for (let g = 0; g < groupCount; g += 1) {
//       let metas: string[] = [];
//
//       if (autoclusters.length > 0) {
//         for (const autocluster of autoclusters) {
//           metas.push(autocluster[pointIndex].toString());
//         }
//       }
//
//       metas = [...metas, ...filesMetas[f]];
//       groupedMetas[f].push(metas);
//
//       pointIndex += 1;
//     }
//   }
//
//   return groupedMetas.flat();
// }

// export async function readGroupedFilenames(file: File, integration: number) {
//   const filenames = await readFilenames(file);
//   const groupCounts = await readFilesGroupCounts(file, integration);
//
//   const groupedFilenames: string[] = [];
//
//   for (let f = 0; f < filenames.length; f += 1) {
//     const groupCount = groupCounts[f];
//
//     for (let s = 0; s < groupCount; s += 1) {
//       const filename = filenames[f];
//       groupedFilenames.push(filename);
//     }
//   }
//
//   return groupedFilenames;
// }

// export async function readFilesGroupCounts(
//   file: File,
//   integration: number,
// ): Promise<number[]> {
//   const h5 = await load(file);
//   const path = `${StoragePath.files_group_counts}/${integration}`;
//   const dataset = h5.get(path) as Dataset;
//   const filesGroupCounts = dataset.to_array() as number[][];
//   return filesGroupCounts.map((groupsCount) => groupsCount[0]);
// }

export async function readTrajectories(file: File): Promise<Trajectory[]> {
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
    const trajectory: Trajectory = {
      index: index,
      name: names[index],
      start: starts[index],
      end: ends[index],
    };

    trajectories.push(trajectory);
  }

  return trajectories;
}

export async function readTraced(
  file: File,
  bandName: string,
  integrationSeconds: number,
  extractorIndex: number,
  reducerIndex: number,
  trajectoryIndex: number,
): Promise<[TracedData, TracedTimestamps, TracedRelativeTimestamps]> {
  const h5 = await load(file);

  const dataPath = `${StoragePath.traced}/${bandName}/${integrationSeconds}/${extractorIndex}/${reducerIndex}/${trajectoryIndex}`;
  const dataDataset = h5.get(dataPath) as Dataset;
  const data = dataDataset.to_array() as number[][];

  const timestampsPath = `${StoragePath.traced_timestamps}/${bandName}/${integrationSeconds}/${extractorIndex}/${reducerIndex}/${trajectoryIndex}`;
  const timestampsDataset = h5.get(timestampsPath) as Dataset;
  const timestamps = timestampsDataset.to_array() as number[];

  // Building indices of the original order for easy sorting
  const indices = Array.from({length: timestamps.length}, (_, i) => i);
  indices.sort((a, b) => timestamps[a] - timestamps[b]);

  const sortedData = indices.map((i) => data[i]);
  const sortedTimestamps = indices.map((i) => timestamps[i]);
  const relativeTimestamps = sortedTimestamps.map(
    (t) => t - sortedTimestamps[0],
  );

  return [sortedData, sortedTimestamps, relativeTimestamps];
}

export async function readAggregated(
  file: File,
  bandName: string,
  integrationSeconds: number,
  extractorIndex: number,
) {
  const h5 = await load(file);
  const path = `${StoragePath.aggregated}/${bandName}/${integrationSeconds}/${extractorIndex}`;
  const dataset = h5.get(path) as Dataset;
  const features = dataset.to_array() as number[][];
  return features;
}

export async function readAggregatedTimestamps(
  file: File,
  bandName: string,
  integrationSeconds: number,
  extractorIndex: number,
): Promise<number[]> {
  const h5 = await load(file);
  const path = `${StoragePath.aggregated_timestamps}/${bandName}/${integrationSeconds}/${extractorIndex}`;
  const timestampsDataset = h5.get(path) as Dataset;
  const timestamps = timestampsDataset.to_array() as number[][];
  return timestamps.map((t) => t[0]);
}

export async function readAggregatedSites(
  file: File,
  bandName: string,
  integrationSeconds: number,
  extractorIndex: number,
): Promise<AggregatedSite[]> {
  const h5 = await load(file);
  const path = `${StoragePath.aggregated_sites}/${bandName}/${integrationSeconds}/${extractorIndex}`;
  const dataset = h5.get(path) as Dataset;
  const siteFileIndexes = dataset.to_array() as string[][];

  const sites: AggregatedSite[] = [];

  for (const item of siteFileIndexes) {
    const site: AggregatedSite = {
      site: item[0],
    };

    sites.push(site);
  }

  return sites;
}

export async function readAggregatedIntervalDetails(
  file: File,
  bandName: string,
  integrationSeconds: number,
  extractorIndex: number,
): Promise<IntervalDetails[]> {
  const h5 = await load(file);
  const settings = await readSettings(file);

  const path = `${StoragePath.aggregated_interval_details}/${bandName}/${integrationSeconds}/${extractorIndex}`;
  const dataset = h5.get(path) as Dataset;
  // TODO: This can be non rectangular,
  const strings_list = dataset.to_array() as string[][];

  const intervalDetails: IntervalDetails[] = [];

  for (const strings of strings_list) {
    const blocksDetails: BlockDetails[] = [];

    for (const string of strings) {
      const elements = string.split('/');
      const fullPath = `/${elements.slice(2).join('/')}`;
      const relativePath = fullPath.replace(settings.audio_path, '');

      const blockDetails: BlockDetails = {
        start: Number(elements[0]),
        fileStart: Number(elements[1]),
        file: relativePath,
      };

      blocksDetails.push(blockDetails);
    }

    intervalDetails.push(blocksDetails);
  }

  return intervalDetails;
}

export async function readAggregatedLabels(
  file: File,
  bandName: string,
  integrationSeconds: number,
  extractorIndex: number,
): Promise<string[][]> {
  const h5 = await load(file);
  const path = `${StoragePath.aggregated_labels}/${bandName}/${integrationSeconds}/${extractorIndex}`;
  const labelsDataset = h5.get(path) as Dataset;
  const labels = labelsDataset.to_array() as string[][];

  const autoclusters = await readAutoclusters(
    file,
    bandName,
    integrationSeconds,
  );

  if (autoclusters.length > 0) {
    for (const autocluster of autoclusters.reverse()) {
      for (let index = 0; index < labels.length; index += 1) {
        labels[index] = [autocluster[index], ...labels[index]];
      }
    }
  }

  return labels;
}
