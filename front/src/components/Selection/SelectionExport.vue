<script lang="ts" setup>
import {CodeDownloadOutline, DownloadOutline} from '@vicons/ionicons5';
import AppButton from '../AppButton/AppButton.vue';
import {useScatterExport} from '../Scatter/useScatterExport';
import {useScatterStatus} from '../Scatter/useScatterStatus';

const {loadingRef, handleClick} = useScatterExport();
const {isDisabled} = useScatterStatus();
</script>

<template>
  <AppButton
    :disabled="isDisabled"
    :handle-click="async () => await handleClick('json')"
    :loading="loadingRef"
    text="json"
  >
    <code-download-outline />
  </AppButton>
  <AppButton
    :disabled="isDisabled"
    :handle-click="async () => await handleClick('csv')"
    :loading="loadingRef"
    text="csv"
  >
    <download-outline />
  </AppButton>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}
</style>
