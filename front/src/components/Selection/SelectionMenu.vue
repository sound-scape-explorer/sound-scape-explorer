<script lang="ts" setup="">
import {NSelect} from 'naive-ui';
import {
  extractorOptionsRef,
  extractorSelectedRef,
} from 'src/hooks/useExtractors';
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
import {useStorageBands} from '../../composables/storage-bands';

const {options} = useStorageBands();
const {selected} = useBandSelection();
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
    v-model:value="selected"
    :disabled="reducerRef.value === null || isSelectedRef.value"
    :options="options"
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
    v-model:value="extractorSelectedRef.value"
    :disabled="reducerRef.value === null || isSelectedRef.value"
    :options="extractorOptionsRef.value"
    placeholder="Extractor..."
    size="small"
  />
</template>
