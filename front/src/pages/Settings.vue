<script lang="ts" setup>
import {NCheckbox, NSelect} from 'naive-ui';
import {computed} from 'vue';
import type {ColorMap} from '../store/player.store';
import {playerStore} from '../store/player.store';
import {settingsStore} from '../store/settings.store';
import {convertToNaiveSelectOptions} from '../utils/convert-to-naive-select-options';

const colorMaps: ColorMap[] = [
  'hot',
  'jet',
];

const colorMapsOptions = computed(() => convertToNaiveSelectOptions(colorMaps));
</script>

<template>
  <div class="settings">
    <div>
      <h2>
        App settings
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

      <div>
        <n-select
            v-model:value="playerStore.colorMap"
            :default-value="playerStore.colorMap"
            :options="colorMapsOptions"
            size="tiny"
        />
      </div>

    </div>

    <div>
      <h2>
        Reductions Settings
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
        Reductions CSV export settings
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
  </div>
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
