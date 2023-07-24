<script setup lang="ts">
import {useStorageSettings} from '../../hooks/useStorageSettings';
import {computed} from 'vue';
import StorageLoadSelection from './StorageLoadSelection.vue';
import {configBandRef} from 'src/hooks/useConfigBands';
import {configIntegrationRef} from 'src/hooks/useConfigIntegrations';
import {useConfigFiles} from 'src/hooks/useConfigFiles';
import {configReducersRef} from 'src/hooks/useConfigReducers';
import {useConfigRanges} from 'src/hooks/useConfigRanges';

useStorageSettings();
useConfigFiles();
useConfigRanges();

const isSelectionRef = computed<boolean>(() => {
  if (
    configBandRef.value === null ||
    configIntegrationRef.value === null ||
    configReducersRef.value === null
  ) {
    return false;
  }

  return true;
});
</script>

<template>
  <StorageLoadSelection v-if="isSelectionRef" />
</template>
