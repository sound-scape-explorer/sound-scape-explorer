<script lang="ts" setup>
import {NButton, NIcon} from 'naive-ui';
import {DownloadOutline} from '@vicons/ionicons5';
import {UMAPDatasetStore} from '../store/UMAP-dataset.store';
import {useUMAPExport} from '../composables/useUMAPExport';

const {loadingRef} = useUMAPExport();
const {parse} = useUMAPExport();

function handleClick() {
  const {dataset} = UMAPDatasetStore;
  parse(dataset);
}
</script>

<template>
  <n-button :loading="loadingRef" @click="handleClick">
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
