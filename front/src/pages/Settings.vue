<script lang="ts" setup>
import {NCheckbox} from 'naive-ui';
import Title from '../components/Title.vue';
import {settingsStore} from '../store/settings.store';

//
</script>

<template>
  <Title text="Settings" />

  <div class="settings">
    <div>
      <h2>
        App settings
      </h2>

      <hr />

      <div class="checkboxes">
        <n-checkbox v-model:checked="settingsStore.debug" class="checkbox">Debug</n-checkbox>
      </div>

      <hr>
    </div>

    <div>
      <h2>
        UMAP Settings
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

      <hr>
    </div>
    <div>
      <h2>
        UMAP CSV export settings
      </h2>

      <hr />

      <div class="checkboxes">
        <n-checkbox v-model:checked="settingsStore.umap.export.labels" class="checkbox">Labels</n-checkbox>
        <n-checkbox v-model:checked="settingsStore.umap.export.timestamps" class="checkbox">Timestamps</n-checkbox>
        <n-checkbox v-model:checked="settingsStore.umap.export.tags" class="checkbox">Tags</n-checkbox>
        <n-checkbox v-model:checked="settingsStore.umap.export.meta" class="checkbox">Meta</n-checkbox>
        <n-checkbox v-model:checked="settingsStore.umap.export.points" class="checkbox">Points</n-checkbox>
        <n-checkbox v-model:checked="settingsStore.umap.export.features" class="checkbox">Features</n-checkbox>
      </div>

      <hr>
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
