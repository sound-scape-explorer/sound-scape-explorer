export const ALERT_TIMER = 3000;

export const EXPORT_FILENAME = 'SSE';

export const RENDERING_DELAY_SLOW = 250;

export const SLIDER_LIMITS = {
  start: '⟦',
  end: '⟧',
};

export const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export const WAVE = {
  min: 1,
  max: 100,
  step: 10,
  default: 10,
};

export const FFT_SIZE = {
  default: 1024,
  max: 4096,
  min: 128,
};

export const PLAYBACK_RATE = {
  default: 1,
  max: 2,
  min: 0.1,
  step: 0.01,
};

export const SPECTROGRAM_COLOR_MAPS = [
  'hot',
  'inferno',
  'jet',
  'greys',
  'viridis',
];

export const TRACE_WIDTH_3D = 6;
export const TRACE_WIDTH_2D = 2;

export const CURRENT_SCATTER_LEGEND_ID = 'current-scatter-legend';

export const NN_EXTRACTORS = ['vgg', 'yamnet'];

// Plotly instances for Indicators and Digesters.
export const PLOTLY_SIZE = 600;

export enum PLOT_BACKGROUND {
  transparent = 'transparent',
  white = 'white',
}

export const LINK_DOCS = 'https://sound-scape-explorer.github.io';
export const LINK_BUG_REPORT =
  'https://github.com/sound-scape-explorer/sound-scape-explorer/issues/new?template=bug_report.yml';
