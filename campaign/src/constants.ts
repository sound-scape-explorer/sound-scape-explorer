import dayjs from 'dayjs';
import {type Settings} from 'src/types';

export const FILE_TYPES = ['audio/wav'];
export const BASE_WIDTH = 80;
export const LABEL_PREFIX = 'LABEL_';
export const EXTRACTORS = ['VGGish'];
export const REDUCERS = ['UMAP'];
export const REDUCER_NONE = 'None';
export const STORAGE_EXT = '.h5';

export const DEFAULT_SETTINGS: Settings = {
  storagePath: 'storage',
  audioPath: 'TODO after electron to prefill',
  expectedSampleRate: 44100,
  timelineOrigin: dayjs().year(2021).month(1).day(1).hour(0),
  audioHost: '',
  timezone: '',
  computationDimensions: 3,
  computationIterations: 10,
  displaySeed: 42000,
};
