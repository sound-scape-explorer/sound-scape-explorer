<script lang="ts" setup>
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import {SuspenseCase} from 'src/app/draggable/use-app-draggable-suspense';
import Timeline from 'src/components/timeline/timeline.vue';
import {DraggableKey} from 'src/composables/use-draggables';
import DraggableCalendarMenu from 'src/draggables/calendar/draggable-calendar-menu.vue';
import DraggableCalendarSidebar from 'src/draggables/calendar/draggable-calendar-sidebar.vue';
import {useDraggableCalendarExpand} from 'src/draggables/calendar/use-draggable-calendar-expand';

const {isExpanded} = useDraggableCalendarExpand();
</script>

<template>
  <AppDraggable
    :class="[$style.container, {[$style.expanded]: isExpanded}]"
    :draggable-key="DraggableKey.enum.calendar"
    :suspense="SuspenseCase.enum.VIEW"
  >
    <DraggableCalendarSidebar />
    <DraggableCalendarMenu />

    <div :class="$style.timeline">
      <Timeline />
    </div>
  </AppDraggable>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';

.container {
  width: sizes.$s2;
}

.expanded {
  width: sizes.$w-max;
}

.timeline {
  margin-top: sizes.$p0;
}
</style>
