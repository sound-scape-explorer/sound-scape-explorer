// utils
export function getEnumKeys<T extends object>(o: T): (keyof T)[] {
  return Object.keys(o) as (keyof T)[];
}

export enum DigesterType {
  SumVariance = 'sum_var',
  SumStandard = 'sum_std',
  MeanStandard = 'mean_std',
  MeanSpreading = 'mean_spreading',
  Distance = 'distance',
  Overlap = 'overlap',
  Silhouette = 'silhouette',
  Contingency = 'contingency',
}

export enum XlsxSheet {
  settings = 'Settings',
  files = 'Files',
  bands = 'Bands',
  integrations = 'Integrations',
  ranges = 'Ranges',
  trajectories = 'Trajectories',
  extractors = 'Extractors',
  digesters = 'Digesters',
  reducers = 'Reducers',
  autoclusters = 'Autoclusters',
}

export enum SettingsCell {
  storagePath = 'B2',
  audioPath = 'B3',
  expectedSampleRate = 'B4',
  timelineOrigin = 'B5',
  audioHost = 'B6',
  timezone = 'B7',
  computationDimensions = 'B8',
  computationIterations = 'B9',
  displaySeed = 'B10',
}

export enum FilesColumn {
  file = 'A',
  site = 'B',
  date = 'C',
  // ... additional meta tags
}

export enum BandsColumn {
  band = 'A',
  low = 'B',
  high = 'C',
}

export enum IntegrationsColumn {
  integration = 'A',
  seconds = 'B',
}

export enum RangesColumn {
  range = 'A',
  start = 'B',
  end = 'C',
}

export enum ExtractorsColumn {
  extractor = 'A',
  offset = 'B',
  step = 'C',
  persist = 'D',
}

export enum ReducersColumn {
  reducer = 'A',
  dimensions = 'B',
  bands = 'C',
  integrations = 'D',
  ranges = 'E',
}

export enum TrajectoriesColumn {
  trajectory = 'A',
  start = 'B',
  end = 'C',
  labelProperty = 'D',
  labelValue = 'E',
  step = 'F',
}

export enum DigestersColumn {
  digester = 'A',
}

export enum AutoclustersColumn {
  autocluster = 'A',
  minClusterSize = 'B',
  minSamples = 'C',
  alpha = 'D',
  epsilon = 'E',
}
