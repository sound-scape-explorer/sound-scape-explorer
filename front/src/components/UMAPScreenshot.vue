<script lang="ts" setup="">
import Button from './Button.vue';
import {selectionImageStore} from '../store/selection-image.store';
import {computed} from 'vue';
import {ImageOutline} from '@vicons/ionicons5';
import {useUMAPComponent} from '../composables/useUMAPComponent';

const {screenshot} = useUMAPComponent();
const isDisabled = computed<boolean>(() => selectionImageStore.image === null);
</script>

<template>
  <Button
      :disabled="isDisabled"
      :handle-click="screenshot"
      text="Screenshot"
  >
    <image-outline />
  </Button>
</template>
