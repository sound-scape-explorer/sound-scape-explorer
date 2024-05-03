<script lang="ts" setup>
import {NCheckbox, NGi, NGrid, NInput, NSelect, NTag} from 'naive-ui';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import {useAppHeatmapSize} from 'src/app/heatmap/app-heatmap-size';
import {useClientSettings} from 'src/composables/client-settings';
import {useKeyboard} from 'src/composables/keyboard';
import {useStorageAudioHost} from 'src/composables/storage-audio-host';
import {useStorageSettings} from 'src/composables/storage-settings';
import {PLOT_BACKGROUND, SPECTROGRAM_COLOR_MAPS} from 'src/constants';
import {useSpectrogramColormap} from 'src/draggables/audio/spectrogram-colormap';
import {
  waveSurferOverflowLegendsRef,
  waveSurferShowDecibelsRef,
} from 'src/draggables/audio/wavesurfer';
import {convertToNaiveSelectOptions} from 'src/utils/convert-to-naive-select-options';
import {computed} from 'vue';

const {
  openDetailsOnScatterClick,
  plotBackground,
  preview,
  applyTimezone,
  timeShift,
} = useClientSettings();
const {lock, unlock} = useKeyboard();
const {audioHost} = useStorageAudioHost();
const {fontSize} = useAppHeatmapSize();
const {colormap} = useSpectrogramColormap();
const {settings, hasTimezone} = useStorageSettings();

const spectrogramColorMapsOptionsRef = computed(() => {
  return convertToNaiveSelectOptions(SPECTROGRAM_COLOR_MAPS);
});

const plotBackgroundOptionsRef = computed(() => {
  return convertToNaiveSelectOptions(Object.values(PLOT_BACKGROUND));
});
</script>

<template>
  <AppDraggable
    class="draggable-settings"
    draggable-key="settings"
  >
    <NGrid cols="1">
      <NGi class="gi">
        <NTag
          :bordered="false"
          size="small"
        >
          Audio host
        </NTag>
        <span />
        <NInput
          v-model:value="audioHost"
          size="tiny"
          @inputBlur="() => unlock()"
          @inputFocus="() => lock()"
        />
      </NGi>

      <NGi class="gi">
        <NTag
          :bordered="false"
          size="small"
        >
          Spectrogram: Color map
        </NTag>
        <span />
        <NSelect
          v-model:value="colormap"
          :default-value="colormap"
          :options="spectrogramColorMapsOptionsRef"
          size="tiny"
        />
      </NGi>

      <NGi class="gi">
        <NTag
          :bordered="false"
          size="small"
        >
          Spectrogram: Show decibels
        </NTag>
        <span />
        <NCheckbox
          v-model:checked="waveSurferShowDecibelsRef.value"
          class="checkbox"
        />
      </NGi>

      <NGi class="gi">
        <NTag
          :bordered="false"
          size="small"
        >
          Spectrogram: Overflow legends
        </NTag>
        <span />
        <NCheckbox
          v-model:checked="waveSurferOverflowLegendsRef.value"
          class="checkbox"
        />
      </NGi>

      <NGi class="gi">
        <NTag
          :bordered="false"
          size="small"
        >
          Auto open Details panel on scatter click
        </NTag>
        <span />
        <NCheckbox
          v-model:checked="openDetailsOnScatterClick"
          class="checkbox"
        />
      </NGi>
      <NGi class="gi">
        <NTag
          :bordered="false"
          size="small"
        >
          Plot background
        </NTag>
        <span />
        <NSelect
          v-model:value="plotBackground"
          :default-value="plotBackground"
          :options="plotBackgroundOptionsRef"
          size="tiny"
        />
      </NGi>

      <NGi class="gi">
        <NTag
          :bordered="false"
          size="small"
        >
          Plotly font size
        </NTag>
        <span />
        <NInput
          v-model:value="fontSize"
          size="tiny"
          type="number"
          @inputBlur="() => unlock()"
          @inputFocus="() => lock()"
        />
      </NGi>

      <NGi class="gi">
        <NTag
          :bordered="false"
          size="small"
        >
          <span v-if="!hasTimezone">Apply timezone (disabled)</span>
          <span v-if="hasTimezone">
            Apply timezone ({{ settings?.timezone }})
          </span>
        </NTag>
        <span />
        <NCheckbox
          v-model:checked="applyTimezone"
          :disabled="!hasTimezone"
          class="checkbox"
        />
      </NGi>

      <NGi class="gi">
        <NTag
          :bordered="false"
          size="small"
        >
          Time shift in hours
        </NTag>
        <span />
        <NInput
          v-model:value="timeShift"
          size="tiny"
          type="number"
          @inputBlur="() => unlock()"
          @inputFocus="() => lock()"
        />
      </NGi>

      <NGi class="gi">
        <NTag
          :bordered="false"
          size="small"
        >
          Preview beta features
        </NTag>
        <span />
        <NCheckbox
          v-model:checked="preview"
          class="checkbox"
        />
      </NGi>
    </NGrid>
  </AppDraggable>
</template>

<style lang="scss" scoped>
.draggable-settings {
  width: 32em;
}

.gi {
  gap: 0.5em;
  margin-bottom: 0.5em;
  display: grid;
  grid-template-columns: auto 1fr 10em;
}
</style>
