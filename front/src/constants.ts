import {z} from 'zod';

export const STRING_DELIMITER = '|||';
export const SLUG_DELIMITER = ' - ';

export const LINEBREAK = '%0D%0A';

export const ALERT_TIMER = 3000;

export const EXPORT_FILENAME = 'SSE';

export const AUDIO_GAIN = {
  default: 0.1,
  step: 0.1,
  max: 100.0,
  min: 0.1,
};

export const DEBOUNCE_MS = 20;
export const WAVEFORM_HEIGHT = 0.5;

export const PLAYBACK_RATE = {
  default: 1,
  max: 2,
  min: 0.1,
  step: 0.01,
};

export const SpectrogramFftSize = z.enum([
  '128',
  '256',
  '512',
  '1024',
  '2048',
  '4096',
]);

// eslint-disable-next-line no-redeclare
export type SpectrogramFftSize = z.infer<typeof SpectrogramFftSize>;

export const TagsDraggableSize = z.enum(['small', 'medium', 'large']);
// eslint-disable-next-line no-redeclare
export type TagsDraggableSize = z.infer<typeof TagsDraggableSize>;

export const SpectrogramColorMap = z.enum([
  'hot',
  'inferno',
  'jet',
  'greys',
  'viridis',
]);

// eslint-disable-next-line no-redeclare
export type SpectrogramColorMap = z.infer<typeof SpectrogramColorMap>;

export const TRACE_WIDTH_3D = 6;
export const TRACE_WIDTH_2D = 2;

export const CURRENT_SCATTER_LEGEND_ID = 'current-scatter-legend'; // this is used as a selector to render the legend to canvas on scatter png export

export const ColorFlavor = z.enum(['Spectral', 'Accent', 'Dark2']);
// eslint-disable-next-line no-redeclare
export type ColorFlavor = z.infer<typeof ColorFlavor>;

export const RELATIVE_TRAJECTORIES_FLAVOR = ColorFlavor.enum.Dark2;

// Plotly instances for Indicators and Digesters.
export const PLOTLY_SIZE = 520;

export const PlotBackground = z.enum(['transparent', 'white']);
// eslint-disable-next-line no-redeclare
export type PlotBackground = z.infer<typeof PlotBackground>;

export const LINK_DOCS = 'https://sound-scape-explorer.github.io/docs';
export const LINK_BUG_REPORT =
  'https://github.com/sound-scape-explorer/sound-scape-explorer/issues/new?template=bug_report.yml';
export const LINK_CHANGELOG =
  'https://github.com/sound-scape-explorer/sound-scape-explorer/blob/main/CHANGELOG.md';
export const LINK_DISCORD = 'https://discord.gg/eRsQPDBeXg';

export const TIMEOUT = 240;

export const AUTOCLUSTER_AS_TAG_NAME = 'AUTOCLUSTER';

export const LOWER_DECILE_SUFFIX = '_lower_decile';
export const UPPER_DECILE_SUFFIX = '_upper_decile';

export const RANGE_CUSTOM = '**CUSTOM**';

export const ScatterBorderWidth = z.enum(['0', '1', '2']);
// eslint-disable-next-line no-redeclare
export type ScatterBorderWidth = z.infer<typeof ScatterBorderWidth>;

export const ColorCategory = z.enum(['DEFAULT', 'TAGS', 'ACOUSTICS']);
// eslint-disable-next-line no-redeclare
export type ColorCategory = z.infer<typeof ColorCategory>;

export const ColorOption = z.enum([
  'HoursInDay',
  'DayOrNight',
  'IntervalIndex',
]);

export type ColorCriteria = z.infer<typeof ColorOption>;

export const HeatmapScale = z.enum(['RdBu', 'Blues']);
// eslint-disable-next-line no-redeclare
export type HeatmapScale = z.infer<typeof HeatmapScale>;

export const ExportType = z.enum([
  'scatter',
  'temporal',
  'heatmap',
  'trajectories',
  'relativeTrajectories',
]);

// eslint-disable-next-line no-redeclare
export type ExportType = z.infer<typeof ExportType>;

export const AudioFilterSlope = z.enum(['12', '24', '36', '48']); // multiples of 12
// eslint-disable-next-line no-redeclare
export type AudioFilterSlope = z.infer<typeof AudioFilterSlope>;

export const SELECTION_RANGE_STEP = 0.05;
export const SELECTION_ANGLE_STEP = 5;
