<script lang="ts" setup>
import {computed} from 'vue';
import Button from './Button.vue';
import {ImageOutline} from '@vicons/ionicons5';
import {selectionImageStore} from '../store/selection-image.store';

/**
 * Props
 */

function handleClick() {
  if (!selectionImageStore.image) {
    return;
  }

  window.open(selectionImageStore.image);
}

const isDisabled = computed<boolean>(() => selectionImageStore.image === null);
</script>

<template>
  <Button :disabled="isDisabled" :handle-click="handleClick" text="Image">
    <image-outline />
  </Button>
</template>

<style lang="scss" scoped>
.image-container {
  display: flex;
  justify-content: center;
}
</style>
