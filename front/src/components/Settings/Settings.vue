<script lang="ts" setup>
import {NCheckbox, NSelect} from 'naive-ui';
import {computed} from 'vue';
import {SPECTROGRAM_COLOR_MAPS} from '../../constants';
import {convertToNaiveSelectOptions} from '../../utils/convert-to-naive-select-options';
import AppDraggable from '../AppDraggable/AppDraggable.vue';
import {audioStore} from '../Audio/audioStore';
import {settingsStore} from './settingsStore';

const colorMapsOptions = computed(() => convertToNaiveSelectOptions(SPECTROGRAM_COLOR_MAPS));
</script>

<template>
  <AppDraggable draggable-key="settings">
    <div class="settings">
      <div>
        <h2>Spectrogram color map</h2>
        <hr />

        <div>
          <n-select
            v-model:value="audioStore.colorMap"
            :default-value="audioStore.colorMap"
            :options="colorMapsOptions"
            size="tiny"
          />
        </div>

      </div>

      <div>
        <h2>
          Global settings
        </h2>

        <hr />

        <div class="checkboxes">
          <n-checkbox
            v-model:checked="settingsStore.umap.screenshot.isFull"
            class="checkbox"
          >
            Full page screenshot
          </n-checkbox>
        </div>

      </div>

      <div>
        <h2>
          CSV Export
        </h2>

        <hr />

        <div class="checkboxes">
          <n-checkbox v-model:checked="settingsStore.umap.export.labels" class="checkbox">Labels</n-checkbox>
          <n-checkbox v-model:checked="settingsStore.umap.export.timestamps" class="checkbox">Timestamps</n-checkbox>
          <n-checkbox v-model:checked="settingsStore.umap.export.meta" class="checkbox">Meta</n-checkbox>
          <n-checkbox v-model:checked="settingsStore.umap.export.points" class="checkbox">Points</n-checkbox>
          <n-checkbox v-model:checked="settingsStore.umap.export.features" class="checkbox">Features</n-checkbox>
        </div>
      </div>

      <div>
        <h2>
          Debug
        </h2>

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
