import {type IndexDto} from '@shared/dtosOLD';
import {
  AggregationPathInstance,
  AutoclusterPathInstance,
  ConfigPath,
  IndexPath,
  MetricPathInstance,
  ReductionPathInstance,
  RelativeTrajectoryPathInstance,
  TrajectoryPathInstance,
} from '@shared/pathRegistry';
import h5wasm, {type Dataset, type File as H5File} from 'h5wasm';
import {StorageMode} from 'src/common/storage-mode';
import {type Aggregated} from 'src/composables/use-aggregated';
import {type MetricData} from 'src/composables/use-metric-data';
import {type RelativeTrajectory} from 'src/composables/use-relative-trajectories';
import {type AggregatedIndex} from 'src/composables/use-storage-aggregated-acoustic-indices';
import {
  type TrajectoryPath,
  type TrajectoryTimestamps,
} from 'src/composables/use-trajectories';
import {STRING_DELIMITER} from 'src/constants';

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

export async function readConfigString(file: File) {
  const h5 = await load(file);
  const path = ConfigPath.config;
  const dataset = h5.get(path) as Dataset;
  const array = dataset.to_array() as string[];
  return array[0];
}

// read dataset as an array
export function _readArray<T>(h5: H5File, path: string) {
  const dataset = h5.get(path) as Dataset;
  const array = dataset.to_array() as T[]; // todo: TYPE IS CONFUSING
  return array;
}

// TODO: UPDATE ME
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

export async function readReductions(
  file: File,
  extractionIndex: number,
  reducerIndex: number,
  bandIndex: number,
  integrationIndex: number,
) {
  const h5 = await load(file);

  const path = ReductionPathInstance.reductions(
    extractionIndex,
    reducerIndex,
    bandIndex,
    integrationIndex,
  );

  const embeddings = _readArray<number[]>(h5, path);
  return embeddings;
}

export async function readAutoclusters(
  file: File,
  extractionIndex: number,
  bandIndex: number,
  integrationIndex: number,
  autoclusterIndex: number,
) {
  const h5 = await load(file);

  const path = AutoclusterPathInstance.autoclusters(
    extractionIndex,
    bandIndex,
    integrationIndex,
    autoclusterIndex,
  );

  const values = _readArray<number>(h5, path);
  return values;
}

export async function readRelativeTrajectories(
  file: File,
  extractionIndex: number,
  bandIndex: number,
  integrationIndex: number,
  reducerIndex: number,
  trajectoryIndex: number,
): Promise<Omit<RelativeTrajectory, 'trajectory'>> {
  const h5 = await load(file);

  const suffix = [
    extractionIndex,
    bandIndex,
    integrationIndex,
    reducerIndex,
    trajectoryIndex,
  ];

  const distancesPath = RelativeTrajectoryPathInstance.distances(...suffix);
  const distances = _readArray<number>(h5, distancesPath);

  const timestampsPath = RelativeTrajectoryPathInstance.timestamps(...suffix);
  const timestamps = _readArray<number>(h5, timestampsPath);

  const decilesPath = RelativeTrajectoryPathInstance.deciles(...suffix);
  const deciles = _readArray<[number, number]>(h5, decilesPath);

  return {
    distances,
    timestamps,
    deciles,
  };
}

export async function readTrajectories(
  file: File,
  extractionIndex: number,
  bandIndex: number,
  integrationIndex: number,
  reducerIndex: number,
  trajectoryIndex: number,
): Promise<[TrajectoryPath, TrajectoryTimestamps]> {
  const h5 = await load(file);

  const suffix = [
    extractionIndex,
    bandIndex,
    integrationIndex,
    reducerIndex,
    trajectoryIndex,
  ];

  const pathPath = TrajectoryPathInstance.path(...suffix);
  const path = _readArray<number[]>(h5, pathPath);

  const timestampsPath = TrajectoryPathInstance.timestamps(...suffix);
  const timestamps = _readArray<number>(h5, timestampsPath);

  return [path, timestamps];
}

export async function readAggregations(
  file: File,
  extractionIndex: number,
  bandIndex: number,
  integrationIndex: number,
  siteNames: string[],
): Promise<Aggregated> {
  const h5 = await load(file);

  const aggregated: Aggregated = {
    embeddings: [],
    timestamps: [],
    fileIndices: [],
    fileRelativeStarts: [],
    extractorIndices: [],
  };

  for (const siteName of siteNames) {
    const suffix = [extractionIndex, bandIndex, integrationIndex, siteName];

    // embeddings
    const embeddingsPath = AggregationPathInstance.embeddings(...suffix);
    const embeddings = _readArray<number[]>(h5, embeddingsPath);
    aggregated.embeddings.push(...embeddings);

    // timestamps
    const timestampsPath = AggregationPathInstance.timestamps(...suffix);
    const timestamps = _readArray<number>(h5, timestampsPath);
    aggregated.timestamps.push(...timestamps);

    // file indices
    const fileIndicesPath = AggregationPathInstance.file_indices(...suffix);
    const fileIndicesStrings = _readArray<string>(h5, fileIndicesPath);
    const fileIndices = fileIndicesStrings.map((strings) =>
      strings.split(STRING_DELIMITER).map(Number),
    );
    aggregated.fileIndices.push(...fileIndices);

    // file relative starts
    const fileRelativeStarts = AggregationPathInstance.file_relative_starts(
      ...suffix,
    );
    const fileRelativeStartsStrings = _readArray<string>(
      h5,
      fileRelativeStarts,
    );
    const fileRelativeStartsNumbers = fileRelativeStartsStrings.map((strings) =>
      strings.split(STRING_DELIMITER).map(Number),
    );
    aggregated.fileRelativeStarts.push(...fileRelativeStartsNumbers);

    // extractor indices
    const extractorIndicesPath = AggregationPathInstance.extractor_indices(
      ...suffix,
    );
    const extractorIndicesStrings = _readArray<string>(
      h5,
      extractorIndicesPath,
    );
    const extractorIndices = extractorIndicesStrings.map((strings) =>
      strings.split(STRING_DELIMITER).map(Number),
    );
    aggregated.extractorIndices.push(...extractorIndices);
  }

  return aggregated;
}

// todo: update me
export async function readAggregatedAcousticIndices(
  file: File,
  bandIndex: number,
  integrationIndex: number,
  siteNames: string[],
): Promise<AggregatedIndex[]> {
  const h5 = await load(file);
  const indices = await readIndices(file);

  const aggregateds: AggregatedIndex[] = [];

  console.log('implement me back');

  // for (const index of indices) {
  //   const path = AggregatedInstancePath.data(
  //     bandIndex,
  //     integrationIndex,
  //     index.index,
  //   );
  //   const values = _readArray<number[]>(h5, path);
  //
  //   const aggregated: AggregatedIndex = {
  //     index: index,
  //     values: values,
  //   };
  //
  //   aggregateds.push(aggregated);
  // }

  return aggregateds;
}

export async function readMetric(
  file: File,
  extractionIndex: number,
  bandIndex: number,
  integrationIndex: number,
  metricIndex: number,
  labelPropertyA: string,
  labelPropertyB: string | null = null,
): Promise<MetricData['values']> {
  const h5 = await load(file);

  const baseSuffix = [
    extractionIndex,
    bandIndex,
    integrationIndex,
    metricIndex,
  ];

  const values: MetricData['values'] = [];
  const isPairing = labelPropertyB !== null;

  if (!isPairing) {
    const suffix = [...baseSuffix, labelPropertyA];
    const path = MetricPathInstance.data(...suffix);
    const data = _readArray<number[]>(h5, path);
    values.push(...data);
  } else {
    const suffix = [...baseSuffix, labelPropertyB, labelPropertyA];
    const path = MetricPathInstance.data(...suffix);
    const data = _readArray<number[]>(h5, path);
    values.push(...data);
  }

  return values;
}
