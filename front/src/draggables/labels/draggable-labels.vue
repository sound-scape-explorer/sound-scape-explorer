<script lang="ts" setup="">
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import DraggableLabelsItems from 'src/draggables/labels/draggable-labels-item-container.vue';
import DraggableLabelsSidebar from 'src/draggables/labels/draggable-labels-sidebar.vue';
import {useDraggableLabels} from 'src/draggables/labels/use-draggable-labels';

const {isExpanded} = useDraggableLabels();
</script>

<template>
  <AppDraggable
    draggable-key="labels"
    suspense="view"
  >
    <DraggableLabelsSidebar />

    <div
      :class="[
        $style.container,
        {
          [$style.expanded]: isExpanded,
        },
      ]"
    >
      <DraggableLabelsItems />
    </div>
  </AppDraggable>
</template>

<style lang="scss" module>
.container {
  display: flex;
  overflow-y: auto;
  flex-direction: column;
  height: $h1;

  @include hide-scrollbar;
}

.expanded {
  width: $s2;
  height: $h2;
}
</style>
