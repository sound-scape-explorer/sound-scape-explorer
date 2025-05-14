<script lang="ts" setup>
import {TIMEZONE_DEFAULT} from '@shared/constants';
import AppButton from 'src/app/app-button.vue';
import AppCheckbox from 'src/app/app-checkbox.vue';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import AppInput from 'src/app/input/app-input.vue';
import AppSelect from 'src/app/select/app-select.vue';
import {InjectionKey} from 'src/common/injection-key';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useConfig} from 'src/composables/use-config';
import {
  PlotBackground,
  ScatterBorderWidth,
  SpectrogramColorMap,
} from 'src/constants';
import DraggableSettingsDev from 'src/draggables/settings/draggable-settings-dev.vue';
import DraggableSettingsItem from 'src/draggables/settings/draggable-settings-item.vue';
import {useDraggableSettingsProviders} from 'src/draggables/settings/use-draggable-settings-providers';

const {
  resetAll,
  darkMode,
  isDetailsAutoOpen,
  isAudioAutoOpen,
  isAlphaPreview,
  isBetaPreview,
  isTimezoneActive,
  isCopyOnSelect2d,
  isWebGlScatter2d,
  isHidingMenuOnDraggableToggle,
  isDevEnabled,
  isSelectedPointHighlighted,
  isDetailedExportName,
  decibelsDisplay: isDecibelsDisplay,
  legendOverflow: isLegendOverflow,
} = useClientSettings();

const {config} = useConfig();

const reload = () => location.reload();

useDraggableSettingsProviders();
</script>

<template>
  <AppDraggable draggable-key="settings">
    <div :class="$style.reload">
      <AppButton
        :handle-click="resetAll"
        grow
        size="small"
      >
        Restore defaults
      </AppButton>
    </div>

    <div :class="$style.container">
      <DraggableSettingsItem title="Dark mode (will toggle page refresh)">
        <AppCheckbox
          :default="darkMode"
          :handle-click="reload"
          :injection-key="InjectionKey.enum.SETTINGS_DARK_MODE"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Audio: set audio host">
        <AppInput
          :injection-key="InjectionKey.enum.SETTINGS_AUDIO_HOST"
          align="left"
          size="small"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Draggables: Hide menu on display toggle">
        <AppCheckbox
          :default="isHidingMenuOnDraggableToggle"
          :injection-key="
            InjectionKey.enum.SETTINGS_IS_HIDING_MENU_ON_DRAGGABLE_TOGGLE
          "
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem
        :title="`Time: Apply timezone (${
          config?.settings.timezone ? config.settings.timezone : 'disabled'
        })`"
      >
        <AppCheckbox
          :default="isTimezoneActive"
          :disabled="
            !config?.settings.timezone ||
            config?.settings.timezone !== TIMEZONE_DEFAULT
          "
          :injection-key="InjectionKey.enum.SETTINGS_IS_TIMEZONE_ACTIVE"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Time: Apply custom shift (in hours)">
        <AppInput
          :injection-key="InjectionKey.enum.SETTINGS_TIME_SHIFT"
          align="left"
          size="small"
          type="number"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Plots: Set background color">
        <AppSelect
          :class="$style['background-color']"
          :injection-key="InjectionKey.enum.SETTINGS_PLOT_BACKGROUND"
          :options="PlotBackground.options"
          size="small"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Plots: Set font size">
        <AppInput
          :injection-key="InjectionKey.enum.SETTINGS_PLOT_FONT_SIZE"
          align="left"
          size="small"
          type="number"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Scatter: Selected interval border width">
        <AppSelect
          :class="$style['scatter-border-width']"
          :injection-key="InjectionKey.enum.SETTINGS_SCATTER_BORDER_WIDTH"
          :options="ScatterBorderWidth.options"
          size="small"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Scatter: Highlight selected point">
        <AppCheckbox
          :default="isSelectedPointHighlighted"
          :injection-key="
            InjectionKey.enum.SETTINGS_IS_SELECTED_POINT_HIGHLIGHTED
          "
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Scatter: Open Audio on click">
        <AppCheckbox
          :default="isAudioAutoOpen"
          :injection-key="InjectionKey.enum.SETTINGS_IS_AUDIO_AUTO_OPEN"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Scatter: Open Details on click">
        <AppCheckbox
          :default="isDetailsAutoOpen"
          :injection-key="InjectionKey.enum.SETTINGS_IS_DETAILS_AUTO_OPEN"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Scatter: Use WebGL (2d)">
        <AppCheckbox
          :default="isWebGlScatter2d"
          :injection-key="InjectionKey.enum.SETTINGS_IS_WEBGL_SCATTER_2D"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem
        title="Scatter: Copy to clipboard on selection (2d)"
      >
        <AppCheckbox
          :default="isCopyOnSelect2d"
          :injection-key="InjectionKey.enum.SETTINGS_IS_COPY_ON_SELECT_2D"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Spectrogram: Set color map">
        <AppSelect
          :class="$style['spectro-colors']"
          :injection-key="InjectionKey.enum.SETTINGS_COLOR_MAP"
          :options="SpectrogramColorMap.options"
          size="small"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Spectrogram: Show decibels">
        <AppCheckbox
          :default="isDecibelsDisplay"
          :injection-key="InjectionKey.enum.SETTINGS_DECIBELS_DISPLAY"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Spectrogram: Overflow legends">
        <AppCheckbox
          :default="isLegendOverflow"
          :injection-key="InjectionKey.enum.SETTINGS_LEGEND_OVERFLOW"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem
        title="Export name: Add band and integration details"
      >
        <AppCheckbox
          :default="isDetailedExportName"
          :injection-key="InjectionKey.enum.SETTINGS_IS_DETAILED_EXPORT_NAME"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Misc: Preview alpha features">
        <AppCheckbox
          :default="isAlphaPreview"
          :injection-key="InjectionKey.enum.SETTINGS_IS_ALPHA_PREVIEW"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Misc: Preview beta features">
        <AppCheckbox
          :default="isBetaPreview"
          :injection-key="InjectionKey.enum.SETTINGS_IS_BETA_PREVIEW"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Misc: Enable dev settings">
        <AppCheckbox
          :default="isDevEnabled"
          :injection-key="InjectionKey.enum.SETTINGS_IS_DEV_ENABLED"
        />
      </DraggableSettingsItem>

      <DraggableSettingsDev />
    </div>
  </AppDraggable>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';
@use 'src/styles/scrolls';

.reload {
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  overflow: auto;
  width: sizes.$s0;
  height: sizes.$s0;
  margin-top: sizes.$p0;
  padding-right: sizes.$p0;

  @include scrolls.tiny-scrollbar;
}

.spectro-colors {
  width: sizes.$p0 * 12;
}

.scatter-border-width {
  width: sizes.$p0 * 8;
}

.background-color {
  width: sizes.$p0 * 16;
}
</style>
