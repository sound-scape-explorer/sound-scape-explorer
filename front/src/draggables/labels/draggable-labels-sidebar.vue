<script lang="ts" setup="">
import {IonIcon} from '@ionic/vue';
import {chevronExpand, expand} from 'ionicons/icons';
import AppButton from 'src/app/app-button.vue';
import AppTooltip from 'src/app/app-tooltip.vue';
import AppDraggableSidebar from 'src/app/draggable-sidebar/app-draggable-sidebar.vue';
import {useDraggableLabels} from 'src/draggables/labels/use-draggable-labels';
import {useLabelsInfo} from 'src/draggables/labels/use-labels-info';

const {toggleExpand} = useDraggableLabels();
const {count} = useLabelsInfo();
</script>

<template>
  <AppDraggableSidebar>
    <AppButton
      :handle-click="toggleExpand"
      size="tiny"
      tooltip="Expand"
      tooltip-placement="left"
    >
      <IonIcon :icon="chevronExpand" />
    </AppButton>

    <AppButton
      :handle-click="toggleExpand"
      size="tiny"
      tooltip="Expand"
      tooltip-placement="left"
    >
      <IonIcon :icon="expand" />
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
</style>
