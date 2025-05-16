import {
  SMOOTHING_WINDOW_PRESETS,
  type SmoothingWindowPreset,
} from '@shared/constants.ts';
import {ExtractionDto, TrajectoryDto} from '@shared/dtos.ts';
import {z} from 'zod';

export const TrajectoryConfig = TrajectoryDto.extend({
  smoothingWindowPreset: z.enum(
    Object.keys(SMOOTHING_WINDOW_PRESETS) as [
      SmoothingWindowPreset,
      ...SmoothingWindowPreset[],
    ],
  ),
});

export type TrajectoryConfig = z.infer<typeof TrajectoryConfig>;

export const ExtractionConfig = ExtractionDto.extend({
  _id: z.string(),
  trajectories: TrajectoryConfig.array(),
});

export type ExtractionConfig = z.infer<typeof ExtractionConfig>;
