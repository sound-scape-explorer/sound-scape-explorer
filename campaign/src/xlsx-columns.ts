export enum XlsxSheet {
  Settings = 'Settings',
  Files = 'Files',
  Bands = 'Bands',
  Integrations = 'Integrations',
  Ranges = 'Ranges',
  Trajectories = 'Trajectories',
  Extractors = 'Extractors',
  Digesters = 'Digesters',
  Reducers = 'Reducers',
  Autoclusters = 'Autoclusters',
}

export enum SettingsCell {
  storagePath = 'B2',
  audioPath = 'B3',
  sampleRate = 'B4',
  origin = 'B5',
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
