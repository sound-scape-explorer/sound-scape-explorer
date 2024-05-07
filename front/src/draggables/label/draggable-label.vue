<script lang="ts" setup="">
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import {useDraggableLabel} from 'src/draggables/label/draggable-label';
import DraggableLabelButtons from 'src/draggables/label/draggable-label-buttons.vue';
import DraggableLabelHeaders from 'src/draggables/label/draggable-label-headers.vue';
import {computed} from 'vue';

const {isZoomed} = useDraggableLabel();

const classes = computed<string>(() => {
  let string = 'container';

  if (isZoomed.value === true) {
    string += ' open';
  }

  return string;
});
</script>

<template>
  <AppDraggable draggable-key="labels">
    <div
      :class="classes"
      class="container"
    >
      <DraggableLabelButtons />
      <DraggableLabelHeaders />
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
