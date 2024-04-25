<script lang="ts" setup>
import {NCheckbox, NGi, NGrid, NInput, NSelect, NTag} from 'naive-ui';
import AppDraggable from 'src/app/app-draggable.vue';
import {useKeyboard} from 'src/composables/keyboard';
import {useStorageAudioHost} from 'src/composables/storage-audio-host';
import {PLOT_BACKGROUND, SPECTROGRAM_COLOR_MAPS} from 'src/constants';
import {spectrogramColorRef} from 'src/draggables/audio/spectrogram-color';
import {
  waveSurferOverflowLegendsRef,
  waveSurferShowDecibelsRef,
} from 'src/draggables/audio/wavesurfer';
import {settingsStore} from 'src/draggables/settings/settings-store';
import {plotlyFontSizeRef} from 'src/hooks/useHeatmapLayout';
import {convertToNaiveSelectOptions} from 'src/utils/convert-to-naive-select-options';
import {computed} from 'vue';

const {lock, unlock} = useKeyboard();
const {audioHost} = useStorageAudioHost();

const spectrogramColorMapsOptionsRef = computed(() => {
  return convertToNaiveSelectOptions(SPECTROGRAM_COLOR_MAPS);
});

const plotBackgroundOptionsRef = computed(() => {
  return convertToNaiveSelectOptions(Object.values(PLOT_BACKGROUND));
});
</script>

<template>
  <AppDraggable draggable-key="settings">
    <n-grid cols="1">
      <n-gi class="gi">
        <n-tag
          :bordered="false"
          size="small"
        >
          Audio host
        </n-tag>
        <n-input
          v-model:value="audioHost"
          size="tiny"
          @inputBlur="() => unlock()"
          @inputFocus="() => lock()"
        />
      </n-gi>
      <n-gi class="gi">
        <n-tag
          :bordered="false"
          size="small"
        >
          Spectrogram: Color map
        </n-tag>
        <n-select
          v-model:value="spectrogramColorRef.value"
          :default-value="spectrogramColorRef.value"
          :options="spectrogramColorMapsOptionsRef"
          size="tiny"
        />
      </n-gi>

      <n-gi class="gi">
        <n-tag
          :bordered="false"
          size="small"
        >
          Spectrogram: Show decibels
        </n-tag>
        <n-checkbox
          v-model:checked="waveSurferShowDecibelsRef.value"
          class="checkbox"
        />
      </n-gi>

      <n-gi class="gi">
        <n-tag
          :bordered="false"
          size="small"
        >
          Spectrogram: Overflow legends
        </n-tag>
        <n-checkbox
          v-model:checked="waveSurferOverflowLegendsRef.value"
          class="checkbox"
        />
      </n-gi>

      <n-gi class="gi">
        <n-tag
          :bordered="false"
          size="small"
        >
          Auto open Details panel on scatter click
        </n-tag>
        <n-checkbox
          v-model:checked="settingsStore.autoOpenOnScatterClick"
          class="checkbox"
        />
      </n-gi>
      <n-gi class="gi">
        <n-tag
          :bordered="false"
          size="small"
        >
          Plot background
        </n-tag>
        <n-select
          v-model:value="settingsStore.plotBackground"
          :default-value="settingsStore.plotBackground"
          :options="plotBackgroundOptionsRef"
          size="tiny"
        />
      </n-gi>

      <n-gi class="gi">
        <n-tag
          :bordered="false"
          size="small"
        >
          Apply timezone
        </n-tag>
        <n-checkbox
          v-model:checked="settingsStore.applyTimezone"
          class="checkbox"
        />
      </n-gi>

      <n-gi class="gi">
        <n-tag
          :bordered="false"
          size="small"
        >
          Preview beta features
        </n-tag>
        <n-checkbox
          v-model:checked="settingsStore.preview"
          class="checkbox"
        />
      </n-gi>

      <n-gi class="gi">
        <n-tag
          :bordered="false"
          size="small"
        >
          Plotly font size
        </n-tag>
        <n-input
          v-model:value="plotlyFontSizeRef.value"
          size="tiny"
          type="number"
          @inputBlur="() => unlock()"
          @inputFocus="() => lock()"
        />
      </n-gi>
    </n-grid>
  </AppDraggable>
</template>

<style lang="scss" scoped>
.gi {
  display: flex;
  justify-content: space-between;
  gap: 0.5em;
  margin-bottom: 0.5em;
}
</style>
