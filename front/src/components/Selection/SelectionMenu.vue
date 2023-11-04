<script lang="ts" setup="">
import {NSelect} from 'naive-ui';
import {bandSelectedRef, useBands} from 'src/hooks/useBands';
import {extractorSelectedRef, useExtractors} from 'src/hooks/useExtractors';
import {
  integrationSelectedRef,
  useIntegrations,
} from 'src/hooks/useIntegrations';
import {
  reducerRef,
  reducerSelectedRef,
  useReducers,
} from 'src/hooks/useReducers';
import {isSelectedRef} from 'src/hooks/useSelection';

const {bandOptionsRef} = useBands();
const {integrationOptionsRef} = useIntegrations();
const {extractorOptionsRef} = useExtractors();
const {reducerOptionsRef} = useReducers();
</script>

<template>
  <n-select
    v-model:value="reducerSelectedRef.value"
    :options="reducerOptionsRef"
    placeholder="Reducer..."
    size="small"
    :disabled="isSelectedRef.value"
  />
  <n-select
    v-model:value="bandSelectedRef.value"
    :options="bandOptionsRef"
    :disabled="reducerRef.value === null || isSelectedRef.value"
    placeholder="Band..."
    size="small"
  />
  <n-select
    v-model:value="integrationSelectedRef.value"
    :options="integrationOptionsRef"
    :disabled="reducerRef.value === null || isSelectedRef.value"
    placeholder="Integration..."
    size="small"
  />
  <n-select
    v-model:value="extractorSelectedRef.value"
    :options="extractorOptionsRef"
    :disabled="reducerRef.value === null || isSelectedRef.value"
    placeholder="Extractor..."
    size="small"
  />
</template>
