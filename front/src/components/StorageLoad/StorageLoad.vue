<script setup lang="ts">
import {useStorageBands} from 'src/hooks/useStorageBands';
import {useBand, bandRef} from '../../hooks/useBand';
import {useIntegration, integrationRef} from '../../hooks/useIntegration';
import {useReducer} from 'src/hooks/useReducer';
import {useStorageSettings} from '../../hooks/useStorageSettings';
import {useStorageFilenames} from '../../hooks/useStorageFilenames';
import {computed} from 'vue';
import StorageLoadSelection from './StorageLoadSelection.vue';
import {useStorageReducers} from 'src/hooks/useStorageReducers';
import {useStorageIntegrations} from 'src/hooks/useStorageIntegrations';
import {useStorageRanges} from 'src/hooks/useStorageRanges';

useStorageBands();
useStorageIntegrations();
useStorageRanges();
useStorageReducers();

useBand();
useIntegration();
useReducer();

useStorageSettings();
useStorageReducers();
useStorageFilenames();

const isSelectionRef = computed<boolean>(() => {
  if (bandRef.value === null || integrationRef.value === null) {
    return false;
  }

  return true;
});
</script>

<template>
  <StorageLoadSelection v-if="isSelectionRef" />
</template>
