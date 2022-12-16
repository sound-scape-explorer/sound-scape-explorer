<script lang="ts" setup>
import {ref, watch} from 'vue';
import {NIcon, NInput} from 'naive-ui';
import {ColorWandOutline} from '@vicons/ionicons5';
import {useTimeout} from '../composables/useTimeout';
import {UMAPDatasetStore} from '../store/UMAP-dataset.store';
import {UMAPQueryStore} from '../store/UMAP-query.store';
import {getArraysIntersection} from '../utils/get-arrays-intersection';
import {useUMAPStatus} from '../composables/useUMAPStatus';

const input = ref<string>('');
const {isDisabled} = useUMAPStatus();

function splitLabelByPath(label: string) {
  return label.split('/');
}

/**
 * Columns are separated in the filename by underscores _
 * @example PRE_CerBra_alarm_6_a_AUTUMN
 * @param {string} label - label string to split
 */
function splitLabelByColumns(label: string) {
  return label.split('_');
}

function getDatasetLabels(): string[] {
  if (!UMAPDatasetStore.dataset) {
    throw new Error('Dataset not ready');
  }

  const data = UMAPDatasetStore.dataset.metadata;

  return Object.values(data)
    .map(({label}) => typeof label === 'undefined' ? '' : label)
    .filter((element) => element !== '');
}

function filterByString(string: string): string[] {
  const labels = getDatasetLabels();
  return labels.filter((label) => {
    const splitPathAndFilename = splitLabelByPath(label);
    const columns = splitLabelByColumns(splitPathAndFilename[1]);

    return columns.some((column) => column.toUpperCase() === string.toUpperCase());
  });
}

function processQuery() {
  UMAPQueryStore.query = input.value;
  const queries = input.value.split(' ');
  const results: string[][] = [];
  UMAPQueryStore.matches = [];

  if (queries.length === 1 && queries[0] === '') {
    return;
  }

  // Find all results
  queries.forEach((query, key) => {
    const matches = filterByString(query);

    if (matches.length === 0) {
      return;
    }

    results[key] = matches;

    UMAPQueryStore.matches = [
      ...UMAPQueryStore.matches,
      ...matches,
    ];
  });

  // Find intersection
  UMAPQueryStore.matches = getArraysIntersection(results);
}

watch(input, () => {
  useTimeout(processQuery, 500);
});
</script>

<template>
  <n-input v-model:value="input" :disabled="isDisabled" placeholder="Query..." type="text">
    <template #suffix>
      <n-icon class="icon">
        <color-wand-outline />
      </n-icon>
    </template>
  </n-input>
</template>

<style lang="scss" scoped>
</style>
