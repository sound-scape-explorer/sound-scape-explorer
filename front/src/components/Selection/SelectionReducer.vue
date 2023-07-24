<script lang="ts" setup="">
import {NSelect} from 'naive-ui';
import {computed, ref, watch} from 'vue';
import {convertToNaiveSelectOptions} from '../../utils/convert-to-naive-select-options';
import {useConfigBands} from 'src/hooks/useConfigBands';
import {useConfigIntegrations} from 'src/hooks/useConfigIntegrations';
import {
  configReducersRef,
  useConfigReducers,
} from 'src/hooks/useConfigReducers';

/**
 * State
 */

const {selectBand} = useConfigBands();
const {selectIntegration} = useConfigIntegrations();
const {selectReducer} = useConfigReducers();

const reducersOptions = computed(() => {
  if (configReducersRef.value === null) {
    return [];
  }

  const references: string[] = [];

  for (const reducer of configReducersRef.value) {
    for (const bandName of reducer.bandsNames) {
      for (const integrationName of reducer.integrationsNames) {
        references.push(
          `${reducer.index} ${reducer.name} ${reducer.dimensions}d ${bandName} ${integrationName}`,
        );
      }
    }
  }

  return convertToNaiveSelectOptions(references);
});

const selectedOptionRef = ref<string | null>(null);

watch(selectedOptionRef, () => {
  if (selectedOptionRef.value === null || configReducersRef.value === null) {
    return;
  }

  const stringElements = selectedOptionRef.value.split(' ');

  const bandName = stringElements[3];
  selectBand(bandName);

  const integrationName = stringElements[4];
  selectIntegration(integrationName);

  const reducerIndex = Number(stringElements[0]);
  selectReducer(reducerIndex);
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
