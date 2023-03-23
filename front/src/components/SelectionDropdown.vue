<script lang="ts" setup="">
import {NSelect} from 'naive-ui';
import {computed, ref, watch} from 'vue';
import {useStorage} from '../composables/useStorage';
import {convertToNaiveSelectOptions} from '../utils/convert-to-naive-select-options';

interface Props {
  // eslint-disable-next-line no-unused-vars
  handleUpdate: (reducer: number, band: string, integration: string) => void;
}

const {handleUpdate} = defineProps<Props>();

const {getReducers} = await useStorage();

const reducers = await getReducers();

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

function processSelection() {
  if (
    selectedReducer.value === null
  ) {
    return;
  }

  const elements = selectedReducer.value.split(' ');

  handleUpdate(
    Number(elements[0]),
    elements[3],
    elements[4],
  );
}

const selectedReducer = ref<string | null>(null);

watch(selectedReducer, processSelection);
</script>

<template>
  <n-select
      v-model:value="selectedReducer"
      :options="reducersOptions"
      placeholder="Reducers..."
      size="tiny"
  />
</template>
