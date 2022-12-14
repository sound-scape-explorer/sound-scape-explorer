<script lang="ts" setup>
import {computed, onMounted, ref, watch} from 'vue';
import {NSelect} from 'naive-ui';
import {configStore} from '../store/config.store';
import type {ConfigInterface} from '../interfaces/config.interface';
import {TAG_PREFIX} from '../constants';
import {UMAPDatasetStore} from '../store/UMAP-dataset.store';
import {UMAPFiltersStore} from '../store/UMAP-filters.store';
import {Dataset} from '../lib/scatter-gl-0.0.13';
import {useUMAPStatus} from '../composables/useUMAPStatus';
import {convertToNaiveSelectOptions} from '../utils/convert-to-naive-select-options';

/**
 * State
 */

const options = ref<string[]>([]);
const {isDisabled} = useUMAPStatus();

const naiveOptions = computed(() => convertToNaiveSelectOptions(options.value));

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

function updateTags(nextTags: string[]) {
  UMAPFiltersStore.tags = nextTags;
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
      :disabled="isDisabled"
      :on-update:value="updateTags"
      :options="naiveOptions"
      class="filter"
      filterable
      multiple
      placeholder="Filter by..."
  />
</template>

<style lang="scss" scoped>
.filter {
  user-select: none;
}
</style>
