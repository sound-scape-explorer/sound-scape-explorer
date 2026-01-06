<script lang="ts" setup>
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import {SuspenseCase} from 'src/app/draggable/use-app-draggable-suspense';
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import {DraggableKey} from 'src/composables/use-draggables';
import DraggableColorsFlavor from 'src/draggables/colors/draggable-colors-flavor.vue';
import DraggableColorsGradients from 'src/draggables/colors/draggable-colors-gradients.vue';
import DraggableColorsOpacity from 'src/draggables/colors/draggable-colors-opacity.vue';
import DraggableColorsRangeAcoustics from 'src/draggables/colors/draggable-colors-range-acoustics.vue';
import DraggableColorsRangeTags from 'src/draggables/colors/draggable-colors-range-tags.vue';
import DraggableColorsSelector from 'src/draggables/colors/draggable-colors-selector.vue';
</script>

<template>
  <AppDraggable
    :draggable-key="DraggableKey.enum.colors"
    :suspense="SuspenseCase.enum.VIEW"
  >
    <AppDraggableMenu>
      <DraggableColorsSelector />
      <DraggableColorsRangeTags />
      <DraggableColorsRangeAcoustics />
      <DraggableColorsOpacity />
      <DraggableColorsFlavor />
      <DraggableColorsGradients />
    </AppDraggableMenu>
  </AppDraggable>
</template>
