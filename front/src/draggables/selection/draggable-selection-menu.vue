<script lang="ts" setup="">
import {NSelect} from 'naive-ui';
import {useBandOptions} from 'src/composables/band-options';
import {useBandSelection} from 'src/composables/band-selection';
import {useExtractorOptions} from 'src/composables/extractor-options';
import {useSelectExtractor} from 'src/composables/extractor-selection';
import {useIntegrationOptions} from 'src/composables/integration-options';
import {useIntegrationSelection} from 'src/composables/integration-selection';
import {useReducerOptions} from 'src/composables/reducer-options';
import {useReducerSelection} from 'src/composables/reducer-selection';
import {isSelectedRef} from 'src/composables/select';

const {options: reducerOptions} = useReducerOptions();
const {options: bandOptions} = useBandOptions();
const {options: integrationOptions} = useIntegrationOptions();
const {options: extractorOptions} = useExtractorOptions();

const {selected: reducerSelected, reducer} = useReducerSelection();
const {selected: bandSelected} = useBandSelection();
const {selected: integrationSelected} = useIntegrationSelection();
const {selected: extractorSelected} = useSelectExtractor();
</script>

<template>
  <n-select
    v-model:value="reducerSelected"
    :disabled="isSelectedRef.value"
    :options="reducerOptions"
    placeholder="Reducer..."
    size="small"
  />
  <n-select
    v-model:value="bandSelected"
    :disabled="reducer === null || isSelectedRef.value"
    :options="bandOptions"
    placeholder="Band..."
    size="small"
  />
  <n-select
    v-model:value="integrationSelected"
    :disabled="reducer === null || isSelectedRef.value"
    :options="integrationOptions"
    placeholder="Integration..."
    size="small"
  />
  <n-select
    v-model:value="extractorSelected"
    :disabled="reducer === null || isSelectedRef.value"
    :options="extractorOptions"
    placeholder="Extractor..."
    size="small"
  />
</template>
