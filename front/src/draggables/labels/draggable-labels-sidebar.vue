<script lang="ts" setup="">
import {IonIcon} from '@ionic/vue';
import {chevronExpand} from 'ionicons/icons';
import AppButton from 'src/app/app-button.vue';
import AppDraggableSidebar from 'src/app/draggable-sidebar/app-draggable-sidebar.vue';
import FilteringInfo from 'src/components/filtering-info/filtering-info.vue';
import {useDraggableLabels} from 'src/draggables/labels/use-draggable-labels';

const {cycleHorizontal, cycleVertical} = useDraggableLabels();
</script>

<template>
  <AppDraggableSidebar>
    <AppButton
      :handle-click="cycleHorizontal"
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

    <AppButton
      :handle-click="cycleVertical"
      size="tiny"
      small-tooltip
      tooltip="Expand vertically"
      tooltip-placement="left"
    >
      <IonIcon :icon="chevronExpand" />
    </AppButton>

    <FilteringInfo />
  </AppDraggableSidebar>
</template>

<style lang="scss" module>
.info {
  font-size: 0.9em;
  width: $p0 * 3;
  height: $p0 * 3;
  text-align: center;
  color: $emerald;
}

.rotate {
  @include rotate-90;
}
</style>
