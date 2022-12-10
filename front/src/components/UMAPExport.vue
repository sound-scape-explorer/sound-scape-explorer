<script lang="ts" setup>
import {CodeDownloadOutline, DownloadOutline} from '@vicons/ionicons5';
import {useUMAPExport} from '../composables/useUMAPExport';
import {useUMAPStatus} from '../composables/useUMAPStatus';
import Button from './Button.vue';

const {loadingRef, handleClick} = useUMAPExport();
const {isDisabled} = useUMAPStatus();
</script>

<template>
  <Button
      :disabled="isDisabled"
      :handle-click="() => handleClick('json')"
      :loading-ref="loadingRef"
      text="json"
  >
    <code-download-outline />
  </Button>
  <Button
      :disabled="isDisabled"
      :handle-click="() => handleClick('csv')"
      :loading-ref="loadingRef"
      text="csv"
  >
    <download-outline />
  </Button>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}
</style>
