<script lang="ts" setup="">
import {SearchOutline} from '@vicons/ionicons5';
import AppButtonNew from 'src/app/app-button-new.vue';
import AppDraggableSidebar from 'src/app/draggable-sidebar/app-draggable-sidebar.vue';
import {useDraggableLabels} from 'src/draggables/labels/use-draggable-labels';

const {columns, toggleColumns, toggleZoom} = useDraggableLabels();
</script>

<template>
  <AppDraggableSidebar>
    <AppButtonNew
      :handle-click="toggleZoom"
      size="tiny"
      tooltip="Zoom"
      tooltip-placement="left"
    >
      <SearchOutline />
    </AppButtonNew>

    <AppButtonNew
      :handle-click="toggleColumns"
      size="tiny"
      tooltip="Columns"
      tooltip-placement="left"
    >
      {{ columns }}
    </AppButtonNew>
  </AppDraggableSidebar>
</template>
