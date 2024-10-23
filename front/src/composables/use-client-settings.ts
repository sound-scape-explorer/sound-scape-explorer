import {useStorage} from '@vueuse/core';
import {useAppHeatmapSize} from 'src/app/heatmap/use-app-heatmap-size';
import {useAppNotification} from 'src/app/notification/use-app-notification';
import {settingDefaults as d} from 'src/common/setting-defaults';
import {SettingKey as k} from 'src/common/setting-key';
import {useScatterColorAlpha} from 'src/components/scatter/use-scatter-color-alpha';
import {useClientSettingsDev} from 'src/composables/use-client-settings-dev';
import {useStorageAudioHost} from 'src/composables/use-storage-audio-host';
import {useSpectrogramColormap} from 'src/draggables/audio/use-spectrogram-colormap';
import {useWavesurferSettings} from 'src/draggables/audio/use-wavesurfer-settings';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {useDraggableLabels} from 'src/draggables/labels/use-draggable-labels';

const version = useStorage<string>(k.version, d.version);
const plotBackground = useStorage<string>(k.plotBackground, d.plotBackground);
const timeshift = useStorage<number>(k.timeshift, d.timeshift);
const isPreview = useStorage<boolean>(k.isPreview, d.isPreview);

const isDetailsAutoOpen = useStorage<boolean>(
  k.isDetailsAutoOpen,
  d.isDetailsAutoOpen,
);

const isAudioAutoOpen = useStorage<boolean>(
  k.isAudioAutoOpen,
  d.isAudioAutoOpen,
);

const isTimezoneActive = useStorage<boolean>(
  k.isTimezoneActive,
  d.isTimezoneActive,
);
const isCopyOnSelect2d = useStorage<boolean>(
  k.isCopyOnSelect2d,
  d.isCopyOnSelect2d,
);
const isWebGlScatter2d = useStorage<boolean>(
  k.isWebGlScatter2d,
  d.isWebGlScatter2d,
);
const isColorMapSwapped = useStorage<boolean>(
  k.isColorMapSwapped,
  d.isColorMapSwapped,
);

const isHidingMenuOnDraggableToggle = useStorage<boolean>(
  k.isHidingMenuOnDraggableToggle,
  d.isHidingMenuOnDraggableToggle,
);

const isSelectedPointHighlighted = useStorage<boolean>(
  k.isSelectedPointHighlighted,
  d.isSelectedPointHighlighted,
);

const isDetailedExportName = useStorage<boolean>(
  k.isDetailedExportName,
  d.isDetailedExportName,
);

export function useClientSettings() {
  const {audioHost} = useStorageAudioHost();
  const {fontSize} = useAppHeatmapSize();
  const {colormap} = useSpectrogramColormap();
  const {isDecibelsDisplay, isLegendOverflow} = useWavesurferSettings();
  const {reset: resetLabels} = useDraggableLabels();
  const {reset: resetAlphas} = useScatterColorAlpha();
  const {reset: resetFlavor} = useColorSelection();
  const {notify} = useAppNotification();
  const {
    isDevEnabled,
    devAutoLoadView,
    reset: resetDev,
  } = useClientSettingsDev();

  const resetAll = () => {
    version.value = d.version;
    plotBackground.value = d.plotBackground;
    timeshift.value = d.timeshift;
    isDetailsAutoOpen.value = d.isDetailsAutoOpen;
    isAudioAutoOpen.value = d.isAudioAutoOpen;
    isPreview.value = d.isPreview;
    isTimezoneActive.value = d.isTimezoneActive;
    isCopyOnSelect2d.value = d.isCopyOnSelect2d;
    isWebGlScatter2d.value = d.isWebGlScatter2d;
    isColorMapSwapped.value = d.isColorMapSwapped;
    isSelectedPointHighlighted.value = d.isSelectedPointHighlighted;
    isDetailedExportName.value = d.isDetailedExportName;

    audioHost.value = d.audioHost;
    fontSize.value = d.fontSize;
    colormap.value = d.spectrogramColorMap;
    isDecibelsDisplay.value = d.decibelsDisplay;
    isLegendOverflow.value = d.legendOverflow;
    resetLabels();
    resetAlphas();
    resetFlavor();
    resetDev();

    notify('success', 'Settings', 'Defaults restored');
  };

  return {
    resetAll: resetAll,
    version: version,
    plotBackground: plotBackground,
    timeshift: timeshift,
    isDetailsAutoOpen: isDetailsAutoOpen,
    isAudioAutoOpen: isAudioAutoOpen,
    isPreview: isPreview,
    isTimezoneActive: isTimezoneActive,
    isCopyOnSelect2d: isCopyOnSelect2d,
    isWebGlScatter2d: isWebGlScatter2d,
    isColorMapSwapped: isColorMapSwapped,
    isHidingMenuOnDraggableToggle: isHidingMenuOnDraggableToggle,
    isDevEnabled: isDevEnabled,
    devAutoLoadView: devAutoLoadView,
    isSelectedPointHighlighted: isSelectedPointHighlighted,
    isDetailedExportName: isDetailedExportName,
  };
}
