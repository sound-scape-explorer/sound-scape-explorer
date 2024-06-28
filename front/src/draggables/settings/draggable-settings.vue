<script lang="ts" setup>
import {NCheckbox} from 'naive-ui';
import AppInput from 'src/app/app-input/app-input.vue';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import {useAppHeatmapSize} from 'src/app/heatmap/app-heatmap-size';
import AppSelect from 'src/app/select/app-select.vue';
import {useClientSettings} from 'src/composables/client-settings';
import {useRefProvide} from 'src/composables/ref-provide';
import {useStorageAudioHost} from 'src/composables/storage-audio-host';
import {useStorageSettings} from 'src/composables/storage-settings';
import {PLOT_BACKGROUND, SPECTROGRAM_COLOR_MAPS} from 'src/constants';
import {useSpectrogramColormap} from 'src/draggables/audio/spectrogram-colormap';
import {useWavesurferSettings} from 'src/draggables/audio/wavesurfer-settings';
import DraggableSettingsItem from 'src/draggables/settings/draggable-settings-item.vue';

const {
  openDetailsOnScatterClick,
  plotBackground,
  preview,
  applyTimezone,
  timeShift,
  copySelect2d,
  scatter2dGl,
} = useClientSettings();
const {audioHost} = useStorageAudioHost();
const {fontSize} = useAppHeatmapSize();
const {colormap} = useSpectrogramColormap();
const {settings, hasTimezone} = useStorageSettings();
const {showDecibels, overflowLegends} = useWavesurferSettings();

const colormapOptions = SPECTROGRAM_COLOR_MAPS;
const backgrounds = Object.values(PLOT_BACKGROUND);

useRefProvide('settings/audioHost', audioHost);
useRefProvide('settings/fontSize', fontSize);
useRefProvide('settings/timeShift', timeShift);
useRefProvide('settings/colormap', colormap);
useRefProvide('settings/plotBackground', plotBackground);
</script>

<template>
  <AppDraggable
    class="draggable-settings__container"
    draggable-key="settings"
  >
    <DraggableSettingsItem title="Audio host">
      <AppInput injection-key="settings/audioHost" />
    </DraggableSettingsItem>

    <DraggableSettingsItem title="Spectrogram: Color map">
      <AppSelect
        :options="colormapOptions"
        injection-key="settings/colormap"
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
      <AppSelect
        :options="backgrounds"
        injection-key="settings/plotBackground"
      />
    </DraggableSettingsItem>

    <DraggableSettingsItem title="Plot font size">
      <AppInput
        injection-key="settings/fontSize"
        type="number"
      />
    </DraggableSettingsItem>

    <DraggableSettingsItem
      :title="`Apply timezone (${
        settings?.timezone ? settings.timezone : 'disabled'
      })`"
    >
      <NCheckbox
        v-model:checked="applyTimezone"
        :disabled="!hasTimezone"
        class="checkbox"
      />
    </DraggableSettingsItem>

    <DraggableSettingsItem title="Time shift in hours">
      <AppInput
        injection-key="settings/timeShift"
        type="number"
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
