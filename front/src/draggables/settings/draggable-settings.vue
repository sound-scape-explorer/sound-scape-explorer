<script lang="ts" setup>
import AppButton from 'src/app/app-button.vue';
import AppCheckbox from 'src/app/app-checkbox.vue';
import AppSection from 'src/app/app-section.vue';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import {useAppHeatmapSize} from 'src/app/heatmap/use-app-heatmap-size';
import AppInput from 'src/app/input/app-input.vue';
import AppSelect from 'src/app/select/app-select.vue';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useRefProvide} from 'src/composables/use-ref-provide';
import {useSettings} from 'src/composables/use-settings';
import {useStorageAudioHost} from 'src/composables/use-storage-audio-host';
import {PLOT_BACKGROUND, SPECTROGRAM_COLOR_MAPS} from 'src/constants';
import {useSpectrogramColormap} from 'src/draggables/audio/use-spectrogram-colormap';
import {useWavesurferSettings} from 'src/draggables/audio/use-wavesurfer-settings';
import DraggableSettingsDev from 'src/draggables/settings/draggable-settings-dev.vue';
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
  isHidingMenuOnDraggableToggle,
  isDevEnabled,
  isSelectedPointHighlighted,
  isDetailedExportName,
} = useClientSettings();

const {audioHost} = useStorageAudioHost();
const {fontSize} = useAppHeatmapSize();
const {colormap} = useSpectrogramColormap();
const {settings, hasTimezone} = useSettings();
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
useRefProvide(
  'settings/isHidingMenuOnDraggableToggle',
  isHidingMenuOnDraggableToggle,
);
useRefProvide('settings/isPreview', isPreview);
useRefProvide('settings/isDevEnabled', isDevEnabled);
useRefProvide(
  'settings/isSelectedPointHighlighted',
  isSelectedPointHighlighted,
);
useRefProvide('settings/isDetailedExportName', isDetailedExportName);
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

    <AppSection>
      <DraggableSettingsItem title="Audio: set audio host">
        <AppInput
          align="left"
          injection-key="settings/audioHost"
          size="small"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Draggables: Hide menu on display toggle">
        <AppCheckbox
          :default="isHidingMenuOnDraggableToggle"
          injection-key="settings/isHidingMenuOnDraggableToggle"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem
        :title="`Time: Apply timezone (${
          settings?.timezone ? settings.timezone : 'disabled'
        })`"
      >
        <AppCheckbox
          :default="isTimezoneActive"
          :disabled="!settings?.timezone || !hasTimezone"
          injection-key="settings/isTimezoneActive"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Time: Apply custom shift (in hours)">
        <AppInput
          align="left"
          injection-key="settings/timeShift"
          size="small"
          type="number"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Plots: Set background color">
        <AppSelect
          :options="backgrounds"
          injection-key="settings/plotBackground"
          size="small"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Plots: Set font size">
        <AppInput
          align="left"
          injection-key="settings/fontSize"
          size="small"
          type="number"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Scatter: Highlight selected point">
        <AppCheckbox
          :default="isSelectedPointHighlighted"
          injection-key="settings/isSelectedPointHighlighted"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Scatter: Open Audio draggable on click">
        <AppCheckbox
          :default="isAudioAutoOpen"
          injection-key="settings/isAudioAutoOpen"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Scatter: Open Details draggable on click">
        <AppCheckbox
          :default="isDetailsAutoOpen"
          injection-key="settings/isDetailsAutoOpen"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Scatter: Use WebGL (2d)">
        <AppCheckbox
          :default="isWebGlScatter2d"
          injection-key="settings/isWebGlScatter2d"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem
        title="Scatter: Copy to clipboard on selection (2d)"
      >
        <AppCheckbox
          :default="isCopyOnSelect2d"
          injection-key="settings/isCopyOnSelect2d"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Spectrogram: Set color map">
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

      <DraggableSettingsItem
        title="Export name: Add band and integration details"
      >
        <AppCheckbox
          :default="isDetailedExportName"
          injection-key="settings/isDetailedExportName"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Misc: Preview beta features">
        <AppCheckbox
          :default="isPreview"
          injection-key="settings/isPreview"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Misc: Enable dev settings">
        <AppCheckbox
          :default="isDevEnabled"
          injection-key="settings/isDevEnabled"
        />
      </DraggableSettingsItem>

      <DraggableSettingsDev />
    </AppSection>
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
