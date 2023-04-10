<script lang="ts" setup="">
import {NSelect} from 'naive-ui';
import {computed, ref, unref, watch} from 'vue';
import {useStorage} from '../../hooks/useStorage';
import {convertToNaiveSelectOptions} from '../../utils/convert-to-naive-select-options';

const {getReducers} = await useStorage();

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

const reducers = await getReducers();
const selectedReducer = ref<string | null>(null);

const reducersOptions = computed(() => {
  const references: string[] = [];

  for (const reducer of reducers) {
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

watch(selectedReducer, processSelection);

/**
 * Handlers
 */

function processSelection() {
  const selectedReducerValue = unref(selectedReducer);

  if (!selectedReducerValue) {
    return;
  }

  const elements = selectedReducerValue.split(' ');

  props.handleUpdate(
    Number(elements[0]),
    elements[3],
    elements[4],
  );
}
</script>

<template>
  <n-select
    v-model:value="selectedReducer"
    :options="reducersOptions"
    placeholder="Reducers..."
    size="small"
  />
</template>
