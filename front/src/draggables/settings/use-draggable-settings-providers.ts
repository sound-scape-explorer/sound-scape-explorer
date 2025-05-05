import {InjectionKey} from 'src/common/injection-key';
import {useAudioHost} from 'src/composables/use-audio-host';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useRefProvide} from 'src/composables/use-ref-provide';
import {useSpectrogramColormap} from 'src/draggables/audio/use-spectrogram-colormap';
import {useWavesurferSettings} from 'src/draggables/audio/use-wavesurfer-settings';

export function useDraggableSettingsProviders() {
  const {
    darkMode,
    isDetailsAutoOpen,
    isAudioAutoOpen,
    plotBackground,
    isTimezoneActive,
    timeshift,
    isCopyOnSelect2d,
    isWebGlScatter2d,
    isHidingMenuOnDraggableToggle,
    isDevEnabled,
    isSelectedPointHighlighted,
    isDetailedExportName,
    isAlphaPreview,
    isBetaPreview,
    scatterBorderWidth,
  } = useClientSettings();

  const {audioHost} = useAudioHost();
  const {plotFontSize} = useClientSettings();
  const {colormap} = useSpectrogramColormap();
  const {isDecibelsDisplay, isLegendOverflow} = useWavesurferSettings();

  useRefProvide(InjectionKey.SETTINGS_DARK_MODE, darkMode);
  useRefProvide(InjectionKey.settingsAudioHost, audioHost);
  useRefProvide(InjectionKey.settingsTimeShift, timeshift);
  useRefProvide(InjectionKey.settingsColormap, colormap);
  useRefProvide(InjectionKey.settingsPlotBackground, plotBackground);
  useRefProvide(InjectionKey.settingsPlotFontSize, plotFontSize);
  useRefProvide(InjectionKey.settingsIsDetailsAutoOpen, isDetailsAutoOpen);
  useRefProvide(InjectionKey.settingsIsAudioAutoOpen, isAudioAutoOpen);
  useRefProvide(InjectionKey.settingsDecibelsDisplay, isDecibelsDisplay);
  useRefProvide(InjectionKey.settingsLegendOverflow, isLegendOverflow);
  useRefProvide(InjectionKey.settingsIsTimezoneActive, isTimezoneActive);
  useRefProvide(InjectionKey.settingsIsCopyOnSelect2d, isCopyOnSelect2d);
  useRefProvide(InjectionKey.settingsIsWebGlScatter2d, isWebGlScatter2d);
  useRefProvide(InjectionKey.settingsIsAlphaPreview, isAlphaPreview);
  useRefProvide(InjectionKey.settingsIsBetaPreview, isBetaPreview);
  useRefProvide(InjectionKey.settingsIsDevEnabled, isDevEnabled);
  useRefProvide(InjectionKey.settingsScatterBorderWidth, scatterBorderWidth);
  useRefProvide(
    InjectionKey.settingsIsDetailedExportName,
    isDetailedExportName,
  );

  useRefProvide(
    InjectionKey.settingsIsSelectedPointHighlighted,
    isSelectedPointHighlighted,
  );

  useRefProvide(
    InjectionKey.settingsIsHidingMenuOnDraggableToggle,
    isHidingMenuOnDraggableToggle,
  );
}
