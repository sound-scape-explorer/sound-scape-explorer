import {type Settings} from 'src/types';

// ids in order
export const JSON_TYPE = 'application/json';
export const XLSX_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

export const FILE_TYPES = ['audio/wav'];
export const BASE_WIDTH = 80;
export const LABEL_PREFIX = 'LABEL_';
export const REDUCERS = ['UMAP'];
export const REDUCER_NONE = 'None';
export const STORAGE_EXT = '.h5';
export const DATE_FORMAT = 'yyyy-MM-dd HH:mm:ss';
export const DEFAULT_AUDIO_PATH = 'NOT RUNNING IN ELECTRON';

export const DEFAULT_SETTINGS: Settings = {
  storagePath: 'storage',
  audioPath: DEFAULT_AUDIO_PATH,
  expectedSampleRate: 44100,
  timelineOrigin: '2001-01-01 00:00:01',
  audioHost: '',
  timezone: '',
  computationDimensions: 3,
  computationIterations: 10,
  displaySeed: 42000,
};

export const XLSX_EXTRACTORS = ['vgg'];
export const ICON_SIZE = 12;
export const TIMELINE_ORIGIN_MIN = new Date('2000-01-01 00:00:00');
