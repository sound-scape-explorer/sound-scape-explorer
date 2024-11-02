<script lang="ts" setup="">
import {IonIcon} from '@ionic/vue';
import {chevronExpand} from 'ionicons/icons';
import AppButton from 'src/app/app-button.vue';
import AppDraggableSidebar from 'src/app/draggable-sidebar/app-draggable-sidebar.vue';
import FilteringInfo from 'src/components/filtering-info/filtering-info.vue';
import {useDraggableCalendarExpand} from 'src/draggables/calendar/use-draggable-calendar-expand';

const {toggle} = useDraggableCalendarExpand();
</script>

<template>
  <AppDraggableSidebar>
    <AppButton :handle-click="toggle">
      <IonIcon
        :class="$style.rotate"
        :icon="chevronExpand"
      />
    </AppButton>

    <FilteringInfo />
  </AppDraggableSidebar>
</template>

<style lang="scss" module>
.rotate {
  @include rotate-90;
}
</style>
