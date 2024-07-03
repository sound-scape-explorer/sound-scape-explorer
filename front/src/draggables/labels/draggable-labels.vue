<script lang="ts" setup="">
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import DraggableLabelsItems from 'src/draggables/labels/draggable-labels-items.vue';
import DraggableLabelsSidebar from 'src/draggables/labels/draggable-labels-sidebar.vue';
import {useDraggableLabels} from 'src/draggables/labels/use-draggable-labels';
import {computed} from 'vue';

const {isExpanded} = useDraggableLabels();

const classes = computed<string>(() => {
  let string = 'container';

  if (isExpanded.value === true) {
    string += ' expand';
  }

  return string;
});
</script>

<template>
  <AppDraggable
    draggable-key="labels"
    hide-separator
  >
    <DraggableLabelsSidebar />

    <div :class="classes">
      <DraggableLabelsItems />
    </div>
  </AppDraggable>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 14rem;
  overflow-y: auto;
}

.expand {
  height: 100%;
  max-height: 70vh;
}
</style>
