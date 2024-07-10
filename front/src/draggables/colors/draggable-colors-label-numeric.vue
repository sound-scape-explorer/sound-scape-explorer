<script lang="ts" setup="">
import {CalculatorOutline, FlashOutline} from '@vicons/ionicons5';
import AppButton from 'src/app/app-button.vue';
import {useColorByLabel} from 'src/draggables/colors/use-color-by-label';
import {useLabelsNumeric} from 'src/draggables/labels/use-labels-numeric';
import {onUnmounted} from 'vue';

const {detect: detectLabelRange} = useColorByLabel();
const {isEnabled, toggle, disable} = useLabelsNumeric();

onUnmounted(disable);
</script>

<template>
  <AppButton
    :active="isEnabled"
    :handle-click="toggle"
    :tooltip="`Coloring by range ${isEnabled ? 'on' : 'off'}`"
    icon
    size="small"
    tooltip-placement="bottom"
  >
    <CalculatorOutline />
  </AppButton>

  <AppButton
    :disabled="!isEnabled"
    :handle-click="detectLabelRange"
    icon
    size="small"
    tooltip="Detect range"
    tooltip-placement="bottom"
  >
    <FlashOutline />
  </AppButton>
</template>
