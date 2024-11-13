import h5wasm, {type Dataset, type File as H5File, type Group} from 'h5wasm';
import {type DigesterName} from 'src/common/digester-name';
import {digesterTypeMap} from 'src/common/digester-type-map';
import {StorageMode} from 'src/common/storage-mode';
import {StoragePath} from 'src/common/storage-path';
import {type StorageSettings} from 'src/common/storage-settings';
import {type Autocluster} from 'src/composables/use-autoclusters';
import {type Band} from 'src/composables/use-bands';
import {type Digester} from 'src/composables/use-digesters';
import {type Extractor} from 'src/composables/use-extractors';
import {type File as FileConfig} from 'src/composables/use-files';
import {type Integration} from 'src/composables/use-integrations';
import {type ReducerFromStorage} from 'src/composables/use-reducers';
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
import {type AppRange} from 'src/composables/use-storage-ranges';
import {type ReducedFeatures} from 'src/composables/use-storage-reduced-features';
import {type Trajectory} from 'src/composables/use-trajectories';
import {
  type TracedData,
  type TracedRelativeTimestamps,
  type TracedTimestamps,
} from 'src/composables/use-trajectories-data';
import {LABEL_SITE} from 'src/constants';
import {trimRectangular} from 'src/utils/arrays';
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

  const path = StoragePath.settings;
  const configuration = h5.get(path) as Group;
  const settings = {} as StorageSettings;

  for (const setting in configuration.attrs) {
    // @ts-expect-error: TS2322
    settings[setting] = configuration.attrs[setting].to_array();
  }

  return settings;
}

export async function readVersion(file: File): Promise<string> {
  const h5 = await load(file);

  const path = StoragePath.config_file;
  const dataset = h5.get(path) as Dataset;

  return dataset.attrs['version'].value?.toString() ?? '';
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
  const length = namesDataset.shape?.[0] ?? 0;

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

export async function readBands(file: File): Promise<Band[]> {
  const h5 = await load(file);

  const namesDataset = h5.get(StoragePath.bands_names) as Dataset;
  const names = namesDataset.to_array() as string[];

  const lowsDataset = h5.get(StoragePath.bands_lows) as Dataset;
  const lows = lowsDataset.to_array() as number[];

  const highsDataset = h5.get(StoragePath.bands_highs) as Dataset;
  const highs = highsDataset.to_array() as number[];

  const bands = [];
  const length = namesDataset.shape?.[0] ?? 0;

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
  const length = namesDataset.shape?.[0] ?? 0;

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

export async function readRanges(file: File): Promise<AppRange[]> {
  const h5 = await load(file);

  const namesDataset = h5.get(StoragePath.ranges_names) as Dataset;
  const names = namesDataset.to_array() as string[];

  const startsDataset = h5.get(StoragePath.ranges_starts) as Dataset;
  const starts = startsDataset.to_array() as number[];

  const endsDataset = h5.get(StoragePath.ranges_ends) as Dataset;
  const ends = endsDataset.to_array() as number[];

  const ranges: AppRange[] = [];
  const length = namesDataset.shape?.[0] ?? 0;

  for (let index = 0; index < length; index += 1) {
    const range: AppRange = {
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
  const length = namesDataset.shape?.[0] ?? 0;

  for (let index = 0; index < length; index += 1) {
    const extractor: Extractor = {
      index: index,
      name: names[index],
      offset: offsets[index],
      step: steps[index],
      persist: persists[index] === 1,
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
  const length = namesDataset.shape?.[0] ?? 0;

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

export async function readAutoclustersConfiguration(
  file: File,
): Promise<Autocluster[]> {
  const h5 = await load(file);

  const autoclusters: Autocluster[] = [];

  const namesDataset = h5.get(StoragePath.autoclusters_names) as Dataset;
  const names = namesDataset.to_array() as string[];

  const minClusterSizesDataset = h5.get(
    StoragePath.autoclusters_min_cluster_sizes,
  ) as Dataset;
  const minClusterSizes = minClusterSizesDataset.to_array() as number[];

  const minSamplesDataset = h5.get(
    StoragePath.autoclusters_min_samples,
  ) as Dataset;
  const minSamples = minSamplesDataset.to_array() as number[];

  const alphasDataset = h5.get(StoragePath.autoclusters_alphas) as Dataset;
  const alphas = alphasDataset.to_array() as number[];

  const epsilonsDataset = h5.get(StoragePath.autoclusters_epsilons) as Dataset;
  const epsilons = epsilonsDataset.to_array() as number[];

  for (let i = 0; i < names.length; i += 1) {
    autoclusters.push({
      index: i,
      name: names[i],
      min_cluster_size: minClusterSizes[i],
      min_samples: minSamples[i],
      alpha: alphas[i],
      epsilon: epsilons[i],
    });
  }

  return autoclusters;
}

export async function readTrajectories(file: File): Promise<Trajectory[]> {
  const h5 = await load(file);

  const namesDataset = h5.get(StoragePath.trajectories_names) as Dataset;
  const names = namesDataset.to_array() as string[];

  const startsDataset = h5.get(StoragePath.trajectories_starts) as Dataset;
  const starts = startsDataset.to_array() as number[];

  const endsDataset = h5.get(StoragePath.trajectories_ends) as Dataset;
  const ends = endsDataset.to_array() as number[];

  const labelPropertiesDataset = h5.get(
    StoragePath.trajectories_label_properties,
  ) as Dataset;
  const labelProperties = labelPropertiesDataset.to_array() as string[];

  const labelValuesDataset = h5.get(
    StoragePath.trajectories_label_values,
  ) as Dataset;
  const labelValues = labelValuesDataset.to_array() as string[];

  const stepsDataset = h5.get(StoragePath.trajectories_steps) as Dataset;
  const steps = stepsDataset.to_array() as number[];

  const length = namesDataset.shape?.[0] ?? 0;

  const trajectories = [];

  for (let index = 0; index < length; index += 1) {
    const trajectory: Trajectory = {
      index: index,
      name: names[index],
      start: starts[index],
      end: ends[index],
      labelProperty: labelProperties[index],
      labelValue: labelValues[index],
      step: steps[index],
    };

    trajectories.push(trajectory);
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

      const quartilesPath = `${StoragePath.relative_traced_quartiles}${pathSuffix}/${key}`;
      const quartilesDataset = h5.get(quartilesPath) as Nullable<Dataset>; // TODO: Make non nullable in version 14
      const quartiles =
        (quartilesDataset?.to_array() as [number, number][]) || null;

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
        quartiles: quartiles,
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

// TODO: refactor me
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
    if (labels.length === 0) {
      // files labels are empty
      for (const autocluster of autoclusters.reverse()) {
        for (let index = 0; index < autocluster.length; index += 1) {
          const value = autocluster[index];

          if (typeof labels[index] === 'undefined') {
            labels[index] = [];
          }

          labels[index] = [value, ...labels[index]];
        }
      }
    } else if (labels.length > 0) {
      // files labels are populated
      for (const autocluster of autoclusters.reverse()) {
        for (let index = 0; index < labels.length; index += 1) {
          labels[index] = [autocluster[index], ...labels[index]];
        }
      }
    }
  }

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

export async function readDigesters(file: File): Promise<Digester[]> {
  const h5 = await load(file);
  const path = `${StoragePath.digesters_names}`;
  const dataset = h5.get(path) as Dataset;
  const names = dataset.to_array() as string[];

  const digesters: Digester[] = new Array(names.length);

  for (let i = 0; i < names.length; i += 1) {
    const name = names[i] as DigesterName;

    const digester: Digester = {
      index: i,
      name: name,
      type: digesterTypeMap[name],
    };

    digesters[i] = digester;
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
