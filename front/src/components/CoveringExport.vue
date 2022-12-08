<script lang="ts" setup="">
import {NButton, NIcon} from 'naive-ui';
import {DownloadOutline} from '@vicons/ionicons5';
import {useCoveringExportComponent} from '../composables/useCoveringExportComponent';

const {loadingRef} = useCoveringExportComponent();

async function handleClick() {
  //
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
