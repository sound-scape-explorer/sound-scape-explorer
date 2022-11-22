<script lang="ts" setup>
import {computed, onMounted, ref, watch} from 'vue';
import {NSelect} from 'naive-ui';
import {configStore} from '../store/config.store';
import type {ConfigInterface} from '../interfaces/config.interface';
import {TAG_PREFIX} from '../constants';
import {UMAPDatasetStore} from '../store/UMAP-dataset.store';
import {UMAPFiltersStore} from '../store/UMAP-filters.store';
import {Dataset} from 'scatter-gl';

/**
 * State
 */

const options = ref<string[]>([]);

const naiveOptions = computed(() => {
  return options.value.map((option) => ({
    label: option,
    value: option,
  }));
});

/**
 * Handlers
 */

function getTagName(baseTag: string) {
  return `${TAG_PREFIX}${baseTag}`;
}

function addTags(loggers: ConfigInterface['files']) {
  Object.keys(loggers).forEach((loggerLabel) => {
    const logger = loggers[loggerLabel];
    const tags = logger[2];

    Object.keys(tags).forEach((_, tagIndex) => {
      const tag = getTagName(tags[tagIndex]);

      if (options.value.indexOf(tag) === -1) {
        options.value.push(tag);
      }
    });
  });
}

function addLabels(metadata: Dataset['metadata']) {
  Object.keys(metadata).forEach((_, metaIndex) => {
    const metaEntry = metadata[metaIndex];
    const label = metaEntry.label;

    if (label && options.value.indexOf(label) === -1) {
      options.value.push(label);
    }
  });
}

/**
 * Lifecycles
 */

onMounted(() => {
  const {config} = configStore;

  if (!config) {
    return;
  }

  addTags(config.files);
});

watch(UMAPDatasetStore, () => {
  const {dataset} = UMAPDatasetStore;

  if (!dataset) {
    return;
  }

  addLabels(dataset.metadata);
});
</script>

<template>
  <n-select
      v-model:value="UMAPFiltersStore.tags"
      :clearable="true"
      :options="naiveOptions"
      placeholder="Filter by..."
  />
</template>
