import {InjectionKey} from 'src/common/injection-key';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useRefProvide} from 'src/composables/use-ref-provide';

export function useDraggableSettingsProviders() {
  const {
    darkMode,
    audioHost,
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
    plotFontSize,
    spectrogramColorMap,
    decibelsDisplay,
    legendOverflow,
  } = useClientSettings();

  useRefProvide(InjectionKey.enum.SETTINGS_DARK_MODE, darkMode);
  useRefProvide(InjectionKey.enum.SETTINGS_AUDIO_HOST, audioHost);
  useRefProvide(InjectionKey.enum.SETTINGS_TIME_SHIFT, timeshift);
  useRefProvide(InjectionKey.enum.SETTINGS_COLOR_MAP, spectrogramColorMap);
  useRefProvide(InjectionKey.enum.SETTINGS_PLOT_BACKGROUND, plotBackground);
  useRefProvide(InjectionKey.enum.SETTINGS_PLOT_FONT_SIZE, plotFontSize);
  useRefProvide(
    InjectionKey.enum.SETTINGS_IS_DETAILS_AUTO_OPEN,
    isDetailsAutoOpen,
  );
  useRefProvide(InjectionKey.enum.SETTINGS_IS_AUDIO_AUTO_OPEN, isAudioAutoOpen);
  useRefProvide(InjectionKey.enum.SETTINGS_DECIBELS_DISPLAY, decibelsDisplay);
  useRefProvide(InjectionKey.enum.SETTINGS_LEGEND_OVERFLOW, legendOverflow);
  useRefProvide(
    InjectionKey.enum.SETTINGS_IS_TIMEZONE_ACTIVE,
    isTimezoneActive,
  );
  useRefProvide(
    InjectionKey.enum.SETTINGS_IS_COPY_ON_SELECT_2D,
    isCopyOnSelect2d,
  );
  useRefProvide(
    InjectionKey.enum.SETTINGS_IS_WEBGL_SCATTER_2D,
    isWebGlScatter2d,
  );
  useRefProvide(InjectionKey.enum.SETTINGS_IS_ALPHA_PREVIEW, isAlphaPreview);
  useRefProvide(InjectionKey.enum.SETTINGS_IS_BETA_PREVIEW, isBetaPreview);
  useRefProvide(InjectionKey.enum.SETTINGS_IS_DEV_ENABLED, isDevEnabled);
  useRefProvide(
    InjectionKey.enum.SETTINGS_SCATTER_BORDER_WIDTH,
    scatterBorderWidth,
  );
  useRefProvide(
    InjectionKey.enum.SETTINGS_IS_DETAILED_EXPORT_NAME,
    isDetailedExportName,
  );

  useRefProvide(
    InjectionKey.enum.SETTINGS_IS_SELECTED_POINT_HIGHLIGHTED,
    isSelectedPointHighlighted,
  );

  useRefProvide(
    InjectionKey.enum.SETTINGS_IS_HIDING_MENU_ON_DRAGGABLE_TOGGLE,
    isHidingMenuOnDraggableToggle,
  );
}
