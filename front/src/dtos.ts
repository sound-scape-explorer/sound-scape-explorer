import {
  AutoclusterImpl,
  ComputationStrategy,
  DigesterImpl,
  ExtractorImpl,
  IndexImpl,
  ReducerImpl,
  TrajectoryStep,
} from '@shared/enums';

export interface SettingsDto {
  storage_path: string;
  audio_path: string;
  expected_sample_rate: number;
  timeline_origin: number; // unix ms
  audio_host: string;
  timezone: string;
  computation_strategy: ComputationStrategy;
  computation_dimensions: number;
  computation_iterations: number;
  display_seed: number;
  memory_limit: number;
}

export interface FileDto {
  index: number;
  relativePath: string;
  absolutePath: string;
  timestamp: number;
  site: string;
  duration: number;
  labelProperties: string[];
  labelValues: string[];
}

export interface BandDto {
  index: number;
  name: string;
  low: number;
  high: number;
}

export interface IntegrationDto {
  index: number;
  name: string;
  duration: number; // ms
}

export interface ExtractorDto {
  index: number;
  name: string;
  impl: ExtractorImpl;
  offset: number;
  step: number;
  isPersist: boolean;
}

export interface IndexDto {
  index: number;
  impl: IndexImpl;
  offset: number;
  step: number;
  isPersist: boolean;
}

export interface RangeDto {
  index: number;
  name: string;
  start: number; // unix ms
  end: number; // unix ms
}

export interface AutoclusterDto {
  index: number;
  impl: AutoclusterImpl;
  minClusterSize: number;
  minSamples: number;
  alpha: number;
  epsilon: number;
}

export interface TrajectoryDto {
  index: number;
  name: string;
  start: number; // unix ms
  end: number; // unix ms
  labelProperty: string;
  labelValue: string;
  step: TrajectoryStep;
}

export interface DigesterDto {
  index: number;
  impl: DigesterImpl;
  isPairing: boolean;
}

export interface DigesterDtoWithType extends DigesterDto {
  type: '1d' | '2d' | '2d-pairing';
}

export interface ReducerDto {
  index: number;
  impl: ReducerImpl;
  dimensions: number;
  bands: BandDto['index'][];
  integrations: IntegrationDto['index'][];
  extractors: ExtractorDto['index'][];
}

export interface ReducerDtoWithObjects
  extends Omit<ReducerDto, 'bands' | 'integrations' | 'extractors'> {
  bands: BandDto[];
  integrations: IntegrationDto[];
  extractors: ExtractorDto[];
}
