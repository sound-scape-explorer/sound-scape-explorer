<script lang="ts" setup>
import {NCheckbox} from 'naive-ui';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import {useAppHeatmapSize} from 'src/app/heatmap/use-app-heatmap-size';
import AppInput from 'src/app/input/app-input.vue';
import AppSelect from 'src/app/select/app-select.vue';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useRefProvide} from 'src/composables/use-ref-provide';
import {useStorageAudioHost} from 'src/composables/use-storage-audio-host';
import {useStorageSettings} from 'src/composables/use-storage-settings';
import {PLOT_BACKGROUND, SPECTROGRAM_COLOR_MAPS} from 'src/constants';
import {useSpectrogramColormap} from 'src/draggables/audio/use-spectrogram-colormap';
import {useWavesurferSettings} from 'src/draggables/audio/use-wavesurfer-settings';
import DraggableSettingsItem from 'src/draggables/settings/draggable-settings-item.vue';

const {
  isDetailsAutoOpen,
  plotBackground,
  isPreview,
  isTimezoneActive,
  timeShift,
  isCopyOnSelect2d,
  isWebGlScatter2d,
  isColorMapSwapped,
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
  <AppDraggable draggable-key="settings">
    <DraggableSettingsItem title="Audio host">
      <AppInput
        align="left"
        injection-key="settings/audioHost"
        size="small"
      />
    </DraggableSettingsItem>

    <DraggableSettingsItem title="Spectrogram: Color map">
      <AppSelect
        :options="colormapOptions"
        injection-key="settings/colormap"
        size="small"
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
        v-model:checked="isDetailsAutoOpen"
        class="checkbox"
      />
    </DraggableSettingsItem>

    <DraggableSettingsItem title="Plot background">
      <AppSelect
        :options="backgrounds"
        injection-key="settings/plotBackground"
        size="small"
      />
    </DraggableSettingsItem>

    <DraggableSettingsItem title="Plot font size">
      <AppInput
        align="left"
        injection-key="settings/fontSize"
        size="small"
        type="number"
      />
    </DraggableSettingsItem>

    <DraggableSettingsItem
      :title="`Apply timezone (${
        settings?.timezone ? settings.timezone : 'disabled'
      })`"
    >
      <NCheckbox
        v-model:checked="isTimezoneActive"
        :disabled="!hasTimezone"
        class="checkbox"
      />
    </DraggableSettingsItem>

    <DraggableSettingsItem title="Time shift in hours">
      <AppInput
        align="left"
        injection-key="settings/timeShift"
        size="small"
        type="number"
      />
    </DraggableSettingsItem>

    <DraggableSettingsItem title="Copy on 2d selection">
      <NCheckbox
        v-model:checked="isCopyOnSelect2d"
        class="checkbox"
      />
    </DraggableSettingsItem>

    <DraggableSettingsItem title="Use WebGL for 2d scatters">
      <NCheckbox
        v-model:checked="isWebGlScatter2d"
        class="checkbox"
      />
    </DraggableSettingsItem>

    <DraggableSettingsItem title="Preview beta features">
      <NCheckbox
        v-model:checked="isPreview"
        class="checkbox"
      />
    </DraggableSettingsItem>
  </AppDraggable>
</template>
