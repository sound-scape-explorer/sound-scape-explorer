<script lang="ts" setup="">
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import DraggableLabelButtons from 'src/draggables/label/draggable-label-buttons.vue';
import DraggableLabelHeaders from 'src/draggables/label/draggable-label-headers.vue';
import {useLabelSelection} from 'src/draggables/label/label-selection';
import {labelZoomedRef} from 'src/draggables/label/label-zoom';
import {computed} from 'vue';

useLabelSelection();
// const {build} = useLabelSelection();

const containerClasses = computed<string>(() => {
  let classes = 'container';

  if (labelZoomedRef.value === true) {
    classes += ' open';
  }

  return classes;
});
</script>

<template>
  <AppDraggable draggable-key="labels">
    <div
      :class="containerClasses"
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
