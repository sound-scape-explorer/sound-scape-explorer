import h5wasm, {type Dataset, type File as H5File, type Group} from 'h5wasm';
import {digesterTypeMap} from 'src/common/digester-type-map';
import {StorageMode} from 'src/common/storage-mode';
import {type RelativeTrajectory} from 'src/composables/use-relative-trajectories';
import {type AggregatedIndex} from 'src/composables/use-storage-aggregated-indices';
import {
  type BlockDetails,
  type IntervalDetails,
} from 'src/composables/use-storage-aggregated-interval-details';
import {type Digested} from 'src/composables/use-storage-digested';
import {type Labels} from 'src/composables/use-storage-labels';
import {
  type TracedData,
  type TracedRelativeTimestamps,
  type TracedTimestamps,
} from 'src/composables/use-trajectories-data';
import {DELIMITER, LABEL_SITE} from 'src/constants';
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
  AggregatedInstancePath,
  AutoclusteredInstancePath,
  AutoclusterPath,
  BandPath,
  DigestedInstancePath,
  DigesterPath,
  ExtractorPath,
  FilePath,
  IndexPath,
  IntegrationPath,
  RangePath,
  ReducedInstancePath,
  ReducerPath,
  RelativeTracedInstancePath,
  SettingsPath,
  TracedInstancePath,
  TrajectoryPath,
  VersionPath,
} from 'src/paths';
import {sortStringsNumerically} from 'src/utils/strings';

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
  const version = _readArray<string>(h5, VersionPath.version);
  return version[0];
}

// read dataset as array
export function _readArray<T>(h5: H5File, path: string) {
  const dataset = h5.get(path) as Dataset;
  const array = dataset.to_array() as T[];
  return array;
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

interface DomainLabel {
  index: number;
  property: string;
  uniques: string[];
}

export async function readLabels(
  file: File,
  bandIndex: number,
  integrationIndex: number,
  extractorIndex: number,
): Promise<Labels> {
  const h5 = await load(file);

  // build domain labels
  const files_label_properties = _readArray<FileDto['labelProperties']>(
    h5,
    FilePath.label_properties,
  );

  const properties = files_label_properties[0] ?? [];

  const files_label_values = _readArray<FileDto['labelValues']>(
    h5,
    FilePath.label_values,
  );

  const domainLabels = new Array<DomainLabel>(properties.length);

  for (let index = 0; index < properties.length; index += 1) {
    const property = properties[index];
    const uniques: string[] = [];

    for (const values of files_label_values) {
      const value = values[index];

      if (uniques.includes(value)) {
        continue;
      }

      uniques.push(value);
    }

    const label: DomainLabel = {
      index: index,
      property: property,
      uniques: uniques,
    };

    domainLabels[index] = label;
  }

  const labels: Labels = {};

  // add sites
  const sites = await readAggregatedSites(
    file,
    bandIndex,
    integrationIndex,
    extractorIndex,
  );

  const sitesUniques = [...new Set(sites)];
  labels[LABEL_SITE] = sortStringsNumerically(sitesUniques);

  // add autoclusters
  const autoclustereds = await readAutoclustered(
    file,
    bandIndex,
    integrationIndex,
    extractorIndex,
  );

  if (autoclustereds.length > 0) {
    let index = 0;

    for (const autoclustered of autoclustereds) {
      const uniques = [...new Set(sortStringsNumerically(autoclustered))];
      labels[`AUTOCLUSTER_${index}`] = uniques;
      index += 1;
    }
  }

  // add user labels
  for (const label of domainLabels) {
    const property = label.property;
    labels[property] = label.uniques.filter((element) => element !== '');
    labels[property] = sortStringsNumerically(labels[property]);
  }

  return labels;
}

export async function readBands(file: File): Promise<BandDto[]> {
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

export async function readIntegrations(file: File): Promise<IntegrationDto[]> {
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

export async function readRanges(file: File): Promise<RangeDto[]> {
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

export async function readExtractors(file: File): Promise<ExtractorDto[]> {
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

export async function readIndices(file: File): Promise<IndexDto[]> {
  const h5 = await load(file);

  type dto = IndexDto;
  const p = IndexPath;

  const indices = _readArray<dto['index']>(h5, p.indices);
  const impls = _readArray<dto['impl']>(h5, p.impls);
  const offsets = _readArray<dto['offset']>(h5, p.offsets);
  const steps = _readArray<dto['step']>(h5, p.steps);
  const isPersists = _readArray<dto['isPersist']>(h5, p.is_persists);

  const indicesObjects: dto[] = [];

  for (let i = 0; i < indices.length; i += 1) {
    const index: dto = {
      index: indices[i],
      impl: impls[i],
      offset: offsets[i],
      step: steps[i],
      isPersist: isPersists[i],
    };

    indicesObjects.push(index);
  }

  return indicesObjects;
}

export async function readReducers(file: File): Promise<ReducerDto[]> {
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
  bandIndex: number,
  integrationIndex: number,
  extractorIndex: number,
  reducerIndex: number,
) {
  const h5 = await load(file);

  const path = ReducedInstancePath.reduced(
    bandIndex,
    integrationIndex,
    extractorIndex,
    reducerIndex,
  );
  const features = _readArray<number[]>(h5, path);
  return features;
}

export async function readAutoclustered(
  file: File,
  bandIndex: number,
  integrationIndex: number,
  extractorIndex: number,
) {
  const h5 = await load(file);
  const autoclusters = await readAutoclusters(file);

  if (autoclusters.length === 0) {
    return [];
  }

  const autoclustered = new Array<string[]>(autoclusters.length);

  for (let i = 0; i < autoclusters.length; i += 1) {
    const autocluster = autoclusters[i];

    const values = _readArray<number>(
      h5,
      AutoclusteredInstancePath.autoclustered(
        bandIndex,
        integrationIndex,
        extractorIndex,
        autocluster.index,
      ),
    );

    autoclustered[i] = values.map((v) => v.toString());
  }

  return autoclustered;
}

export async function readAutoclusters(file: File) {
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
  bandIndex: number,
  integrationIndex: number,
  extractorIndex: number,
): Promise<RelativeTrajectory[]> {
  try {
    const h5 = await load(file);

    const path = RelativeTracedInstancePath.group(
      bandIndex,
      integrationIndex,
      extractorIndex,
    );

    const group = h5.get(path) as Group | null;

    if (group === null) {
      return [];
    }

    const relativeTrajectories: RelativeTrajectory[] = [];

    for (const key of group.keys()) {
      const dataPath = RelativeTracedInstancePath.data(
        bandIndex,
        integrationIndex,
        extractorIndex,
        key,
      );
      const data = _readArray<number[]>(h5, dataPath);

      const timestampsPath = RelativeTracedInstancePath.timestamps(
        bandIndex,
        integrationIndex,
        extractorIndex,
        key,
      );

      const timestamps = _readArray<number[]>(h5, timestampsPath);

      const decilesPath = RelativeTracedInstancePath.deciles(
        bandIndex,
        integrationIndex,
        extractorIndex,
        key,
      );

      const deciles = _readArray<[number, number]>(h5, decilesPath);

      const dataset = h5.get(dataPath) as Dataset;
      const trajectoryName =
        dataset.attrs['trajectory_name'].value?.toString() ?? '';
      const labelProperty =
        dataset.attrs['label_property'].value?.toString() ?? '';
      const labelValue = dataset.attrs['label_value'].value?.toString() ?? '';

      const relativeTrajectory: RelativeTrajectory = {
        index: Number(key),
        name: `${labelProperty} - ${labelValue} - ${trajectoryName}`,
        labelProperty: labelProperty,
        labelValue: labelValue,
        values: data[0],
        timestamps: timestamps.map((t) => t[0]),
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
  bandIndex: number,
  integrationIndex: number,
  extractorIndex: number,
  reducerIndex: number,
  trajectoryIndex: number,
): Promise<[TracedData, TracedTimestamps, TracedRelativeTimestamps]> {
  const h5 = await load(file);

  const dataPath = TracedInstancePath.data(
    bandIndex,
    integrationIndex,
    extractorIndex,
    reducerIndex,
    trajectoryIndex,
  );
  const data = _readArray<number[]>(h5, dataPath);

  const timestampsPath = TracedInstancePath.timestamps(
    bandIndex,
    integrationIndex,
    extractorIndex,
    reducerIndex,
    trajectoryIndex,
  );
  const timestamps = _readArray<number>(h5, timestampsPath);

  const relativeTimestampsPath = TracedInstancePath.relative_timestamps(
    bandIndex,
    integrationIndex,
    extractorIndex,
    reducerIndex,
    trajectoryIndex,
  );

  const relativeTimestamps = _readArray<number>(h5, relativeTimestampsPath);

  return [data, timestamps, relativeTimestamps];
}

export async function readAggregatedFeatures(
  file: File,
  bandIndex: number,
  integrationIndex: number,
  extractorIndex: number,
) {
  const h5 = await load(file);
  const path = AggregatedInstancePath.data(
    bandIndex,
    integrationIndex,
    extractorIndex,
  );
  const features = _readArray<number[]>(h5, path);
  return features;
}

export async function readAggregatedTimestamps(
  file: File,
  bandIndex: number,
  integrationIndex: number,
  extractorIndex: number,
) {
  const h5 = await load(file);

  const path = AggregatedInstancePath.timestamps(
    bandIndex,
    integrationIndex,
    extractorIndex,
  );
  const timestamps = _readArray<number[]>(h5, path);
  return timestamps.map((t) => t[0]);
}

export async function readAggregatedSites(
  file: File,
  bandIndex: number,
  integrationIndex: number,
  extractorIndex: number,
) {
  const h5 = await load(file);

  const sites = _readArray<string[]>(
    h5,
    AggregatedInstancePath.sites(bandIndex, integrationIndex, extractorIndex),
  );

  return sites.map((siteArray) => siteArray[0]);
}

export async function readAggregatedIntervalDetails(
  file: File,
  bandIndex: number,
  integrationIndex: number,
  extractorIndex: number,
): Promise<IntervalDetails[]> {
  const h5 = await load(file);
  const files = await readFiles(file);
  const relativePaths = files.map((f) => f.relativePath);

  const pathN = AggregatedInstancePath.interval_details(
    bandIndex,
    integrationIndex,
    extractorIndex,
  );

  const details = _readArray<string[]>(h5, pathN);

  const payload: IntervalDetails[] = [];

  for (let i = 0; i < details.length; i += 1) {
    const strings = details[i];
    const blocks = new Array<BlockDetails>(strings.length);

    for (let j = 0; j < strings.length; j += 1) {
      const string = strings[j];
      const elements = string.split(DELIMITER);

      const blockStart = Number(elements[0]);
      const relativeStart = Number(elements[1]);
      const relativePath = elements[2];

      const block: BlockDetails = {
        start: blockStart,
        fileStart: relativeStart,
        file: relativePath,
        fileIndex: relativePaths.indexOf(relativePath),
      };

      blocks[j] = block;
    }

    payload[i] = blocks;
  }

  return payload;
}

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
  bandIndex: number,
  integrationIndex: number,
  extractorIndex: number,
) {
  const h5 = await load(file);
  const autoclustered = await readAutoclustered(
    file,
    bandIndex,
    integrationIndex,
    extractorIndex,
  );

  const path = AggregatedInstancePath.labels(
    bandIndex,
    integrationIndex,
    extractorIndex,
  );
  const labels = _readArray<string[]>(h5, path);

  if (autoclustered.length === 0) {
    return labels;
  }

  const reversed = autoclustered.toReversed();

  for (const autocluster of reversed) {
    for (let i = 0; i < autocluster.length; i += 1) {
      createRowIfNotDefined(labels, i);
      labels[i].unshift(autocluster[i]);
    }
  }

  return labels;
}

export async function readAggregatedIndices(
  file: File,
  bandIndex: number,
  integrationIndex: number,
): Promise<AggregatedIndex[]> {
  const h5 = await load(file);
  const indices = await readIndices(file);

  const aggregateds: AggregatedIndex[] = [];

  for (const index of indices) {
    const path = AggregatedInstancePath.data(
      bandIndex,
      integrationIndex,
      index.index,
    );
    const values = _readArray<number[]>(h5, path);

    const aggregated: AggregatedIndex = {
      index: index,
      values: values,
    };

    aggregateds.push(aggregated);
  }

  return aggregateds;
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

// TODO: refactor me
export async function readDigested(
  file: File,
  bandIndex: number,
  integrationIndex: number,
  extractorIndex: number,
  digesterIndex: number,
): Promise<Digested['values']> {
  const h5 = await load(file);

  const groupPath = DigestedInstancePath.data(
    bandIndex,
    integrationIndex,
    extractorIndex,
    digesterIndex,
  );

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
