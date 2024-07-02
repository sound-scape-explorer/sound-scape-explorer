<script lang="ts" setup="">
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import DraggableLabelsButtons from 'src/draggables/labels/draggable-labels-buttons.vue';
import DraggableLabelsItems from 'src/draggables/labels/draggable-labels-items.vue';
import {useDraggableLabels} from 'src/draggables/labels/use-draggable-labels';
import {computed} from 'vue';

const {isZoomed} = useDraggableLabels();

const classes = computed<string>(() => {
  let string = 'container';

  if (isZoomed.value === true) {
    string += ' open';
  }

  return string;
});
</script>

<template>
  <AppDraggable
    draggable-key="labels"
    hide-separator
  >
    <DraggableLabelsButtons />

    <div
      :class="classes"
      class="container"
    >
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
  padding-right: 0.5rem;
}

.open {
  height: 100%;
  max-height: 70vh;
}
</style>
