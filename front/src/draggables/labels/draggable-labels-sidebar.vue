<script lang="ts" setup="">
import {IonIcon} from '@ionic/vue';
import {chevronExpand} from 'ionicons/icons';
import AppButton from 'src/app/app-button.vue';
import AppTooltip from 'src/app/app-tooltip.vue';
import AppDraggableSidebar from 'src/app/draggable-sidebar/app-draggable-sidebar.vue';
import {useDraggableLabels} from 'src/draggables/labels/use-draggable-labels';
import {useDraggableLabelsInfo} from 'src/draggables/labels/use-draggable-labels-info';

const {cycleHorizontal, cycleVertical} = useDraggableLabels();
const {count} = useDraggableLabelsInfo();
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

    <AppTooltip tooltip="Points excluded">
      <div :class="$style.info">
        {{ count }}
      </div>
    </AppTooltip>
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
