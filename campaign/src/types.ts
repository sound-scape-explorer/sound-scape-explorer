import {type Dayjs} from 'dayjs';
import {
  AutoclusterType,
  type DigesterType,
  type NeuralExtractorType,
} from 'src/enums.ts';

export type TabIndex =
  | 'import'
  | 'files'
  | 'settings'
  | 'config'
  | 'metrics'
  | 'export';

export interface LabelProperty {
  name: string;
}

export interface ExportConfig {
  settings: ExportSettings;
  config: {
    bands: Band[];
    integrations: Integration[];
    extractors: Extractor[];
    ranges: Range_[];
    reducers: Reducer[];
    trajectories: Trajectory[];
    digesters: Digester[];
    autoclusters: Autocluster[];
  };
  files: ExportFile[];
}

export interface Config {
  settings: Settings;
  config: {
    bands: Band[];
    integrations: Integration[];
    extractors: Extractor[];
    ranges: Range_[];
    reducers: Reducer[];
    trajectories: Trajectory[];
    digesters: Digester[];
    autoclusters: Autocluster[];
  };
  files: GridRow[];
}

export interface ExportSettings extends Omit<Settings, 'timelineOrigin'> {
  timelineOrigin: string;
}

export interface Settings {
  storagePath: string;
  audioPath: string; // prefilled
  expectedSampleRate: number;
  timelineOrigin: string;
  audioHost: string; // TODO: not sure this is useful
  timezone: string;
  computationDimensions: number;
  computationIterations: number;
  displaySeed: number;
}

export interface ImportFile {
  path: string;
  relativePath: string;
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

export interface GridRow {
  index: number;
  path: string;
  date: Dayjs;
  site: string;

  [label: `LABEL_${string}`]: string; // see LABEL_PREFIX constant
}

export interface ExportFile extends Omit<GridRow, 'date'> {
  date: string;
}

export interface Band {
  name: string; // unique
  low: number;
  high: number;
}

export interface Integration {
  name: string; // unique
  seconds: number;
}

export interface Extractor {
  name: string; // unique
  type: NeuralExtractorType;
  offset: number;
  step: number;
  persist: boolean;
  isNeural: boolean;
}

export interface Reducer {
  name: string;
  dimensions: number;
  extractors: Extractor[];
  bands: Band[];
  integrations: Integration[];
  ranges: Range_[];
}

export interface Range_ {
  name: string; // unique
  start: Dayjs;
  end: Dayjs;
}

type TrajectoryStep = 'hour' | 'day' | 'month';

export interface Trajectory {
  name: string; // unique
  start: Dayjs;
  end: Dayjs;
  labelProperty: string;
  labelValue: string;
  step: TrajectoryStep;
}

export interface Digester {
  type: DigesterType;
}

export interface Autocluster {
  name: string; // unique
  type: AutoclusterType;
  minClusterSize: number;
  minSamples: number;
  alpha: number;
  epsilon: number;
}
