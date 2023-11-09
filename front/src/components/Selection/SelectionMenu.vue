<script lang="ts" setup="">
import {NSelect} from 'naive-ui';
import {bandOptionsRef, bandSelectedRef} from 'src/hooks/useBands';
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
</script>

<template>
  <n-select
    v-model:value="reducerSelectedRef.value"
    :options="reducerOptionsRef.value"
    placeholder="Reducer..."
    size="small"
    :disabled="isSelectedRef.value"
  />
  <n-select
    v-model:value="bandSelectedRef.value"
    :options="bandOptionsRef.value"
    :disabled="reducerRef.value === null || isSelectedRef.value"
    placeholder="Band..."
    size="small"
  />
  <n-select
    v-model:value="integrationSelectedRef.value"
    :options="integrationOptionsRef.value"
    :disabled="reducerRef.value === null || isSelectedRef.value"
    placeholder="Integration..."
    size="small"
  />
  <n-select
    v-model:value="extractorSelectedRef.value"
    :options="extractorOptionsRef.value"
    :disabled="reducerRef.value === null || isSelectedRef.value"
    placeholder="Extractor..."
    size="small"
  />
</template>
