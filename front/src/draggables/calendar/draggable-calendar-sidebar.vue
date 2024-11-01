<script lang="ts" setup="">
import {IonIcon} from '@ionic/vue';
import {
  arrowBackOutline,
  arrowForwardOutline,
  chevronExpand,
} from 'ionicons/icons';
import AppButton from 'src/app/app-button.vue';
import AppDraggableSidebar from 'src/app/draggable-sidebar/app-draggable-sidebar.vue';
import FilteringInfo from 'src/components/filtering-info/filtering-info.vue';
import {useIntervalSelector} from 'src/draggables/audio/use-interval-selector';
import {useDraggableCalendarExpand} from 'src/draggables/calendar/use-draggable-calendar-expand';

const {toggle} = useDraggableCalendarExpand();
const {forward, back} = useIntervalSelector();
</script>

<template>
  <AppDraggableSidebar>
    <AppButton :handle-click="toggle">
      <IonIcon
        :class="$style.rotate"
        :icon="chevronExpand"
      />
    </AppButton>

    <AppButton :handle-click="back">
      <IonIcon :icon="arrowBackOutline" />
    </AppButton>

    <AppButton :handle-click="forward">
      <IonIcon :icon="arrowForwardOutline" />
    </AppButton>

    <FilteringInfo />
  </AppDraggableSidebar>
</template>

<style lang="scss" module>
.rotate {
  @include rotate-90;
}
</style>
