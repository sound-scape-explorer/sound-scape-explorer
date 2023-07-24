<script lang="ts" setup="">
import {NSelect} from 'naive-ui';
import {computed, ref, watch} from 'vue';
import {convertToNaiveSelectOptions} from '../../utils/convert-to-naive-select-options';
import {reducersRef} from 'src/hooks/useStorageReducers';
import {useReducer} from 'src/hooks/useReducer';
import {useIntegration} from 'src/hooks/useIntegration';
import {useBand} from 'src/hooks/useBand';

/**
 * State
 */

const {setBand} = useBand();
const {setIntegration} = useIntegration();
const {setReducer} = useReducer();

const reducersOptions = computed(() => {
  if (reducersRef.value === null) {
    return [];
  }

  const references: string[] = [];

  for (const reducer of reducersRef.value) {
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

const selectedOptionRef = ref<string | null>(null);

watch(selectedOptionRef, () => {
  if (selectedOptionRef.value === null || reducersRef.value === null) {
    return;
  }

  const stringElements = selectedOptionRef.value.split(' ');

  const band = stringElements[3];
  setBand(band);

  const integrationName = stringElements[4];
  setIntegration(integrationName);

  const reducerIndex = Number(stringElements[0]);
  const reducer = reducersRef.value.filter((r) => r.index === reducerIndex)[0];
  setReducer(reducer);
});
</script>

<template>
  <n-select
    v-model:value="selectedOptionRef"
    :options="reducersOptions"
    placeholder="Reducer..."
    size="small"
  />
</template>
