<script lang="ts" setup>
import AppButton from 'src/app/app-button.vue';
import AppIcon from 'src/app/app-icon.vue';
import AppDraggableSidebar from 'src/app/draggable-sidebar/app-draggable-sidebar.vue';
import FilteringInfo from 'src/components/filtering-info/filtering-info.vue';
import {useDraggableCalendarExpand} from 'src/draggables/calendar/use-draggable-calendar-expand';

const {toggle} = useDraggableCalendarExpand();
</script>

<template>
  <AppDraggableSidebar>
    <AppButton :handle-click="toggle">
      <AppIcon
        icon="expandHorizontal"
        size="small"
      />
    </AppButton>

    <FilteringInfo />
  </AppDraggableSidebar>
</template>
