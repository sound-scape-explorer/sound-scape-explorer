import {PLOT_BACKGROUND, SPECTROGRAM_COLOR_MAPS} from 'src/constants';

export const SettingDefault = {
  plotBackground: PLOT_BACKGROUND.transparent,
  timeshift: 0, // hours
  isDetailsAutoOpen: false,
  isPreview: false,
  isTimezoneActive: false,
  isCopyOnSelect2d: true,
  isWebGlScatter2d: true,
  isColorMapSwapped: false,
  spectrogramColorMap: SPECTROGRAM_COLOR_MAPS[0],
  audioHost: 'http://localhost:5531/',
  fontSize: 12,
  decibelsDisplay: false,
  legendOverflow: false,
};
