<script lang="ts" setup>
import AppButton from 'src/app/app-button.vue';
import AppCheckbox from 'src/app/app-checkbox.vue';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import AppInput from 'src/app/input/app-input.vue';
import AppSelect from 'src/app/select/app-select.vue';
import {InjectionKey} from 'src/common/injection-key';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useSettings} from 'src/composables/use-settings';
import {PLOT_BACKGROUND, SPECTROGRAM_COLOR_MAPS} from 'src/constants';
import {useWavesurferSettings} from 'src/draggables/audio/use-wavesurfer-settings';
import DraggableSettingsDev from 'src/draggables/settings/draggable-settings-dev.vue';
import DraggableSettingsItem from 'src/draggables/settings/draggable-settings-item.vue';
import {useDraggableSettingsProviders} from 'src/draggables/settings/use-draggable-settings-providers';

const {
  resetAll,
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
} = useClientSettings();

const {settings, hasTimezone} = useSettings();
const {isDecibelsDisplay, isLegendOverflow} = useWavesurferSettings();

const colormapOptions = SPECTROGRAM_COLOR_MAPS;
const backgrounds = Object.values(PLOT_BACKGROUND);

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
      <DraggableSettingsItem title="Audio: set audio host">
        <AppInput
          :injection-key="InjectionKey.settingsAudioHost"
          align="left"
          size="small"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Draggables: Hide menu on display toggle">
        <AppCheckbox
          :default="isHidingMenuOnDraggableToggle"
          :injection-key="InjectionKey.settingsIsHidingMenuOnDraggableToggle"
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
          :injection-key="InjectionKey.settingsIsTimezoneActive"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Time: Apply custom shift (in hours)">
        <AppInput
          :injection-key="InjectionKey.settingsTimeShift"
          align="left"
          size="small"
          type="number"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Plots: Set background color">
        <AppSelect
          :injection-key="InjectionKey.settingsPlotBackground"
          :options="backgrounds"
          size="small"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Plots: Set font size">
        <AppInput
          :injection-key="InjectionKey.settingsFontSize"
          align="left"
          size="small"
          type="number"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Scatter: Highlight selected point">
        <AppCheckbox
          :default="isSelectedPointHighlighted"
          :injection-key="InjectionKey.settingsIsSelectedPointHighlighted"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Scatter: Open Audio draggable on click">
        <AppCheckbox
          :default="isAudioAutoOpen"
          :injection-key="InjectionKey.settingsIsAudioAutoOpen"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Scatter: Open Details draggable on click">
        <AppCheckbox
          :default="isDetailsAutoOpen"
          :injection-key="InjectionKey.settingsIsDetailsAutoOpen"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Scatter: Use WebGL (2d)">
        <AppCheckbox
          :default="isWebGlScatter2d"
          :injection-key="InjectionKey.settingsIsWebGlScatter2d"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem
        title="Scatter: Copy to clipboard on selection (2d)"
      >
        <AppCheckbox
          :default="isCopyOnSelect2d"
          :injection-key="InjectionKey.settingsIsCopyOnSelect2d"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Spectrogram: Set color map">
        <AppSelect
          :class="$style['spectro-colors']"
          :injection-key="InjectionKey.settingsColormap"
          :options="colormapOptions"
          size="small"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Spectrogram: Show decibels">
        <AppCheckbox
          :default="isDecibelsDisplay"
          :injection-key="InjectionKey.settingsDecibelsDisplay"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Spectrogram: Overflow legends">
        <AppCheckbox
          :default="isLegendOverflow"
          :injection-key="InjectionKey.settingsLegendOverflow"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem
        title="Export name: Add band and integration details"
      >
        <AppCheckbox
          :default="isDetailedExportName"
          :injection-key="InjectionKey.settingsIsDetailedExportName"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Misc: Preview alpha features">
        <AppCheckbox
          :default="isAlphaPreview"
          :injection-key="InjectionKey.settingsIsAlphaPreview"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Misc: Preview beta features">
        <AppCheckbox
          :default="isBetaPreview"
          :injection-key="InjectionKey.settingsIsBetaPreview"
        />
      </DraggableSettingsItem>

      <DraggableSettingsItem title="Misc: Enable dev settings">
        <AppCheckbox
          :default="isDevEnabled"
          :injection-key="InjectionKey.settingsIsDevEnabled"
        />
      </DraggableSettingsItem>

      <DraggableSettingsDev />
    </div>
  </AppDraggable>
</template>

<style lang="scss" module>
.reload {
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  overflow: auto;
  width: $s0;
  height: $s0;
  margin-top: $p0;
  padding-right: $p0;

  @include tiny-scrollbar;
}

.spectro-colors {
  width: $p0 * 12;
}
</style>
