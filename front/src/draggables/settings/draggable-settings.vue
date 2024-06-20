<script lang="ts" setup>
import {NCheckbox, NInput, NSelect} from 'naive-ui';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import {useAppHeatmapSize} from 'src/app/heatmap/app-heatmap-size';
import {useClientSettings} from 'src/composables/client-settings';
import {useKeyboard} from 'src/composables/keyboard';
import {useStorageAudioHost} from 'src/composables/storage-audio-host';
import {useStorageSettings} from 'src/composables/storage-settings';
import {PLOT_BACKGROUND, SPECTROGRAM_COLOR_MAPS} from 'src/constants';
import {useSpectrogramColormap} from 'src/draggables/audio/spectrogram-colormap';
import {useWavesurferSettings} from 'src/draggables/audio/wavesurfer-settings';
import DraggableSettingsItem from 'src/draggables/settings/draggable-settings-item.vue';
import {convertToNaiveSelectOptions} from 'src/utils/convert-to-naive-select-options';
import {computed} from 'vue';

const {
  openDetailsOnScatterClick,
  plotBackground,
  preview,
  applyTimezone,
  timeShift,
  copySelect2d,
  scatter2dGl,
} = useClientSettings();
const {lock, unlock} = useKeyboard();
const {audioHost} = useStorageAudioHost();
const {fontSize} = useAppHeatmapSize();
const {colormap} = useSpectrogramColormap();
const {settings, hasTimezone} = useStorageSettings();
const {showDecibels, overflowLegends} = useWavesurferSettings();

const spectrogramColorMapsOptionsRef = computed(() => {
  return convertToNaiveSelectOptions(SPECTROGRAM_COLOR_MAPS);
});

const plotBackgroundOptionsRef = computed(() => {
  return convertToNaiveSelectOptions(Object.values(PLOT_BACKGROUND));
});
</script>

<template>
  <AppDraggable
    class="draggable-settings__container"
    draggable-key="settings"
  >
    <DraggableSettingsItem title="Audio host">
      <NInput
        v-model:value="audioHost"
        size="tiny"
        @inputBlur="() => unlock()"
        @inputFocus="() => lock()"
      />
    </DraggableSettingsItem>

    <DraggableSettingsItem title="Spectrogram: Color map">
      <NSelect
        v-model:value="colormap"
        :default-value="colormap"
        :options="spectrogramColorMapsOptionsRef"
        size="tiny"
      />
    </DraggableSettingsItem>

    <DraggableSettingsItem title="Spectrogram: Show decibels">
      <NCheckbox
        v-model:checked="showDecibels"
        class="checkbox"
      />
    </DraggableSettingsItem>

    <DraggableSettingsItem title="Spectrogram: Overflow legends">
      <NCheckbox
        v-model:checked="overflowLegends"
        class="checkbox"
      />
    </DraggableSettingsItem>

    <DraggableSettingsItem title="Auto open Details panel on scatter click">
      <NCheckbox
        v-model:checked="openDetailsOnScatterClick"
        class="checkbox"
      />
    </DraggableSettingsItem>

    <DraggableSettingsItem title="Plot background">
      <NSelect
        v-model:value="plotBackground"
        :default-value="plotBackground"
        :options="plotBackgroundOptionsRef"
        size="tiny"
      />
    </DraggableSettingsItem>

    <DraggableSettingsItem title="Plot font size">
      <NInput
        v-model:value="fontSize"
        size="tiny"
        type="number"
        @inputBlur="() => unlock()"
        @inputFocus="() => lock()"
      />
    </DraggableSettingsItem>

    <DraggableSettingsItem
      :title="`Apply timezone (${settings?.timezone ?? 'disabled'})`"
    >
      <NCheckbox
        v-model:checked="applyTimezone"
        :disabled="!hasTimezone"
        class="checkbox"
      />
    </DraggableSettingsItem>

    <DraggableSettingsItem title="Time shift in hours">
      <NInput
        v-model:value="timeShift"
        size="tiny"
        type="number"
        @inputBlur="() => unlock()"
        @inputFocus="() => lock()"
      />
    </DraggableSettingsItem>

    <DraggableSettingsItem title="Copy on 2d selection">
      <NCheckbox
        v-model:checked="copySelect2d"
        class="checkbox"
      />
    </DraggableSettingsItem>

    <DraggableSettingsItem title="Use WebGL for 2d scatters">
      <NCheckbox
        v-model:checked="scatter2dGl"
        class="checkbox"
      />
    </DraggableSettingsItem>

    <DraggableSettingsItem title="Preview beta features">
      <NCheckbox
        v-model:checked="preview"
        class="checkbox"
      />
    </DraggableSettingsItem>
  </AppDraggable>
</template>

<style lang="scss" scoped>
.draggable-settings__container {
  width: 32em;
}
</style>
