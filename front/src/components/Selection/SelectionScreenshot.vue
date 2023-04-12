<script lang="ts" setup="">
import {ImageOutline} from '@vicons/ionicons5';
import AppButton from '../AppButton/AppButton.vue';
import {useScatter} from '../Scatter/useScatter';
import {useScatterStatus} from '../Scatter/useScatterStatus';

const {screenshot} = useScatter();
const {isDisabled} = useScatterStatus();
</script>

<template>
  <AppButton
    :disabled="isDisabled"
    :handle-click="screenshot"
    text="Screenshot"
  >
    <image-outline />
  </AppButton>
</template>
