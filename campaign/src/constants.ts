import {ComputationStrategy} from 'src/enums.ts';

export const JSON_TYPE = 'application/json';
export const XLSX_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

export const FILE_TYPES = ['audio/wav'];
export const LABEL_PREFIX = 'LABEL_';
export const DATE_FORMAT = 'yyyy-MM-dd HH:mm:ss';

export const ICON_SIZE = 12;
export const TIMELINE_ORIGIN_MIN = new Date('2000-01-01 00:00:00');

// settings defaults
export const STORAGE_PATH_DEFAULT = 'storage';
export const AUDIO_PATH_DEFAULT = '';
export const SAMPLE_RATE_DEFAULT = 44100;
export const TIMELINE_ORIGIN_DEFAULT = '2001-01-01 00:00:01';
export const AUDIO_HOST_DEFAULT = '';
export const TIMEZONE_DEFAULT = '';
export const COMPUTATION_STRATEGY_DEFAULT = ComputationStrategy.Umap;
export const COMPUTATION_DIMENSIONS_DEFAULT = 3;
export const COMPUTATION_ITERATIONS_DEFAULT = 10;
export const DISPLAY_SEED_DEFAULT = 42000;
export const MEMORY_LIMIT_DEFAULT = 4;

// extractors/indices defaults
export const OFFSET_DEFAULT = 0;
export const STEP_DEFAULT = 1000;
export const IS_PERSIST_DEFAULT = false;

// reducers defaults
export const REDUCER_DIMENSIONS_DEFAULT = 3;

// autoclusters defaults
export const AUTOCLUSTER_MIN_CLUSTER_SIZE_DEFAULT = 15;
export const AUTOCLUSTER_MIN_SAMPLES_DEFAULT = 15;
export const AUTOCLUSTER_ALPHA_DEFAULT = 1;
export const AUTOCLUSTER_EPSILON_DEFAULT = 0.1;
