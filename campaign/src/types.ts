import {type Dayjs} from 'dayjs';

export interface Settings {
  storagePath: string;
  audioPath: string; // prefilled
  expectedSampleRate: number;
  timelineOrigin: Dayjs; // TODO: add date picker
  audioHost: string; // TODO: not sure this is useful
  timezone?: string;
  computationDimensions?: number;
  computationIterations?: number;
  displaySeed?: number;
}

export interface InputFile {
  path: string;
  relativePath: string;
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

export interface OutputFile {
  index: number;
  path: string;
  date: string;
  site: string;
}

export interface JsonFile {
  Index: string;
  Path: string;
  Date: string;
  Site: string;
  [label: string]: string;
}

export interface Band {
  name: string;
  low: number;
  high: number;
}

export interface Integration {
  name: string;
  seconds: number;
}

export interface Extractor {
  name: string;
  offset: number;
  step: number;
  persist: boolean;
  isNeural: boolean;
  reducer?: Reducer;
}

export interface Reducer {
  name: string;
  dimensions: number;
}
