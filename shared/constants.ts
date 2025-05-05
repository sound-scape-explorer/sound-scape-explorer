import {
  AdiImplEnum,
  ComputationStrategyEnum,
  FrequencyScaleEnum,
  StftWindowTypeEnum,
} from '@shared/enums';

export const SITE_DEFAULT = '__ALL';
export const JSON_TYPE = 'application/json';
export const XLSX_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

export const FILE_TYPES = ['audio/wav'];
export const STORAGE_PATH_SUFFIX = '.h5';
export const DATE_FORMAT = 'yyyy-MM-dd HH:mm:ss';

export const ICON_SIZE = 12;
export const TIMELINE_ORIGIN_MIN = new Date('2000-01-01 00:00:00');

// settings defaults
export const STORAGE_PATH_DEFAULT = 'storage.h5';
export const AUDIO_PATH_DEFAULT = '';
export const SAMPLE_RATE_DEFAULT = 44100;
export const TIMELINE_ORIGIN_DEFAULT = '2001-01-01 00:00:01';
export const AUDIO_HOST_DEFAULT = '';
export const TIMEZONE_DEFAULT = '';
export const COMPUTATION_STRATEGY_DEFAULT = ComputationStrategyEnum.enum.UMAP;
export const COMPUTATION_DIMENSIONS_DEFAULT = 3;
export const COMPUTATION_ITERATIONS_DEFAULT = 10;
export const DISPLAY_SEED_DEFAULT = 42000;
export const MEMORY_LIMIT_DEFAULT = 4;

// integration defaults
export const INTEGRATION_DURATION = 15000;

// reducer defaults
export const REDUCER_DIMENSIONS_DEFAULT = 3;

// autocluster defaults
export const AUTOCLUSTER_MIN_CLUSTER_SIZE_DEFAULT = 15;
export const AUTOCLUSTER_MIN_SAMPLES_DEFAULT = 15;
export const AUTOCLUSTER_ALPHA_DEFAULT = 1;
export const AUTOCLUSTER_EPSILON_DEFAULT = 0.1;

// extractor defaults
export const WINDOW_MS_DEFAULT = 1000;
export const HOP_MS_DEFAULT = 1000;
export const BIRDNET_WINDOW_MS = 3000;
export const PERCH_WINDOW_MS = 5000;
export const SURFPERCH_WINDOW_MS = 5000;
export const VGGISH_WINDOW_MS = 1000;
export const YAMNET_WINDOW_MS = 1000;
export const MUSICCLASS_WINDOW_MS = 3000;

export const SPECTRO_N_BANDS = 64;
export const SPECTRO_SCALE: FrequencyScaleEnum = FrequencyScaleEnum.enum.LIN;
export const SPECTRO_STFT_WINDOW_TYPE: StftWindowTypeEnum =
  StftWindowTypeEnum.enum.HANN;
export const SPECTRO_STFT_WINDOW_MS = WINDOW_MS_DEFAULT;
export const SPECTRO_STFT_OVERLAP_RATIO = 0.0;
export const SPECTRO_DBFS_REF = 1.0;

export const MPS_N_BANDS = 64;
export const MPS_SCALE: FrequencyScaleEnum = FrequencyScaleEnum.enum.LIN;
export const MPS_STFT_1_WINDOW_MS = 20;
export const MPS_STFT_1_OVERLAP_RATIO = 0.95;
export const MPS_STFT_2_WINDOW_MS = 100;
export const MPS_STFT_2_OVERLAP_RATIO = 0.167;

export const MFCC_N_MFCC = 13;

export const NDSI_BAND_BIO: [number, number] = [1000, 10000];
export const NDSI_BAND_ANTHRO: [number, number] = [0, 1000];

export const ADI_BIN_STEP = 500;
export const ADI_DB_THRESHOLD = -50;
export const ADI_IMPL: AdiImplEnum = AdiImplEnum.enum.SHANNON;

export const HT_FRAME_SIZE = 512;
export const MED_FRAME_SIZE = 512;

export const LEQ_SHORT_DT = 0.05;

export const LEQ_PERCENTILE_VALUE = 90;

export const LEQ_DIFF_PERCENTILE_A = 90;
export const LEQ_DIFF_PERCENTILE_B = 10;

export const UMAP_MIN_DIST = 0.1;
