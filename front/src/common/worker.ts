import h5wasm, {type Dataset, type File as H5File, type Group} from 'h5wasm';
import {digesterTypeMap} from 'src/common/digester-type-map';
import {StorageMode} from 'src/common/storage-mode';
import {StoragePath} from 'src/common/storage-path';
import {type RelativeTrajectory} from 'src/composables/use-relative-trajectories';
import {type Site} from 'src/composables/use-sites';
import {type AggregatedIndicator} from 'src/composables/use-storage-aggregated-indicators';
import {
  type BlockDetails,
  type IntervalDetails,
} from 'src/composables/use-storage-aggregated-interval-details';
import {type AggregatedSite} from 'src/composables/use-storage-aggregated-sites';
import {type Digested} from 'src/composables/use-storage-digested';
import {type Labels} from 'src/composables/use-storage-labels';
import {type ReducedFeatures} from 'src/composables/use-storage-reduced-features';
import {
  type TracedData,
  type TracedRelativeTimestamps,
  type TracedTimestamps,
} from 'src/composables/use-trajectories-data';
import {LABEL_SITE} from 'src/constants';
import {
  type AutoclusterDto,
  type BandDto,
  type DigesterDtoWithType,
  type ExtractorDto,
  type FileDto,
  type IndexDto,
  type IntegrationDto,
  type RangeDto,
  type ReducerDto,
  type SettingsDto,
  type TrajectoryDto,
} from 'src/dtos';
import {
  AutoclusterPath,
  BandPath,
  DigesterPath,
  ExtractorPath,
  FilePath,
  IndexPath,
  IntegrationPath,
  RangePath,
  ReducerPath,
  SettingsPath,
  TrajectoryPath,
} from 'src/paths';
import {sortStringsNumerically} from 'src/utils/strings';

// TODO: Replace .pushes with fixed arrays

let h5: H5File;
const PATH = '/work';

console.log('Worker: Call');

export async function load(file: File) {
  if (h5) {
    return h5;
  }

  const {FS} = await h5wasm.ready;

  FS.mkdir(PATH);

  FS.mount(
    FS.filesystems.WORKERFS,
    {
      files: [file],
    },
    PATH,
  );

  h5 = new h5wasm.File(`${PATH}/${file.name}`, StorageMode.readonly);

  return h5;
}

export async function close() {
  h5.close();
}

export async function readSettings(file: File) {
  const h5 = await load(file);

  const path = SettingsPath.settings;
  const configuration = h5.get(path) as Group;
  const settings = {} as SettingsDto;

  for (const setting in configuration.attrs) {
    // @ts-expect-error: TS2322
    settings[setting] = configuration.attrs[setting].to_array();
  }

  return settings;
}

export async function readVersion(file: File): Promise<string> {
  const h5 = await load(file);

  // TODO: Fix me
  return 'TEST';

  const path = StoragePath.config_file;
  const dataset = h5.get(path) as Dataset;

  return dataset.attrs['version'].value?.toString() ?? '';
}

// read dataset as array
export function _readArray<T>(h5: H5File, path: string) {
  const dataset = h5.get(path) as Dataset;
  const value = dataset.json_value as T[];
  return value;
}

export async function readFiles(file: File) {
  const h5 = await load(file);

  type Dto = FileDto;
  const p = FilePath;

  const indices = _readArray<Dto['index']>(h5, p.indices);
  const relativePaths = _readArray<Dto['relativePath']>(h5, p.relative_paths);
  const absolutePaths = _readArray<Dto['absolutePath']>(h5, p.absolute_paths);
  const timestamps = _readArray<Dto['timestamp']>(h5, p.timestamps);
  const sites = _readArray<Dto['site']>(h5, p.sites);
  const durations = _readArray<Dto['duration']>(h5, p.durations);
  const labelProperties = _readArray<Dto['labelProperties']>(
    h5,
    p.label_properties,
  );
  const labelValues = _readArray<Dto['labelValues']>(h5, p.label_values);

  const files = new Array<Dto>(indices.length);

  for (const index of indices) {
    const file: Dto = {
      index: index,
      relativePath: relativePaths[index],
      absolutePath: absolutePaths[index],
      timestamp: timestamps[index],
      duration: durations[index],
      site: sites[index],
      labelProperties: labelProperties[index],
      labelValues: labelValues[index],
    };

    files[index] = file;
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

// todo: remove me?
export async function readFilename(file: File, fileIndex: number) {
  const filenames = await readFilenames(file);
  return filenames[fileIndex];
}

// todo: remove me?
export async function readFilesMetas(file: File) {
  const h5 = await load(file);
  const path = StoragePath.files_labels;
  const metas = h5.get(path) as Dataset;
  return metas.to_array() as string[][];
}

// todo: refactor me
export async function readLabels(
  file: File,
  bandName: string,
  integrationSeconds: number,
  extractorIndex: number,
): Promise<Labels> {
  const h5 = await load(file);

  const propertiesDataset = h5.get(StoragePath.labels_properties) as Dataset;
  const properties = propertiesDataset.to_array() as string[];

  const setsDataset = h5.get(StoragePath.labels_sets) as Dataset;
  const sets = setsDataset.to_array() as string[][];

  const labels: Labels = {};

  // add sites
  const sites = await readAggregatedSites(
    file,
    bandName,
    integrationSeconds,
    extractorIndex,
  );
  const sitesUniques = new Set(sites.map(({site}) => site));
  labels[LABEL_SITE] = sortStringsNumerically([...sitesUniques]);

  // add autoclusters
  const autoclusters = await readAutoclusters(
    file,
    bandName,
    integrationSeconds,
  );

  if (autoclusters.length > 0) {
    let a = 0;

    for (const autocluster of autoclusters) {
      const autoclusterSet = new Set(
        sortStringsNumerically(autocluster.map((n) => n.toString())),
      );

      labels[`AUTOCLUSTER_${a}`] = [...autoclusterSet];

      a += 1;
    }
  }

  // add user labels
  for (let i = 0; i < properties.length; i += 1) {
    const property = properties[i];
    labels[property] = sets[i].filter((element) => element !== '');
    labels[property] = sortStringsNumerically(labels[property]);
  }

  return labels;
}

export async function readBands(file: File) {
  const h5 = await load(file);

  type dto = BandDto;
  const p = BandPath;

  const indices = _readArray<dto['index']>(h5, p.indices);
  const names = _readArray<dto['name']>(h5, p.names);
  const lows = _readArray<dto['low']>(h5, p.lows);
  const highs = _readArray<dto['high']>(h5, p.highs);

  const bands = new Array<dto>(indices.length);

  for (const index of indices) {
    const band: dto = {
      index: index,
      name: names[index],
      low: lows[index],
      high: highs[index],
    };

    bands[index] = band;
  }

  return bands;
}

export async function readIntegrations(file: File) {
  const h5 = await load(file);

  type dto = IntegrationDto;
  const p = IntegrationPath;

  const indices = _readArray<dto['index']>(h5, p.indices);
  const names = _readArray<dto['name']>(h5, p.names);
  const durations = _readArray<dto['duration']>(h5, p.durations);

  const integrations = new Array<dto>(indices.length);

  for (const index of indices) {
    const integration: dto = {
      index: index,
      name: names[index],
      duration: durations[index],
    };

    integrations[index] = integration;
  }

  return integrations;
}

export async function readRanges(file: File) {
  const h5 = await load(file);

  type dto = RangeDto;
  const p = RangePath;

  const indices = _readArray<dto['index']>(h5, p.indices);
  const names = _readArray<dto['name']>(h5, p.names);
  const starts = _readArray<dto['start']>(h5, p.starts);
  const ends = _readArray<dto['end']>(h5, p.ends);

  const ranges = new Array<dto>(indices.length);

  for (const index of indices) {
    const range: dto = {
      index: index,
      name: names[index],
      start: starts[index],
      end: ends[index],
    };

    ranges[index] = range;
  }

  return ranges;
}

export async function readExtractors(file: File) {
  const h5 = await load(file);

  type dto = ExtractorDto;
  const p = ExtractorPath;

  const indices = _readArray<dto['index']>(h5, p.indices);
  const names = _readArray<dto['name']>(h5, p.names);
  const impls = _readArray<dto['impl']>(h5, p.impls);
  const offsets = _readArray<dto['offset']>(h5, p.offsets);
  const steps = _readArray<dto['step']>(h5, p.steps);
  const isPersists = _readArray<dto['isPersist']>(h5, p.is_persists);

  const extractors = new Array<dto>(indices.length);

  for (const index of indices) {
    const extractor: dto = {
      index: index,
      name: names[index],
      impl: impls[index],
      offset: offsets[index],
      step: steps[index],
      isPersist: isPersists[index],
    };

    extractors[index] = extractor;
  }

  return extractors;
}

export async function readIndices(file: File) {
  const h5 = await load(file);

  type dto = IndexDto;
  const p = IndexPath;

  const indices = _readArray<dto['index']>(h5, p.indices);
  const impls = _readArray<dto['impl']>(h5, p.impls);
  const offsets = _readArray<dto['offset']>(h5, p.offsets);
  const steps = _readArray<dto['step']>(h5, p.steps);
  const isPersists = _readArray<dto['isPersist']>(h5, p.is_persists);

  const indicesObjects = new Array<dto>(indices.length);

  for (const index of indices) {
    const extractor: dto = {
      index: index,
      impl: impls[index],
      offset: offsets[index],
      step: steps[index],
      isPersist: isPersists[index],
    };

    indicesObjects[index] = extractor;
  }

  return indicesObjects;
}

export async function readReducers(file: File) {
  const h5 = await load(file);

  type dto = ReducerDto;
  const p = ReducerPath;

  const indices = _readArray<dto['index']>(h5, p.indices);
  const impls = _readArray<dto['impl']>(h5, p.impls);
  const dimensions = _readArray<dto['dimensions']>(h5, p.dimensions);
  const bands = _readArray<dto['bands']>(h5, p.bands);
  const integrations = _readArray<dto['integrations']>(h5, p.integrations);
  const extractors = _readArray<dto['extractors']>(h5, p.extractors);

  const reducers = new Array<dto>(indices.length);

  for (const index of indices) {
    const reducer: dto = {
      index: index,
      impl: impls[index],
      dimensions: dimensions[index],
      bands: bands[index] ?? [],
      integrations: integrations[index] ?? [],
      extractors: extractors[index] ?? [],
    };

    reducers[index] = reducer;
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

// TODO: rename me
// This is called `autoclustered` in Processing module
// See `AutoclusteredStorage.py`
export async function readAutoclusters(
  file: File,
  bandName: string,
  integrationSeconds: number,
): Promise<string[][]> {
  try {
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
  } catch (error) {
    console.error('Worker: readAutoclusters', error);
    return [];
  }
}

// TODO: rename me
export async function readAutoclustersConfiguration(file: File) {
  const h5 = await load(file);

  type dto = AutoclusterDto;
  const p = AutoclusterPath;

  const indices = _readArray<dto['index']>(h5, p.indices);
  const impls = _readArray<dto['impl']>(h5, p.impls);
  const minClusterSizes = _readArray<dto['minClusterSize']>(
    h5,
    p.min_cluster_sizes,
  );
  const minSamples = _readArray<dto['minSamples']>(h5, p.min_samples);
  const alphas = _readArray<dto['alpha']>(h5, p.alphas);
  const epsilons = _readArray<dto['epsilon']>(h5, p.epsilons);

  const autoclusters = new Array<dto>(indices.length);

  for (const index of indices) {
    const autocluster: dto = {
      index: index,
      impl: impls[index],
      minClusterSize: minClusterSizes[index],
      minSamples: minSamples[index],
      alpha: alphas[index],
      epsilon: epsilons[index],
    };

    autoclusters[index] = autocluster;
  }

  return autoclusters;
}

export async function readTrajectories(file: File) {
  const h5 = await load(file);

  type dto = TrajectoryDto;
  const p = TrajectoryPath;

  const indices = _readArray<dto['index']>(h5, p.indices);
  const names = _readArray<dto['name']>(h5, p.names);
  const starts = _readArray<dto['start']>(h5, p.starts);
  const ends = _readArray<dto['end']>(h5, p.ends);
  const labelProperties = _readArray<dto['labelProperty']>(
    h5,
    p.label_properties,
  );
  const labelValues = _readArray<dto['labelValue']>(h5, p.label_values);
  const steps = _readArray<dto['step']>(h5, p.steps);

  const trajectories = new Array<dto>(indices.length);

  for (const index of indices) {
    const trajectory: dto = {
      index: index,
      name: names[index],
      start: starts[index],
      end: ends[index],
      labelProperty: labelProperties[index],
      labelValue: labelValues[index],
      step: steps[index],
    };

    trajectories[index] = trajectory;
  }

  return trajectories;
}

export async function readRelativeTrajectories(
  file: File,
  bandName: string,
  integrationSeconds: number,
  extractorIndex: number,
): Promise<RelativeTrajectory[]> {
  try {
    const h5 = await load(file);
    const pathSuffix = `/${bandName}/${integrationSeconds}/${extractorIndex}`;
    const path = `${StoragePath.relative_traced}${pathSuffix}`;
    const group = h5.get(path) as Group | null;

    if (group === null) {
      return [];
    }

    const relativeTrajectories: RelativeTrajectory[] = [];

    for (const key of group.keys()) {
      const relativeTracedPath = `${StoragePath.relative_traced}${pathSuffix}/${key}`;
      const relativeTracedDataset = h5.get(relativeTracedPath) as Dataset;
      const relativeTimestampsPath = `${StoragePath.relative_traced_relative_timetamps}${pathSuffix}/${key}`;
      const relativeTimestampsDataset = h5.get(
        relativeTimestampsPath,
      ) as Dataset;

      const decilesPath = `${StoragePath.relative_traced_deciles}${pathSuffix}/${key}`;
      const decilesDataset = h5.get(decilesPath) as Nullable<Dataset>; // TODO: Make non nullable in version 14
      const deciles =
        (decilesDataset?.to_array() as [number, number][]) || null;

      const trajectoryName =
        relativeTracedDataset.attrs['trajectory_name'].value?.toString() ?? '';
      const labelProperty =
        relativeTracedDataset.attrs['label_property'].value?.toString() ?? '';
      const labelValue =
        relativeTracedDataset.attrs['label_value'].value?.toString() ?? '';

      const relativeTrajectory: RelativeTrajectory = {
        index: Number(key),
        name: `${labelProperty} - ${labelValue} - ${trajectoryName}`,
        labelProperty: labelProperty,
        labelValue: labelValue,
        values: relativeTracedDataset.to_array() as number[],
        timestamps: (relativeTimestampsDataset.to_array() as number[][]).map(
          (v) => v[0],
        ),
        deciles: deciles,
      };

      relativeTrajectories.push(relativeTrajectory);
    }

    return relativeTrajectories;
  } catch (error) {
    console.error('Failed to read relative trajectories', error);
    return [];
  }
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
  const suffixPath = `/${bandName}/${integrationSeconds}/${extractorIndex}/${reducerIndex}/${trajectoryIndex}`;

  const dataPath = `${StoragePath.traced}${suffixPath}`;
  const dataDataset = h5.get(dataPath) as Dataset;
  const data = dataDataset.to_array() as number[][];

  const timestampsPath = `${StoragePath.traced_timestamps}${suffixPath}`;
  const timestampsDataset = h5.get(timestampsPath) as Dataset;
  const timestamps = timestampsDataset.to_array() as number[];

  const relativeTimestampsPath = `${StoragePath.traced_relative_timestamps}${suffixPath}`;
  const relativeTimestampsDataset = h5.get(relativeTimestampsPath) as Dataset;
  const relativeTimestamps = relativeTimestampsDataset.to_array() as number[];

  return [data, timestamps, relativeTimestamps];
}

export async function readAggregatedFeatures(
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
  const unpacked = new Array(timestamps.length);

  for (let i = 0; i < timestamps.length; i += 1) {
    unpacked[i] = timestamps[i][0];
  }

  return unpacked;
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
  const sites_list = dataset.to_array() as string[][];

  const sites = new Array<AggregatedSite>(sites_list.length);

  for (let i = 0; i < sites_list.length; i += 1) {
    const site: AggregatedSite = {
      site: sites_list[i][0],
    };

    sites[i] = site;
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
  const fileNames = await readFilenames(file);

  const path = `${StoragePath.aggregated_interval_details}/${bandName}/${integrationSeconds}/${extractorIndex}`;
  const dataset = h5.get(path) as Dataset;
  // TODO: This can be non rectangular,
  const strings_list = dataset.to_array() as string[][];
  const intervals = new Array<IntervalDetails>(strings_list.length);

  for (let i = 0; i < strings_list.length; i += 1) {
    const strings = strings_list[i];
    const blocks = new Array<BlockDetails>(strings.length);

    for (let j = 0; j < strings.length; j += 1) {
      const string = strings[j];
      const elements = string.split('/');

      let fullPath = `/${elements.slice(2).join('/')}`;
      if (fullPath.startsWith('//')) {
        fullPath = fullPath.substring(1);
      }

      let relativePath = fullPath.replace(settings.audio_path, '');

      if (relativePath.startsWith('//')) {
        relativePath = relativePath.substring(1);
      }

      const block: BlockDetails = {
        start: Number(elements[0]),
        fileStart: Number(elements[1]),
        file: relativePath,
        fileIndex: fileNames.indexOf(relativePath),
      };

      blocks[j] = block;
    }

    intervals[i] = blocks;
  }

  return intervals;
}

type AutoclusterIterator = (i: number, autoclusterResults: string[]) => void;

const iterateAutoclusters = (
  autoclusters: string[][],
  callback: AutoclusterIterator,
): void => {
  const reversed = autoclusters.toReversed();

  for (const autocluster of reversed) {
    for (let i = 0; i < autocluster.length; i += 1) {
      callback(i, autocluster);
    }
  }
};

const createRowIfNotDefined = <T>(array: T[][], i: number): T[][] => {
  const exists = typeof array[i] !== 'undefined';

  if (exists) {
    return array;
  }

  array[i] = [];

  return array;
};

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

  const hasAutoclusters = autoclusters.length > 0;

  if (!hasAutoclusters) {
    return labels;
  }

  iterateAutoclusters(autoclusters, (i, autocluster) => {
    createRowIfNotDefined(labels, i);
    labels[i].unshift(autocluster[i]);
  });

  return labels;
}

export async function readAggregatedIndicators(
  file: File,
  band: string, // name
  integration: number, // seconds
  extractorIndices: number[], // non nn extractors indices
): Promise<AggregatedIndicator[]> {
  const h5 = await load(file);
  const extractors = await readExtractors(file);

  const indicators = new Array<AggregatedIndicator>(extractorIndices.length);

  for (let i = 0; i < extractorIndices.length; i += 1) {
    const e = extractorIndices[i];
    const path = `${StoragePath.aggregated}/${band}/${integration}/${e}`;
    const dataset = h5.get(path) as Dataset;
    const values = dataset.to_array() as number[][];

    const indicator: AggregatedIndicator = {
      extractor: extractors[e],
      values: values,
    };

    indicators[i] = indicator;
  }

  return indicators;
}

export async function readDigesters(file: File) {
  const h5 = await load(file);

  type dto = DigesterDtoWithType;
  const p = DigesterPath;

  const indices = _readArray<dto['index']>(h5, p.indices);
  const impls = _readArray<dto['impl']>(h5, p.impls);
  const isPairings = _readArray<dto['isPairing']>(h5, p.is_pairings);

  const digesters = new Array<dto>(indices.length);

  for (const index of indices) {
    const impl = impls[index];

    const digester: dto = {
      index: index,
      impl: impl,
      isPairing: isPairings[index],
      type: digesterTypeMap[impl],
    };

    digesters[index] = digester;
  }

  return digesters;
}

export async function readDigested(
  file: File,
  bandName: string,
  integrationSeconds: number,
  digesterIndex: number,
): Promise<Digested['values']> {
  const h5 = await load(file);
  const groupPath = `${StoragePath.digested}/${bandName}/${integrationSeconds}/${digesterIndex}`;
  const group = h5.get(groupPath) as Group;

  const digestedValues: Digested['values'] = {};

  for (const key of group.keys()) {
    const keyPath = `${groupPath}/${key}`;
    const keyDatasetOrGroup = h5.get(keyPath) as Dataset | Group;

    if (keyDatasetOrGroup.type === 'Dataset') {
      const keyDataset = keyDatasetOrGroup as Dataset;
      const values = keyDataset.to_array() as number[][];
      digestedValues[key] = values;
    } else if (keyDatasetOrGroup.type === 'Group') {
      const keyGroup = keyDatasetOrGroup as Group;

      const values: {[key: string]: number[][]} = {};

      for (const subKey of keyGroup.keys()) {
        const subKeyPath = `${keyPath}/${subKey}`;
        const subKeyDataset = h5.get(subKeyPath) as Dataset;
        const subKeyValues = subKeyDataset.to_array() as number[][];
        values[subKey] = subKeyValues;
      }

      digestedValues[key] = values;
    }
  }

  return digestedValues;
}
