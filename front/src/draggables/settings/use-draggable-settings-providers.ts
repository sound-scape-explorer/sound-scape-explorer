import {useAppHeatmapSize} from 'src/app/heatmap/use-app-heatmap-size';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useRefProvide} from 'src/composables/use-ref-provide';
import {useStorageAudioHost} from 'src/composables/use-storage-audio-host';
import {useSpectrogramColormap} from 'src/draggables/audio/use-spectrogram-colormap';
import {useWavesurferSettings} from 'src/draggables/audio/use-wavesurfer-settings';

export function useDraggableSettingsProviders() {
  const {
    isDetailsAutoOpen,
    isAudioAutoOpen,
    plotBackground,
    isPreview,
    isTimezoneActive,
    timeshift,
    isCopyOnSelect2d,
    isWebGlScatter2d,
    isHidingMenuOnDraggableToggle,
    isDevEnabled,
    isSelectedPointHighlighted,
    isDetailedExportName,
  } = useClientSettings();

  const {audioHost} = useStorageAudioHost();
  const {fontSize} = useAppHeatmapSize();
  const {colormap} = useSpectrogramColormap();
  const {isDecibelsDisplay, isLegendOverflow} = useWavesurferSettings();

  useRefProvide('settings/audioHost', audioHost);
  useRefProvide('settings/fontSize', fontSize);
  useRefProvide('settings/timeShift', timeshift);
  useRefProvide('settings/colormap', colormap);
  useRefProvide('settings/plotBackground', plotBackground);
  useRefProvide('settings/isDetailsAutoOpen', isDetailsAutoOpen);
  useRefProvide('settings/isAudioAutoOpen', isAudioAutoOpen);
  useRefProvide('settings/decibelsDisplay', isDecibelsDisplay);
  useRefProvide('settings/legendOverflow', isLegendOverflow);
  useRefProvide('settings/isTimezoneActive', isTimezoneActive);
  useRefProvide('settings/isCopyOnSelect2d', isCopyOnSelect2d);
  useRefProvide('settings/isWebGlScatter2d', isWebGlScatter2d);
  useRefProvide('settings/isPreview', isPreview);
  useRefProvide('settings/isDevEnabled', isDevEnabled);
  useRefProvide('settings/isDetailedExportName', isDetailedExportName);

  useRefProvide(
    'settings/isSelectedPointHighlighted',
    isSelectedPointHighlighted,
  );

  useRefProvide(
    'settings/isHidingMenuOnDraggableToggle',
    isHidingMenuOnDraggableToggle,
  );
}
