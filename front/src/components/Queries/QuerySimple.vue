<script lang="ts" setup>
import {ColorWandOutline} from '@vicons/ionicons5';
import {NIcon, NInput} from 'naive-ui';
import {ref, watch} from 'vue';
import {useTimeout} from '../../hooks/useTimeout';
import {getArraysIntersection} from '../../utils/get-arrays-intersection';
import {queryStore} from './queryStore';
import {scatterReadyRef} from '../Scatter/useScatterReady';

const input = ref<string>('');

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
  if (datasetRef.value === null) {
    throw new Error('Dataset not ready');
  }

  return Object.values(datasetRef.value.metadata)
    .map(({label}) => (typeof label === 'undefined' ? '' : label))
    .filter((element) => element !== '');
}

function filterByString(string: string): string[] {
  const labels = getDatasetLabels();
  return labels.filter((label) => {
    const splitPathAndFilename = splitLabelByPath(label);
    const columns = splitLabelByColumns(splitPathAndFilename[1]);

    return columns.some(
      (column) => column.toUpperCase() === string.toUpperCase(),
    );
  });
}

function processQuery() {
  queryStore.query = input.value;
  const queries = input.value.split(' ');
  const results: string[][] = [];
  queryStore.matches = [];

  if (queries.length === 1 && queries[0] === '') {
    return;
  }

  // Find all results
  queries.forEach((query, key) => {
    const matches = filterByString(query);

    console.log(matches);

    if (matches.length === 0) {
      return;
    }

    results[key] = matches;

    queryStore.matches = [...queryStore.matches, ...matches];
  });

  console.log(results);

  // Find intersection
  queryStore.matches = getArraysIntersection(results);
}

watch(input, () => {
  useTimeout(processQuery, 500);
});
</script>

<template>
  <n-input
    v-model:value="input"
    :disabled="!scatterReadyRef.value"
    placeholder="Query..."
    size="small"
    type="text"
  >
    <template #suffix>
      <n-icon class="icon">
        <color-wand-outline />
      </n-icon>
    </template>
  </n-input>
</template>
