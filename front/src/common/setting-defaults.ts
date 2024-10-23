import {
  COLOR_FLAVORS,
  PLOT_BACKGROUND,
  SPECTROGRAM_COLOR_MAPS,
} from 'src/constants';
import {type DraggableLabelSize} from 'src/draggables/labels/use-draggable-labels';
import {VERSION} from 'src/version';

interface SettingDefaults {
  version: string;
  plotBackground: string;
  timeshift: number;
  isDetailsAutoOpen: boolean;
  isAudioAutoOpen: boolean;
  isPreview: boolean;
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
  colorsFlavor: string;
  colorsAlphaLow: number;
  colorsAlphaHigh: number;
  isHidingMenuOnDraggableToggle: boolean;
  isDevEnabled: boolean;
  devAutoLoadView: boolean;
  isSelectedPointHighlighted: boolean;
  isDetailedExportName: boolean;
}

export const settingDefaults: SettingDefaults = {
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
};
