<script lang="ts" setup>
import {CodeDownloadOutline, DownloadOutline} from '@vicons/ionicons5';
import {useUMAPExport} from '../composables/useUMAPExport';
import {useUMAPStatus} from '../composables/useUMAPStatus';
import BaseButton from './BaseButton.vue';

const {loadingRef, handleClick} = useUMAPExport();
const {isDisabled} = useUMAPStatus();
</script>

<template>
  <BaseButton
    :disabled="isDisabled"
    :handle-click="async () => await handleClick('json')"
    :loading="loadingRef"
    text="json"
  >
    <code-download-outline />
  </BaseButton>
  <BaseButton
    :disabled="isDisabled"
    :handle-click="async () => await handleClick('csv')"
    :loading="loadingRef"
    text="csv"
  >
    <download-outline />
  </BaseButton>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}
</style>
