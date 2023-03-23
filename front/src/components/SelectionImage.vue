<script lang="ts" setup>
import {ImageOutline} from '@vicons/ionicons5';
import {computed} from 'vue';
import {selectionImageStore} from '../store/selection-image.store';
import Button from './Button.vue';

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
