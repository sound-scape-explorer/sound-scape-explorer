<script lang="ts" setup="">
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import Timeline from 'src/components/timeline/timeline.vue';
import DraggableCalendarMenu from 'src/draggables/calendar/draggable-calendar-menu.vue';
import DraggableCalendarSidebar from 'src/draggables/calendar/draggable-calendar-sidebar.vue';
import {useDraggableCalendarExpand} from 'src/draggables/calendar/use-draggable-calendar-expand';

const {isExpanded} = useDraggableCalendarExpand();
</script>

<template>
  <AppDraggable
    :class="[$style.container, {[$style.expanded]: isExpanded}]"
    draggable-key="calendar"
    suspense="view"
  >
    <DraggableCalendarSidebar />
    <DraggableCalendarMenu />

    <div :class="$style.timeline">
      <Timeline />
    </div>
  </AppDraggable>
</template>

<style lang="scss" module>
.container {
  width: $s2;
}

.expanded {
  width: $w-max;
}

.timeline {
  margin-top: $p0;
}
</style>
