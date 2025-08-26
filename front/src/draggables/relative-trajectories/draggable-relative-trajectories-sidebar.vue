<script lang="ts" setup>
import AppButton from 'src/app/app-button.vue';
import AppIcon from 'src/app/app-icon.vue';
import AppDraggableSidebar from 'src/app/draggable-sidebar/app-draggable-sidebar.vue';
import {useDraggableRelativeTrajectoriesExpand} from 'src/draggables/relative-trajectories/use-draggable-relative-trajectories-expand';

const {toggle} = useDraggableRelativeTrajectoriesExpand();
</script>

<template>
  <AppDraggableSidebar>
    <AppButton
      :handle-click="toggle"
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
  </AppDraggableSidebar>
</template>

<style lang="scss" module>
@use 'src/styles/fx';

.rotate {
  @include fx.rotate-90;
}
</style>
