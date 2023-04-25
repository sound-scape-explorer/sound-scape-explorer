<script lang="ts" setup="">
import {NSelect} from 'naive-ui';
import {computed, ref, watch} from 'vue';
import {storage} from '../../storage/storage';
import {convertToNaiveSelectOptions} from '../../utils/convert-to-naive-select-options';

/**
 * Props
 */

interface Props {
  // eslint-disable-next-line no-unused-vars
  handleUpdate: (reducer: number, band: string, integration: string) => void;
}

const props = defineProps<Props>();

/**
 * State
 */

const selectedReducerRef = ref();

const reducersOptions = computed(() => {
  if (storage.reducers === null) {
    return [];
  }

  const references: string[] = [];

  for (const reducer of storage.reducers) {
    for (const band of reducer.bands) {
      for (const integration of reducer.integrations) {
        references.push(
          `${reducer.index} ${reducer.name} ${reducer.dimensions}d ${band} ${integration}`,
        );
      }
    }
  }

  return convertToNaiveSelectOptions(references);
});

/**
 * Lifecycles
 */

watch(selectedReducerRef, processSelection);

/**
 * Handlers
 */

function processSelection() {
  const selectedReducer = selectedReducerRef.value;

  if (!selectedReducer) {
    return;
  }

  const elements = selectedReducer.split(' ');

  const reducerIndex = Number(elements[0]);
  const band = elements[3];
  const integrationName = elements[4];

  props.handleUpdate(reducerIndex, band, integrationName);
}
</script>

<template>
  <n-select
    v-model:value="selectedReducerRef"
    :options="reducersOptions"
    placeholder="Reducers..."
    size="small"
  />
</template>
