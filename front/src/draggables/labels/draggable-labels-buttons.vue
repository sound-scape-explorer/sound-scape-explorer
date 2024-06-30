<script lang="ts" setup="">
import {SearchOutline} from '@vicons/ionicons5';
import AppButtonNew from 'src/app/app-button-new.vue';
import AppTooltip from 'src/app/app-tooltip.vue';
import AppDraggableSidebar from 'src/app/draggable-sidebar/app-draggable-sidebar.vue';
import {useDraggableLabels} from 'src/draggables/labels/use-draggable-labels';
import {useLabelsInfo} from 'src/draggables/labels/use-labels-info';

const {columns, toggleColumns, toggleZoom} = useDraggableLabels();
const {count} = useLabelsInfo();
</script>

<template>
  <AppDraggableSidebar>
    <AppButtonNew
      :handle-click="toggleZoom"
      icon
      size="tiny"
      tooltip="Zoom"
      tooltip-placement="left"
    >
      <SearchOutline />
    </AppButtonNew>

    <AppButtonNew
      :handle-click="toggleColumns"
      icon
      size="tiny"
      tooltip="Columns"
      tooltip-placement="left"
    >
      {{ columns }}
    </AppButtonNew>

    <AppTooltip tooltip="points filtered">
      <div class="info">
        {{ count }}
      </div>
    </AppTooltip>
  </AppDraggableSidebar>
</template>

<style lang="scss" scoped>
.info {
  width: 2em;
  height: 2em;

  font-size: 0.9em;

  color: rgba(23, 159, 87, 1);
  text-align: center;
}
</style>
