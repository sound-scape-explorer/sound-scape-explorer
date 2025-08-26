<script lang="ts" setup>
import AppButton from 'src/app/app-button.vue';
import AppIcon from 'src/app/app-icon.vue';
import {useColorByTag} from 'src/draggables/colors/use-color-by-tag';
import {useTagNumeric} from 'src/draggables/tags/use-tag-numeric';
import {onBeforeUnmount} from 'vue';

const {detect: detectLabelRange} = useColorByTag();
const {isEnabled, toggle, disable} = useTagNumeric();

onBeforeUnmount(disable);
</script>

<template>
  <AppButton
    :active="isEnabled"
    :handle-click="toggle"
    :tooltip="`Act as numeric range ${isEnabled ? 'on' : 'off'}`"
    size="small"
    tooltip-placement="bottom"
  >
    <AppIcon
      icon="calculator"
      size="small"
    />
  </AppButton>

  <AppButton
    :disabled="!isEnabled"
    :handle-click="detectLabelRange"
    size="small"
    tooltip="Detect range"
    tooltip-placement="bottom"
  >
    <AppIcon
      icon="detect"
      size="small"
    />
  </AppButton>
</template>
