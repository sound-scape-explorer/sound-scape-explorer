<script lang="ts" setup>
import {TIMEZONE_DEFAULT} from '@shared/constants';
import AppButton from 'src/app/app-button.vue';
import AppCheckbox from 'src/app/app-checkbox.vue';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import AppInput from 'src/app/input/app-input.vue';
import AppSelect from 'src/app/select/app-select.vue';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useConfig} from 'src/composables/use-config';
import {DraggableKey} from 'src/composables/use-draggables';
import {
  PlotBackground,
  ScatterBorderWidth,
  SpectrogramColorMap,
} from 'src/constants';
import DraggableSettingsDev from 'src/draggables/settings/draggable-settings-dev.vue';
import DraggableSettingsItem from 'src/draggables/settings/draggable-settings-item.vue';

const {
  resetAll,
  darkMode,
  audioHost,
  plotFontSize,
  timeshift,
  plotBackground,
  scatterBorderWidth,
  spectrogramColorMap,
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
</script>

<template>
  <AppDraggable :draggable-key="DraggableKey.enum.settings">
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
          v-model="darkMode"
          :handle-click="reload"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Audio: set audio host">
        <AppInput
          v-model="audioHost"
          align="left"
          size="small"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Draggables: Hide menu on display toggle">
        <AppCheckbox v-model="isHidingMenuOnDraggableToggle" />
      </DraggableSettingsItem>

      <DraggableSettingsItem
        :title="`Time: Apply timezone (${
          config?.settings.timezone ? config.settings.timezone : 'disabled'
        })`"
      >
        <AppCheckbox
          v-model="isTimezoneActive"
          :disabled="
            !config?.settings.timezone ||
            config?.settings.timezone !== TIMEZONE_DEFAULT
          "
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Time: Apply custom shift (in hours)">
        <AppInput
          v-model="timeshift"
          align="left"
          size="small"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Plots: Set background color">
        <AppSelect
          v-model="plotBackground"
          :class="$style['background-color']"
          :options="PlotBackground.options"
          size="small"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Plots: Set font size">
        <AppInput
          v-model="plotFontSize"
          align="left"
          size="small"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Scatter: Selected interval border width">
        <AppSelect
          v-model="scatterBorderWidth"
          :class="$style['scatter-border-width']"
          :options="ScatterBorderWidth.options"
          size="small"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Scatter: Highlight selected point">
        <AppCheckbox v-model="isSelectedPointHighlighted" />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Scatter: Open Audio on click">
        <AppCheckbox v-model="isAudioAutoOpen" />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Scatter: Open Details on click">
        <AppCheckbox v-model="isDetailsAutoOpen" />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Scatter: Use WebGL (2d)">
        <AppCheckbox v-model="isWebGlScatter2d" />
      </DraggableSettingsItem>

      <DraggableSettingsItem
        title="Scatter: Copy to clipboard on selection (2d)"
      >
        <AppCheckbox v-model="isCopyOnSelect2d" />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Spectrogram: Set color map">
        <AppSelect
          v-model="spectrogramColorMap"
          :class="$style['spectro-colors']"
          :options="SpectrogramColorMap.options"
          size="small"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Spectrogram: Show decibels">
        <AppCheckbox v-model="isDecibelsDisplay" />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Spectrogram: Overflow legends">
        <AppCheckbox v-model="isLegendOverflow" />
      </DraggableSettingsItem>

      <DraggableSettingsItem
        title="Export name: Add band and integration details"
      >
        <AppCheckbox v-model="isDetailedExportName" />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Misc: Preview alpha features">
        <AppCheckbox v-model="isAlphaPreview" />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Misc: Preview beta features">
        <AppCheckbox v-model="isBetaPreview" />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Misc: Enable dev settings">
        <AppCheckbox v-model="isDevEnabled" />
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
