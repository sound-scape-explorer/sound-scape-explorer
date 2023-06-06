<script lang="ts" setup>
import {NCheckbox, NSelect} from 'naive-ui';
import {computed} from 'vue';
import {SPECTROGRAM_COLOR_MAPS} from '../../constants';
import {convertToNaiveSelectOptions} from '../../utils/convert-to-naive-select-options';
import AppDraggable from '../AppDraggable/AppDraggable.vue';
import {spectrogramColorRef} from '../Audio/useAudioSpectrogramColor';
import {settingsStore} from './settingsStore';

const colorMapsOptionsRef = computed(() =>
  convertToNaiveSelectOptions(SPECTROGRAM_COLOR_MAPS),
);
</script>

<template>
  <AppDraggable draggable-key="settings">
    <div class="settings">
      <div>
        <h2>Spectrogram color map</h2>
        <hr />

        <div>
          <n-select
            v-model:value="spectrogramColorRef.value"
            :default-value="spectrogramColorRef.value"
            :options="colorMapsOptionsRef"
            size="tiny"
          />
        </div>
      </div>

      <div>
        <h2>Global settings</h2>

        <hr />

        <div class="checkboxes">
          <n-checkbox
            v-model:checked="settingsStore.fullPageScreenshot"
            class="checkbox"
          >
            Full page screenshot
          </n-checkbox>
        </div>

        <div class="checkboxes">
          <n-checkbox
            v-model:checked="settingsStore.autoOpenOnScatterClick"
            class="checkbox"
          >
            Auto Open on Scatter Click (Details and Audio)
          </n-checkbox>
        </div>
      </div>

      <div>
        <h2>Debug</h2>

        <hr />

        <div class="checkboxes">
          <n-checkbox
            v-model:checked="settingsStore.preview"
            class="checkbox"
          >
            Preview
          </n-checkbox>
        </div>
      </div>
    </div>
  </AppDraggable>
</template>

<style lang="scss" scoped>
.settings {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & h2 {
    font-weight: bold;
  }
}

.zoom {
  width: 10rem;
}

.checkboxes {
  display: flex;
  flex-direction: column;
}

.checkbox {
  width: fit-content;
}
</style>
