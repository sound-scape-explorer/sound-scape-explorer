import {
  COLOR_FLAVORS,
  type ColorFlavor,
  PLOT_BACKGROUND,
  SPECTROGRAM_COLOR_MAPS,
} from 'src/constants';
import {type DraggableLabelSize} from 'src/draggables/labels/use-draggable-labels';
import {VERSION} from 'src/version';

export type ScatterBorderWidth = '0' | '1' | '2';

interface SettingDefaults {
  version: string;
  plotBackground: string;
  timeshift: number;
  isDetailsAutoOpen: boolean;
  isAudioAutoOpen: boolean;
  isAlphaPreview: boolean;
  isBetaPreview: boolean;
  isTimezoneActive: boolean;
  isCopyOnSelect2d: boolean;
  isWebGlScatter2d: boolean;
  isColorMapSwapped: boolean;
  spectrogramColorMap: string;
  audioHost: string;
  fontSize: number;
  decibelsDisplay: boolean;
  legendOverflow: boolean;
  labelsSizeHorizontal: DraggableLabelSize;
  labelsSizeVertical: DraggableLabelSize;
  colorsFlavor: ColorFlavor;
  colorsAlphaLow: number;
  colorsAlphaHigh: number;
  isHidingMenuOnDraggableToggle: boolean;
  isDevEnabled: boolean;
  devAutoLoadView: boolean;
  isSelectedPointHighlighted: boolean;
  isDetailedExportName: boolean;
  scatterBorderWidth: ScatterBorderWidth;
}

export const settingDefaults: SettingDefaults = {
  version: VERSION,
  plotBackground: PLOT_BACKGROUND.transparent,
  timeshift: 0, // hours
  isDetailsAutoOpen: false,
  isAudioAutoOpen: true,
  isAlphaPreview: false,
  isBetaPreview: false,
  isTimezoneActive: false,
  isCopyOnSelect2d: true,
  isWebGlScatter2d: true,
  isColorMapSwapped: false,
  spectrogramColorMap: SPECTROGRAM_COLOR_MAPS[0],
  audioHost: 'http://localhost:5531',
  fontSize: 12,
  decibelsDisplay: false,
  legendOverflow: false,
  labelsSizeHorizontal: 'default',
  labelsSizeVertical: 'default',
  colorsFlavor: COLOR_FLAVORS[0],
  colorsAlphaLow: 0.005,
  colorsAlphaHigh: 0.8,
  isHidingMenuOnDraggableToggle: false,
  isDevEnabled: false,
  devAutoLoadView: false,
  isSelectedPointHighlighted: true,
  isDetailedExportName: true,
  scatterBorderWidth: '1',
};
