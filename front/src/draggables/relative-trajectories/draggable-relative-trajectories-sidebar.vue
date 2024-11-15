<script lang="ts" setup="">
import {IonIcon} from '@ionic/vue';
import {chevronExpand} from 'ionicons/icons';
import AppButton from 'src/app/app-button.vue';
import AppDraggableSidebar from 'src/app/draggable-sidebar/app-draggable-sidebar.vue';
import {useDraggableRelativeTrajectoriesExpand} from 'src/draggables/relative-trajectories/use-draggable-relative-trajectories-expand';

const {toggle} = useDraggableRelativeTrajectoriesExpand();
</script>

<template>
  <AppDraggableSidebar>
    <AppButton
      :handle-click="toggle"
      size="tiny"
      small-tooltip
      tooltip="Expand horizontally"
      tooltip-placement="left"
    >
      <IonIcon
        :class="$style.rotate"
        :icon="chevronExpand"
      />
    </AppButton>
  </AppDraggableSidebar>
</template>

<style lang="scss" module>
.rotate {
  @include rotate-90;
}
</style>
