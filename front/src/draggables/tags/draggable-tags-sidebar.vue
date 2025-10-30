<script lang="ts" setup>
import AppButton from 'src/app/app-button.vue';
import AppIcon from 'src/app/app-icon.vue';
import AppDraggableSidebar from 'src/app/draggable-sidebar/app-draggable-sidebar.vue';
import FilteringInfo from 'src/components/filtering-info/filtering-info.vue';
import {useDraggableTags} from 'src/draggables/tags/use-draggable-tags';
import {useTagSelection} from 'src/draggables/tags/use-tag-selection';

const {cycleHorizontal, cycleVertical} = useDraggableTags();
const {reset} = useTagSelection();
</script>

<template>
  <AppDraggableSidebar>
    <AppButton
      :handle-click="reset"
      size="tiny"
      small-tooltip
      tooltip="Clear all selection"
      tooltip-placement="left"
    >
      <AppIcon
        icon="clean"
        size="small"
      />
    </AppButton>

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
