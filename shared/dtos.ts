import {INCLUDE_IN_AGGREGATION_DEFAULT} from '@shared/constants';
import {z} from 'zod';

import {
  AdiImpl,
  AutoclusterImpl,
  ComputationStrategy,
  ExtractorImpl,
  FrequencyScale,
  MetricImpl,
  ReducerImpl,
  StftWindowType,
} from './enums';

const dateString = z.string().refine((str) => !Number.isNaN(Date.parse(str)), {
  message: 'Invalid date string',
});

export const FileDto = z.object({
  Index: z.string(),
  Path: z.string(),
  Date: dateString,
  Site: z.string(),
  tags: z.record(z.string(), z.string()),
});

export type FileDto = z.infer<typeof FileDto>;

export const SettingsDto = z.object({
  storagePath: z.string(),
  audioPath: z.string(),
  expectedSampleRate: z.number().int(),
  timelineOrigin: dateString,
  audioHost: z.string(),
  timezone: z.string(),
  computationStrategy: ComputationStrategy,
  computationDimensions: z.number().int(),
  computationIterations: z.number().int(),
  displaySeed: z.number().int(),
  memoryLimit: z.number(),
});

export type SettingsDto = z.infer<typeof SettingsDto>;
export const BandDto = z.object({
  index: z.number().int(),
  name: z.string(), // unique
  low: z.number().int(),
  high: z.number().int(),
});

export type BandDto = z.infer<typeof BandDto>;

export const IntegrationDto = z.object({
  index: z.number().int(),
  name: z.string(), // unique
  duration: z.number().int(), // ms
});

export type IntegrationDto = z.infer<typeof IntegrationDto>;

export const ExtractorDto = z.object({
  index: z.number().int(),
  name: z.string(), // unique
  impl: ExtractorImpl,
  include_in_aggregation: z.boolean().default(INCLUDE_IN_AGGREGATION_DEFAULT),

  window: z.number().int(), // ms
  hop: z.number().int(), // ms

  spectro_n_bands: z.number().int().optional(),
  spectro_scale: FrequencyScale.optional(),
  spectro_stft_window_type: StftWindowType.optional(),
  spectro_stft_window_ms: z.number().int().nullable().optional(),
  spectro_stft_overlap_ratio: z.number().optional(),
  spectro_dbfs_ref: z.number().optional(),

  mps_n_bands: z.number().int().optional(),
  mps_scale: FrequencyScale.optional(),
  mps_stft_1_window_ms: z.number().int().optional(),
  mps_stft_1_overlap_ratio: z.number().optional(),
  mps_stft_2_window_ms: z.number().int().optional(),
  mps_stft_2_overlap_ratio: z.number().optional(),

  mfcc_n_mfcc: z.number().int().optional(),

  ndsi_band_bio: z.tuple([z.number().int(), z.number().int()]).optional(),
  ndsi_band_anthro: z.tuple([z.number().int(), z.number().int()]).optional(),

  adi_bin_step: z.number().int().optional(),
  adi_db_threshold: z.number().int().optional(),
  adi_impl: AdiImpl.optional(),

  ht_frame_size: z.number().int().optional(),
  med_frame_size: z.number().int().optional(),

  leq_percentile_dt: z.number().optional(),
  leq_percentile_value: z.number().int().optional(),

  leq_diff_dt: z.number().optional(),
  leq_diff_percentile_a: z.number().int().optional(),
  leq_diff_percentile_b: z.number().int().optional(),
});

export type ExtractorDto = z.infer<typeof ExtractorDto>;

export const ReducerDto = z.object({
  index: z.number().int(),
  impl: ReducerImpl,
  dimensions: z.number().int(),
});

export type ReducerDto = z.infer<typeof ReducerDto>;

export const AutoclusterDto = z.object({
  index: z.number().int(),
  impl: AutoclusterImpl,
  minClusterSize: z.number(),
  minSamples: z.number(),
  alpha: z.number(),
  epsilon: z.number(),
});

export type AutoclusterDto = z.infer<typeof AutoclusterDto>;

export const MetricDto = z.object({
  index: z.number().int(),
  impl: MetricImpl,
});

export type MetricDto = z.infer<typeof MetricDto>;

export const TrajectoryDto = z.object({
  index: z.number().int(),
  name: z.string(), // unique
  start: dateString,
  end: dateString,
  tagName: z.string(),
  tagValue: z.string(),
  smoothingWindow: z.number().int().positive(),
});

export type TrajectoryDto = z.infer<typeof TrajectoryDto>;

export const ExtractionDto = z.object({
  index: z.number().int(),
  name: z.string(),
  bands: BandDto.array(),
  integrations: IntegrationDto.array(),
  extractors: ExtractorDto.array(),
  reducers: ReducerDto.array(),
  autoclusters: AutoclusterDto.array(),
  metrics: MetricDto.array(),
  trajectories: TrajectoryDto.array(),
});

export type ExtractionDto = z.infer<typeof ExtractionDto>;

export const RangeDto = z.object({
  index: z.number().int(),
  name: z.string(), // unique
  start: dateString,
  end: dateString,
});

export type RangeDto = z.infer<typeof RangeDto>;

export const ConfigDto = z.object({
  version: z.string(),
  settings: SettingsDto,
  extractions: ExtractionDto.array(),
  ranges: RangeDto.array(),
  files: FileDto.array(),
});

export type ConfigDto = z.infer<typeof ConfigDto>;
