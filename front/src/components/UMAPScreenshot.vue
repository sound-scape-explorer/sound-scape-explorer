<script lang="ts" setup="">
import Button from './Button.vue';
import {ImageOutline} from '@vicons/ionicons5';
import {useUMAPComponent} from '../composables/useUMAPComponent';
import {useUMAPStatus} from '../composables/useUMAPStatus';

const {screenshot} = useUMAPComponent();
const {isDisabled} = useUMAPStatus();
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
