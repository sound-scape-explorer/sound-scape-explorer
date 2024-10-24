<script lang="ts" setup="">
import {IonIcon} from '@ionic/vue';
import {chevronExpand} from 'ionicons/icons';
import AppButton from 'src/app/app-button.vue';
import AppInfo from 'src/app/app-info.vue';
import AppDraggableSidebar from 'src/app/draggable-sidebar/app-draggable-sidebar.vue';
import {useDraggableCalendarExpand} from 'src/draggables/calendar/use-draggable-calendar-expand';
import {useDraggableCalendarInfo} from 'src/draggables/calendar/use-draggable-calendar-info';
import {computed, ref} from 'vue';

const {excluded, collected} = useDraggableCalendarInfo();
const {toggle} = useDraggableCalendarExpand();
const isFlipped = ref<boolean>(false);

const tooltip = computed(() =>
  isFlipped.value ? 'Points excluded' : 'Points collected',
);
const color = computed(() => (isFlipped.value ? 'default' : 'active'));
const payload = computed(() => (isFlipped.value ? excluded : collected));

const flip = () => (isFlipped.value = !isFlipped.value);
</script>

<template>
  <AppDraggableSidebar>
    <AppButton :handle-click="toggle">
      <IonIcon
        :class="$style.rotate"
        :icon="chevronExpand"
      />
    </AppButton>
    <AppInfo
      :color="color"
      :handle-click="flip"
      :tooltip="tooltip"
    >
      {{ payload }}
    </AppInfo>
  </AppDraggableSidebar>
</template>

<style lang="scss" module>
.rotate {
  @include rotate-90;
}
</style>
