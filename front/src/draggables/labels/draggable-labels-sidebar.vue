<script lang="ts" setup="">
import {ExpandOutline} from '@vicons/ionicons5';
import AppButton from 'src/app/app-button.vue';
import AppTooltip from 'src/app/app-tooltip.vue';
import AppDraggableSidebar from 'src/app/draggable-sidebar/app-draggable-sidebar.vue';
import {useDraggableLabels} from 'src/draggables/labels/use-draggable-labels';
import {useLabelsInfo} from 'src/draggables/labels/use-labels-info';

const {columns, toggleColumns, toggleExpand} = useDraggableLabels();
const {count} = useLabelsInfo();
</script>

<template>
  <AppDraggableSidebar>
    <AppButton
      :handle-click="toggleExpand"
      icon
      size="tiny"
      tooltip="Expand"
      tooltip-placement="left"
    >
      <ExpandOutline />
    </AppButton>

    <AppButton
      :handle-click="toggleColumns"
      icon
      size="tiny"
      tooltip="Columns"
      tooltip-placement="left"
    >
      {{ columns }}
    </AppButton>

    <AppTooltip tooltip="Points excluded">
      <div class="info">
        {{ count }}
      </div>
    </AppTooltip>
  </AppDraggableSidebar>
</template>

<style lang="scss" scoped>
.info {
  width: $p0 * 3;
  height: $p0 * 3;

  font-size: 0.9em;

  color: $emerald;
  text-align: center;
}
</style>
