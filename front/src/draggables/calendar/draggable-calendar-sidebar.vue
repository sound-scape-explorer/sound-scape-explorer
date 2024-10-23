<script lang="ts" setup="">
import AppInfo from 'src/app/app-info.vue';
import AppDraggableSidebar from 'src/app/draggable-sidebar/app-draggable-sidebar.vue';
import {useDraggableCalendarInfo} from 'src/draggables/calendar/use-draggable-calendar-info';
import {computed, ref} from 'vue';

const {excluded, collected} = useDraggableCalendarInfo();
const isFlipped = ref<boolean>(false);

const tooltip = computed(() =>
  isFlipped.value ? 'Points excluded' : 'Points collected',
);
const color = computed(() => (isFlipped.value ? 'default' : 'active'));
const payload = computed(() => (isFlipped.value ? excluded : collected));

const handleClick = () => {
  console.log('click');
  isFlipped.value = !isFlipped.value;
};
</script>

<template>
  <AppDraggableSidebar>
    <AppInfo
      :color="color"
      :handle-click="handleClick"
      :tooltip="tooltip"
    >
      {{ payload }}
    </AppInfo>
  </AppDraggableSidebar>
</template>
