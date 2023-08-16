<script lang="ts" setup="">
import {NSelect} from 'naive-ui';
import {type Band, useBands} from 'src/hooks/useBands';
import {useExtractors} from 'src/hooks/useExtractors';
import {useIntegrations} from 'src/hooks/useIntegrations';
import {reducerRef, reducersRef, useReducers} from 'src/hooks/useReducers';
import {convertToNaiveSelectOptions} from 'src/utils/convert-to-naive-select-options';
import {computed, ref, watch} from 'vue';

/**
 * State
 */

const {selectBand} = useBands();
const {selectIntegration} = useIntegrations();
const {selectReducer} = useReducers();
const {selectExtractor} = useExtractors();

// Helper
const parseIndex = (optionString: string | null): number | null => {
  if (optionString === null) {
    return null;
  }

  const stringElements = optionString.split(' ');
  return Number(stringElements[0]);
};

// Reducers
const reducersOptionsRef = computed(() => {
  if (reducersRef.value === null) {
    return [];
  }

  const options = reducersRef.value.map(
    (r) => `${r.index} - ${r.name} (${r.dimensions}d)`,
  );
  return convertToNaiveSelectOptions(options);
});

const reducerSelectedRef = ref<Band['name'] | null>(null);
watch(reducerSelectedRef, () => {
  selectBand(null);
  bandSelectedRef.value = null;
  selectIntegration(null);
  integrationSelectedRef.value = null;
  selectExtractor(null);
  extractorSelectedRef.value = null;
  selectReducer(parseIndex(reducerSelectedRef.value));
});

// Bands
const bandsOptionsRef = computed(() => {
  if (reducerRef.value === null) {
    return [];
  }

  const options = reducerRef.value.bands.map(
    (band) => `${band.index} - ${band.name} (${band.low} Hz - ${band.high} Hz)`,
  );
  return convertToNaiveSelectOptions(options);
});

const bandSelectedRef = ref<Band['name'] | null>(null);
watch(bandSelectedRef, () => selectBand(parseIndex(bandSelectedRef.value)));

// Integrations
const integrationsOptionsRef = computed(() => {
  if (reducerRef.value === null) {
    return [];
  }

  const options = reducerRef.value.integrations.map(
    (integration) =>
      `${integration.index} - ${integration.name} (${integration.seconds} s)`,
  );
  return convertToNaiveSelectOptions(options);
});

const integrationSelectedRef = ref<Band['name'] | null>(null);
watch(integrationSelectedRef, () =>
  selectIntegration(parseIndex(integrationSelectedRef.value)),
);

// Extractors
const extractorsOptionsRef = computed(() => {
  if (reducerRef.value === null) {
    return [];
  }

  const options = reducerRef.value.nnExtractors.map(
    (ex) => `${ex.index} - ${ex.name}`,
  );
  return convertToNaiveSelectOptions(options);
});

const extractorSelectedRef = ref<Band['name'] | null>(null);
watch(extractorSelectedRef, () =>
  selectExtractor(parseIndex(extractorSelectedRef.value)),
);
</script>

<template>
  <n-select
    v-model:value="reducerSelectedRef"
    :options="reducersOptionsRef"
    placeholder="Reducer..."
    size="small"
  />
  <n-select
    v-model:value="bandSelectedRef"
    :options="bandsOptionsRef"
    :disabled="reducerRef.value === null"
    placeholder="Band..."
    size="small"
  />
  <n-select
    v-model:value="integrationSelectedRef"
    :options="integrationsOptionsRef"
    :disabled="reducerRef.value === null"
    placeholder="Integration..."
    size="small"
  />
  <n-select
    v-model:value="extractorSelectedRef"
    :options="extractorsOptionsRef"
    :disabled="reducerRef.value === null"
    placeholder="Extractor..."
    size="small"
  />
</template>
