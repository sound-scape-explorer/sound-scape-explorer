import {
  COLOR_FLAVORS,
  PLOT_BACKGROUND,
  SPECTROGRAM_COLOR_MAPS,
} from 'src/constants';
import {VERSION} from 'src/version';

export const SettingDefault = {
  version: VERSION,
  plotBackground: PLOT_BACKGROUND.transparent,
  timeshift: 0, // hours
  isDetailsAutoOpen: false,
  isAudioAutoOpen: true,
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
  labelsExpand: false,
  labelsColumns: 1,
  colorsFlavor: COLOR_FLAVORS[0],
  colorsAlphaLow: 0.005,
  colorsAlphaHigh: 0.8,
  isHidingMenuOnDraggableToggle: false,
  isDevEnabled: false,
  devAutoLoadView: false,
  isSelectedPointHighlighted: true,
};
