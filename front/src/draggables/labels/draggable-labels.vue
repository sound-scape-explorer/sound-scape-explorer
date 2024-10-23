<script lang="ts" setup="">
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import DraggableLabelsItems from 'src/draggables/labels/draggable-labels-item-container.vue';
import DraggableLabelsSidebar from 'src/draggables/labels/draggable-labels-sidebar.vue';
import {useDraggableLabels} from 'src/draggables/labels/use-draggable-labels';

const {sizeHorizontal, sizeVertical} = useDraggableLabels();
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
          [$style['horizontal-default']]: sizeHorizontal === 'default',
          [$style['horizontal-big']]: sizeHorizontal === 'big',
          [$style['horizontal-max']]: sizeHorizontal === 'max',
          [$style['vertical-default']]: sizeVertical === 'default',
          [$style['vertical-big']]: sizeVertical === 'big',
          [$style['vertical-max']]: sizeVertical === 'max',
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

  @include hide-scrollbar;
}

.horizontal-default {
  width: $w0;
}

.vertical-default {
  height: $h0;
}

.horizontal-big {
  width: $w2;
}

.vertical-big {
  height: $h2;
}

.horizontal-max {
  width: $w-max;
}

.vertical-max {
  height: $h-max;
}
</style>
