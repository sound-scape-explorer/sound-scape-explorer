<script lang="ts" setup>
import AppButton from 'src/app/app-button.vue';
import AppCheckbox from 'src/app/app-checkbox.vue';
import AppHeader from 'src/app/app-header.vue';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import AppInput from 'src/app/input/app-input.vue';
import AppSelect from 'src/app/select/app-select.vue';
import {useClientSettings} from 'src/composables/use-client-settings';
import {DraggableKey} from 'src/composables/use-draggables';
import {Shortcut} from 'src/composables/use-shortcuts';
import {useTimezone} from 'src/composables/use-timezone';
import {
  AudioFilterSlope,
  PlotBackground,
  ScatterBorderWidth,
  SpectrogramColorMap,
  SpectrogramFftSize,
} from 'src/constants';
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
  spectrogramFftSize,
  isDetailsAutoOpen,
  isAudioAutoOpen,
  isWebGlScatter2d,
  isHidingMenuOnDraggableToggle,
  isSelectedPointHighlighted,
  isDetailedExportName,
  decibelsDisplay,
  legendOverflow,
  isDevEnabled,
  devAutoLoadView,
  audioFilterSlope,
} = useClientSettings();

const {tz} = useTimezone();
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
      <AppHeader>
        <h2>Display</h2>
      </AppHeader>

      <DraggableSettingsItem :title="`Dark mode (will trigger app reload)`">
        <AppCheckbox
          v-model="darkMode"
          :handle-click="reload"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem
        :title="`Hide menu icons in Focus mode (${Shortcut._draggableFocus})`"
      >
        <AppCheckbox v-model="isHidingMenuOnDraggableToggle" />
      </DraggableSettingsItem>

      <AppHeader>
        <h2>Exports</h2>
      </AppHeader>

      <DraggableSettingsItem title="Add view details to filenames">
        <AppCheckbox v-model="isDetailedExportName" />
      </DraggableSettingsItem>

      <AppHeader>
        <h2>Date & time</h2>
      </AppHeader>

      <DraggableSettingsItem title="Shift hours">
        <AppInput
          v-model="timeshift"
          align="left"
          size="small"
        />
      </DraggableSettingsItem>

      <AppHeader>
        <h2>Audio</h2>
      </AppHeader>

      <DraggableSettingsItem title="Host">
        <AppInput
          v-model="audioHost"
          align="left"
          size="small"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Filter slope (dB/oct)">
        <AppSelect
          v-model="audioFilterSlope"
          :class="$style['spectro-colors']"
          :options="AudioFilterSlope.options"
          size="small"
        />
      </DraggableSettingsItem>

      <AppHeader>
        <h2>Spectrograms</h2>
      </AppHeader>

      <DraggableSettingsItem title="FFT window size">
        <AppSelect
          v-model="spectrogramFftSize"
          :class="$style['spectro-colors']"
          :options="SpectrogramFftSize.options"
          size="small"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Color map">
        <AppSelect
          v-model="spectrogramColorMap"
          :class="$style['spectro-colors']"
          :options="SpectrogramColorMap.options"
          size="small"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Show dB legend">
        <AppCheckbox v-model="decibelsDisplay" />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Move legends outside">
        <AppCheckbox v-model="legendOverflow" />
      </DraggableSettingsItem>

      <AppHeader>
        <h2>Scatters</h2>
      </AppHeader>

      <DraggableSettingsItem
        title="Enable bordering selected interval (in red)"
      >
        <AppCheckbox v-model="isSelectedPointHighlighted" />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Selected interval border width">
        <AppSelect
          v-model="scatterBorderWidth"
          :class="$style['scatter-border-width']"
          :options="ScatterBorderWidth.options"
          size="small"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Auto open Audio on click">
        <AppCheckbox v-model="isAudioAutoOpen" />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Auto open Details on click">
        <AppCheckbox v-model="isDetailsAutoOpen" />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="2d scatters: Use WebGL">
        <AppCheckbox v-model="isWebGlScatter2d" />
      </DraggableSettingsItem>

      <AppHeader>
        <h2>Plots (heatmaps, charts, ...)</h2>
      </AppHeader>

      <DraggableSettingsItem title="Background color">
        <AppSelect
          v-model="plotBackground"
          :class="$style['background-color']"
          :options="PlotBackground.options"
          size="small"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Font size">
        <AppInput
          v-model="plotFontSize"
          align="left"
          size="small"
        />
      </DraggableSettingsItem>

      <AppHeader>
        <h2>Misc.</h2>
      </AppHeader>

      <DraggableSettingsItem title="Enable developer settings">
        <AppCheckbox v-model="isDevEnabled" />
      </DraggableSettingsItem>

      <AppHeader v-if="isDevEnabled">
        <h2>Dev</h2>
      </AppHeader>

      <DraggableSettingsItem
        v-if="isDevEnabled"
        title="Auto load view"
      >
        <AppCheckbox v-model="devAutoLoadView" />
      </DraggableSettingsItem>
    </div>
  </AppDraggable>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';
@use 'src/styles/scrolls';

.reload {
  align-items: center;
  display: flex;
  justify-content: center;
}

.container {
  display: flex;
  flex-direction: column;
  gap: sizes.$g0;
  height: sizes.$s0;
  margin-top: sizes.$p0;
  overflow: auto;
  padding-right: sizes.$p0;
  width: sizes.$s0;

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
