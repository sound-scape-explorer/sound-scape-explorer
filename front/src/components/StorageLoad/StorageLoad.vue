<script setup lang="ts">
import {reducerRef, useReducer} from 'src/hooks/useReducer';
import {useStorageSettings} from '../../hooks/useStorageSettings';
import {useStorageFilenames} from '../../hooks/useStorageFilenames';
import {computed} from 'vue';
import StorageLoadSelection from './StorageLoadSelection.vue';
import {useStorageReducers} from 'src/hooks/useStorageReducers';
import {useStorageRanges} from 'src/hooks/useStorageRanges';
import {configBandRef} from 'src/hooks/useConfigBands';
import {configIntegrationRef} from 'src/hooks/useConfigIntegrations';

useStorageRanges();
useStorageReducers();

useReducer();

useStorageSettings();
useStorageReducers();
useStorageFilenames();

const isSelectionRef = computed<boolean>(() => {
  if (
    configBandRef.value === null ||
    configIntegrationRef.value === null ||
    reducerRef.value === null
  ) {
    return false;
  }

  return true;
});
</script>

<template>
  <StorageLoadSelection v-if="isSelectionRef" />
</template>
