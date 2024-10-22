<script lang="ts" setup="">
import {IonIcon} from '@ionic/vue';
import {calculatorOutline, flashOutline} from 'ionicons/icons';
import AppButton from 'src/app/app-button.vue';
import {useColorByLabel} from 'src/draggables/colors/use-color-by-label';
import {useLabelsNumeric} from 'src/draggables/labels/use-labels-numeric';
import {onBeforeUnmount} from 'vue';

const {detect: detectLabelRange} = useColorByLabel();
const {isEnabled, toggle, disable} = useLabelsNumeric();

onBeforeUnmount(disable);
</script>

<template>
  <AppButton
    :active="isEnabled"
    :handle-click="toggle"
    :tooltip="`Coloring by range ${isEnabled ? 'on' : 'off'}`"
    size="small"
    tooltip-placement="bottom"
  >
    <IonIcon :icon="calculatorOutline" />
  </AppButton>

  <AppButton
    :disabled="!isEnabled"
    :handle-click="detectLabelRange"
    size="small"
    tooltip="Detect range"
    tooltip-placement="bottom"
  >
    <IonIcon :icon="flashOutline" />
  </AppButton>
</template>
