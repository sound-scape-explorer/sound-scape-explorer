<script lang="ts" setup>
import AppButton from 'src/app/app-button.vue';
import AppIcon from 'src/app/app-icon.vue';
import AppDraggableSidebar from 'src/app/draggable-sidebar/app-draggable-sidebar.vue';
import FilteringInfo from 'src/components/filtering-info/filtering-info.vue';
import {useDraggableTags} from 'src/draggables/tags/use-draggable-tags';

const {cycleHorizontal, cycleVertical} = useDraggableTags();
</script>

<template>
  <AppDraggableSidebar>
    <AppButton
      :handle-click="cycleHorizontal"
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
      :handle-click="cycleVertical"
      size="tiny"
      small-tooltip
      tooltip="Expand vertically"
      tooltip-placement="left"
    >
      <AppIcon
        icon="expandVertical"
        size="small"
      />
    </AppButton>

    <FilteringInfo />
  </AppDraggableSidebar>
</template>
