import {useStorage} from '@vueuse/core';
import {useAppHeatmapSize} from 'src/app/heatmap/use-app-heatmap-size';
import {SettingDefault as d} from 'src/common/setting-default';
import {SettingKey as k} from 'src/common/setting-key';
import {useColorSelection} from 'src/components/scatter/use-color-selection';
import {useScatterColorAlpha} from 'src/components/scatter/use-scatter-color-alpha';
import {useStorageAudioHost} from 'src/composables/use-storage-audio-host';
import {useSpectrogramColormap} from 'src/draggables/audio/use-spectrogram-colormap';
import {useWavesurferSettings} from 'src/draggables/audio/use-wavesurfer-settings';
import {useDraggableLabels} from 'src/draggables/labels/use-draggable-labels';

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

export function useClientSettings() {
  const {audioHost} = useStorageAudioHost();
  const {fontSize} = useAppHeatmapSize();
  const {colormap} = useSpectrogramColormap();
  const {isDecibelsDisplay, isLegendOverflow} = useWavesurferSettings();
  const {reset: resetLabels} = useDraggableLabels();
  const {reset: resetAlphas} = useScatterColorAlpha();
  const {reset: resetFlavor} = useColorSelection();

  const resetAll = () => {
    plotBackground.value = d.plotBackground;
    timeshift.value = d.timeshift;
    isDetailsAutoOpen.value = d.isDetailsAutoOpen;
    isAudioAutoOpen.value = d.isAudioAutoOpen;
    isPreview.value = d.isPreview;
    isTimezoneActive.value = d.isTimezoneActive;
    isCopyOnSelect2d.value = d.isCopyOnSelect2d;
    isWebGlScatter2d.value = d.isWebGlScatter2d;
    isColorMapSwapped.value = d.isColorMapSwapped;

    audioHost.value = d.audioHost;
    fontSize.value = d.fontSize;
    colormap.value = d.spectrogramColorMap;
    isDecibelsDisplay.value = d.decibelsDisplay;
    isLegendOverflow.value = d.legendOverflow;
    resetLabels();
    resetAlphas();
    resetFlavor();
  };

  return {
    resetAll: resetAll,
    plotBackground: plotBackground,
    timeshift: timeshift,
    isDetailsAutoOpen: isDetailsAutoOpen,
    isAudioAutoOpen: isAudioAutoOpen,
    isPreview: isPreview,
    isTimezoneActive: isTimezoneActive,
    isCopyOnSelect2d: isCopyOnSelect2d,
    isWebGlScatter2d: isWebGlScatter2d,
    isColorMapSwapped: isColorMapSwapped,
  };
}
