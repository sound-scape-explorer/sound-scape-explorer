export const LINEBREAK = '%0D%0A';

export const ALERT_TIMER = 3000;

export const EXPORT_FILENAME = 'SSE';

export const SLIDER_LIMITS = {
  start: '⟦',
  end: '⟧',
};

export const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export const GAIN = {
  default: 100.0,
  step: 50.0,
  max: 500.0,
  min: 0.0,
};

const waveDampening = 2;

export const WAVE = {
  default: GAIN.default / waveDampening,
  step: GAIN.step / waveDampening,
  max: GAIN.max / waveDampening,
  min: GAIN.min / waveDampening,
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

export type ColorFlavor = 'Spectral' | 'Accent' | 'Dark2';
export const COLOR_FLAVORS: ColorFlavor[] = ['Spectral', 'Accent', 'Dark2'];

// Plotly instances for Indicators and Digesters.
export const PLOTLY_SIZE = 520;

export enum PLOT_BACKGROUND {
  transparent = 'transparent',
  white = 'white',
}

export const LINK_DOCS = 'https://sound-scape-explorer.github.io/docs';
export const LINK_BUG_REPORT =
  'https://github.com/sound-scape-explorer/sound-scape-explorer/issues/new?template=bug_report.yml';
export const LINK_CHANGELOG =
  'https://github.com/sound-scape-explorer/sound-scape-explorer/blob/main/CHANGELOG.md';
export const LINK_DISCORD = 'https://discord.gg/eRsQPDBeXg';

export const TIMEOUT = 240;

export const DEV_AUTO_REDUCER = 'umap (3d)';
