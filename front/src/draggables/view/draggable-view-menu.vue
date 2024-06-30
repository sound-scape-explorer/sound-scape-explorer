<script lang="ts" setup="">
import {NSelect} from 'naive-ui';
import {useBandOptions} from 'src/composables/use-band-options';
import {useBandSelection} from 'src/composables/use-band-selection';
import {useExtractorOptions} from 'src/composables/use-extractor-options';
import {useSelectExtractor} from 'src/composables/use-extractor-selection';
import {useIntegrationOptions} from 'src/composables/use-integration-options';
import {useIntegrationSelection} from 'src/composables/use-integration-selection';
import {useReducerOptions} from 'src/composables/use-reducer-options';
import {useReducerSelection} from 'src/composables/use-reducer-selection';
import {useViewState} from 'src/composables/use-view-state';

const {hasView} = useViewState();

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
  <NSelect
    v-model:value="reducerSelected"
    :disabled="hasView"
    :options="reducerOptions"
    placeholder="Reducer..."
    size="small"
  />
  <NSelect
    v-model:value="bandSelected"
    :disabled="reducer === null || hasView"
    :options="bandOptions"
    placeholder="Band..."
    size="small"
  />
  <NSelect
    v-model:value="integrationSelected"
    :disabled="reducer === null || hasView"
    :options="integrationOptions"
    placeholder="Integration..."
    size="small"
  />
  <NSelect
    v-model:value="extractorSelected"
    :disabled="reducer === null || hasView"
    :options="extractorOptions"
    placeholder="Extractor..."
    size="small"
  />
</template>
