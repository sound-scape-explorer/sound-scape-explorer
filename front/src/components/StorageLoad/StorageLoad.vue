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
import {useStorageIndicators} from 'src/hooks/useStorageIndicators';

useStorageBands();
useStorageIntegrations();
useStorageRanges();
useStorageReducers();
useStorageIndicators();

useBand();
useIntegration();
useReducer();

useStorageSettings();
useStorageReducers();
useStorageFilenames();

const isSelection = computed<boolean>(() => {
  if (bandRef.value === null || integrationRef.value === null) {
    return false;
  }

  return true;
});
</script>

<template>
  <StorageLoadSelection v-if="isSelection" />
</template>
