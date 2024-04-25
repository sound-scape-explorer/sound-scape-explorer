<script lang="ts" setup="">
import {NSelect} from 'naive-ui';
import {useStorageBands} from 'src/composables/storage-bands';
import {useStorageExtractors} from 'src/composables/storage-extractors';
import {
  integrationOptionsRef,
  integrationSelectedRef,
} from 'src/hooks/useIntegrations';
import {
  reducerOptionsRef,
  reducerRef,
  reducerSelectedRef,
} from 'src/hooks/useReducers';
import {isSelectedRef} from 'src/hooks/useSelection';

import {useBandSelection} from '../../composables/band-selection';
import {useExtractorSelection} from '../../composables/extractor-selection';

const {options: bandOptions} = useStorageBands();
const {options: extractorOptions} = useStorageExtractors();

const {selected: bandSelected} = useBandSelection();
const {selected: extractorSelected} = useExtractorSelection();
</script>

<template>
  <n-select
    v-model:value="reducerSelectedRef.value"
    :disabled="isSelectedRef.value"
    :options="reducerOptionsRef.value"
    placeholder="Reducer..."
    size="small"
  />
  <n-select
    v-model:value="bandSelected"
    :disabled="reducerRef.value === null || isSelectedRef.value"
    :options="bandOptions"
    placeholder="Band..."
    size="small"
  />
  <n-select
    v-model:value="integrationSelectedRef.value"
    :disabled="reducerRef.value === null || isSelectedRef.value"
    :options="integrationOptionsRef.value"
    placeholder="Integration..."
    size="small"
  />
  <n-select
    v-model:value="extractorSelected"
    :disabled="reducerRef.value === null || isSelectedRef.value"
    :options="extractorOptions"
    placeholder="Extractor..."
    size="small"
  />
</template>
