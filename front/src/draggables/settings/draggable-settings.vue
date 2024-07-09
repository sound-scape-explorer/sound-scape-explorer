<script lang="ts" setup>
import AppButton from 'src/app/app-button.vue';
import AppCheckbox from 'src/app/app-checkbox.vue';
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
  resetAll,
  isDetailsAutoOpen,
  isAudioAutoOpen,
  plotBackground,
  isPreview,
  isTimezoneActive,
  timeshift,
  isCopyOnSelect2d,
  isWebGlScatter2d,
} = useClientSettings();
const {audioHost} = useStorageAudioHost();
const {fontSize} = useAppHeatmapSize();
const {colormap} = useSpectrogramColormap();
const {settings, hasTimezone} = useStorageSettings();
const {isDecibelsDisplay, isLegendOverflow} = useWavesurferSettings();

const colormapOptions = SPECTROGRAM_COLOR_MAPS;
const backgrounds = Object.values(PLOT_BACKGROUND);

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

// todo: add reset action
</script>

<template>
  <AppDraggable draggable-key="settings">
    <div class="reset">
      <AppButton
        :handle-click="resetAll"
        grow
        size="small"
      >
        Restore defaults
      </AppButton>
    </div>

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
      <AppCheckbox
        :default="isDecibelsDisplay"
        injection-key="settings/decibelsDisplay"
      />
    </DraggableSettingsItem>

    <DraggableSettingsItem title="Spectrogram: Overflow legends">
      <AppCheckbox
        :default="isLegendOverflow"
        injection-key="settings/legendOverflow"
      />
    </DraggableSettingsItem>

    <DraggableSettingsItem title="Auto open Audio panel on scatter click">
      <AppCheckbox
        :default="isAudioAutoOpen"
        injection-key="settings/isAudioAutoOpen"
      />
    </DraggableSettingsItem>

    <DraggableSettingsItem title="Auto open Details panel on scatter click">
      <AppCheckbox
        :default="isDetailsAutoOpen"
        injection-key="settings/isDetailsAutoOpen"
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
      <AppCheckbox
        :default="isTimezoneActive"
        :disabled="!hasTimezone"
        injection-key="settings/isTimezoneActive"
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
      <AppCheckbox
        :default="isCopyOnSelect2d"
        injection-key="settings/isCopyOnSelect2d"
      />
    </DraggableSettingsItem>

    <DraggableSettingsItem title="Use WebGL for 2d scatters">
      <AppCheckbox
        :default="isWebGlScatter2d"
        injection-key="settings/isWebGlScatter2d"
      />
    </DraggableSettingsItem>

    <DraggableSettingsItem title="Preview beta features">
      <AppCheckbox
        :default="isPreview"
        injection-key="settings/isPreview"
      />
    </DraggableSettingsItem>
  </AppDraggable>
</template>

<style lang="scss" scoped>
.reset {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}
</style>
