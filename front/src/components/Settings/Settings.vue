<script lang="ts" setup>
import {NCheckbox, NGi, NGrid, NInput, NSelect, NTag} from 'naive-ui';
import {
  waveSurferOverflowLegendsRef,
  waveSurferShowDecibelsRef,
} from 'src/components/Audio/useWaveSurfer';
import {PLOT_BACKGROUND, SPECTROGRAM_COLOR_MAPS} from 'src/constants';
import {audioHostRef} from 'src/hooks/useAudioHost';
import {plotlyFontSizeRef} from 'src/hooks/useHeatmapLayout';
import {useKeyboard} from 'src/hooks/useKeyboard';
import {convertToNaiveSelectOptions} from 'src/utils/convert-to-naive-select-options';
import {computed} from 'vue';

import AppDraggable from '../AppDraggable/AppDraggable.vue';
import {spectrogramColorRef} from '../Audio/useAudioSpectrogramColor';
import {settingsStore} from './settingsStore';

const {lockKeyboard, unlockKeyboard} = useKeyboard();

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
          v-model:value="audioHostRef.value"
          size="tiny"
          @inputBlur="() => unlockKeyboard()"
          @inputFocus="() => lockKeyboard()"
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
          @inputBlur="() => unlockKeyboard()"
          @inputFocus="() => lockKeyboard()"
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
