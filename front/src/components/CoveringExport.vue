<script lang="ts" setup="">
import {DownloadOutline} from '@vicons/ionicons5';
import {useCoveringExportComponent} from '../composables/useCoveringExportComponent';
import Button from './Button.vue';

const {loadingRef} = useCoveringExportComponent();

async function handleClick() {
  //
}
</script>

<template>
  <Button :disabled="true" :handle-click="handleClick" :loading-ref="loadingRef" text=".JSON">
    <download-outline />
  </Button>
</template>
