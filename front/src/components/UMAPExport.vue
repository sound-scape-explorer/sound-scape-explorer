<script lang="ts" setup>
import {NButton, NIcon} from 'naive-ui';
import {DownloadOutline} from '@vicons/ionicons5';
import {UMAPDatasetStore} from '../store/UMAP-dataset.store';
import {useUMAPExport} from '../composables/useUMAPExport';
import {useUMAPStatus} from '../composables/useUMAPStatus';

const {loadingRef} = useUMAPExport();
const {parse} = useUMAPExport();
const {isDisabled} = useUMAPStatus();

function handleClick() {
  const {dataset} = UMAPDatasetStore;
  parse(dataset);
}
</script>

<template>
  <n-button :disabled="isDisabled" :loading="loadingRef" @click="handleClick">
    <template #icon>
      <n-icon>
        <download-outline />
      </n-icon>
    </template>
    .JSON
  </n-button>
</template>

<style lang="scss" scoped>

</style>
