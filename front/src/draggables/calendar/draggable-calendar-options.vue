<script lang="ts" setup>
import {NDatePicker} from 'naive-ui';
import AppTooltip from 'src/app/app-tooltip.vue';
import {useDraggableCalendar} from 'src/draggables/calendar/use-draggable-calendar';
import {useDraggableCalendarLifecycles} from 'src/draggables/calendar/use-draggable-calendar-lifecycles';
import {useDraggableCalendarShortcuts} from 'src/draggables/calendar/use-draggable-calendar-shortcuts';
import {useDraggableCalendarTransport} from 'src/draggables/calendar/use-draggable-calendar-transport';

const {dateStartRef, dateEndRef, uiDisabled} = useDraggableCalendar();

const {handleDateStartUpdate} = useDraggableCalendarTransport();

useDraggableCalendarLifecycles();
useDraggableCalendarShortcuts();
</script>

<template>
  <div class="container">
    <div class="grid"></div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;

  width: 100%;
}

.grid {
  display: grid;
  grid-template-columns: auto auto auto repeat(3, 1.5rem) auto repeat(3, 1fr) auto;
  align-items: center;
  justify-items: center;

  gap: 0.8rem;

  user-select: none;
}

.toggle {
  justify-content: flex-start;
}

.button-tooltip {
  font-size: 0.8rem;
}

.bold {
  font-weight: bold;
}

.timezone {
  display: flex;
  justify-content: center;
  align-items: center;

  font-style: italic;
  font-size: 0.8rem;

  transform: translateY(1px);
}

.date {
  display: flex;
  justify-content: center;
  align-items: center;
  justify-self: center;

  font-size: 0.8rem;

  transform: translateY(1px);

  @media screen and (min-width: 1000px) and (max-width: 1100px) {
    font-size: 0.6rem;
    white-space: nowrap;
  }

  @media screen and (min-width: 800px) and (max-width: 1000px) {
    font-size: 0.5rem;
    white-space: nowrap;
  }
  @media screen and (max-width: 800px) {
    font-size: 0.4rem;
    white-space: nowrap;
  }
}

.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
