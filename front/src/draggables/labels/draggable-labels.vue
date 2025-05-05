<script lang="ts" setup>
import {NGi, NGrid} from 'naive-ui';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import {useLabelSets} from 'src/composables/use-label-sets';
import DraggableLabelsSidebar from 'src/draggables/labels/draggable-labels-sidebar.vue';
import Label from 'src/draggables/labels/label.vue';
import {useDraggableLabels} from 'src/draggables/labels/use-draggable-labels';
import {useDraggableLabelsDom} from 'src/draggables/labels/use-draggable-labels-dom';

const {sizeHorizontal, sizeVertical} = useDraggableLabels();
const {cols} = useDraggableLabelsDom();
const {sets} = useLabelSets();
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
      <NGrid
        :cols="cols"
        y-gap="8"
      >
        <NGi v-for="property in Object.keys(sets)">
          <Label :property="property" />
        </NGi>
      </NGrid>
    </div>
  </AppDraggable>
</template>

<style lang="scss" module>
@use 'src/styles/scrolls';
@use 'src/styles/sizes';

.container {
  display: flex;
  overflow-y: auto;
  flex-direction: column;

  @include scrolls.tiny-scrollbar;
}

.horizontal-default {
  width: sizes.$w0;
}

.vertical-default {
  height: sizes.$h0;
}

.horizontal-big {
  width: sizes.$w2;
}

.vertical-big {
  height: sizes.$h2;
}

.horizontal-max {
  width: sizes.$w-max;
}

.vertical-max {
  height: sizes.$h-max;
}
</style>
