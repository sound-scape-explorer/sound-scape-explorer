<script lang="ts" setup>
import AppButton from 'src/app/app-button.vue';
import AppIcon from 'src/app/app-icon.vue';
import AppDraggableSidebar from 'src/app/draggable-sidebar/app-draggable-sidebar.vue';
import FilteringInfo from 'src/components/filtering-info/filtering-info.vue';
import {useDraggableTemporal} from 'src/draggables/temporal/use-draggable-temporal';

const {hasExtractor, isDisplay, toggleDisplay, toggleExpanded} =
  useDraggableTemporal();
</script>

<template>
  <AppDraggableSidebar>
    <AppButton
      :disabled="!hasExtractor"
      :handle-click="toggleExpanded"
      size="tiny"
      small-tooltip
      tooltip="Expand horizontally"
      tooltip-placement="left"
    >
      <AppIcon
        icon="expandHorizontal"
        size="small"
      />
    </AppButton>

    <AppButton
      :disabled="!hasExtractor"
      :handle-click="toggleDisplay"
      :tooltip="isDisplay ? 'Chart on' : 'Chart off'"
      small-tooltip
      tooltip-placement="left"
    >
      <AppIcon
        v-if="!isDisplay"
        icon="eyeOff"
        size="small"
      />
      <AppIcon
        v-if="isDisplay"
        icon="eyeOn"
        size="small"
      />
    </AppButton>

    <FilteringInfo />
  </AppDraggableSidebar>
</template>

<style lang="scss" module>
@use 'src/styles/fx';

.rotate {
  @include fx.rotate-90;
}
</style>
