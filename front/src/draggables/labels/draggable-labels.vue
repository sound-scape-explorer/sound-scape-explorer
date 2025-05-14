<script lang="ts" setup>
import {NGi, NGrid} from 'naive-ui';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import {useLabelSets} from 'src/composables/use-label-sets';
import {TagsDraggableSize} from 'src/constants';
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
          [$style['horizontal-small']]:
            sizeHorizontal === TagsDraggableSize.enum.small,
          [$style['horizontal-medium']]:
            sizeHorizontal === TagsDraggableSize.enum.medium,
          [$style['horizontal-large']]:
            sizeHorizontal === TagsDraggableSize.enum.large,
          [$style['vertical-small']]:
            sizeVertical === TagsDraggableSize.enum.small,
          [$style['vertical-medium']]:
            sizeVertical === TagsDraggableSize.enum.medium,
          [$style['vertical-large']]:
            sizeVertical === TagsDraggableSize.enum.large,
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

.horizontal-small {
  width: sizes.$w0;
}

.vertical-small {
  height: sizes.$h0;
}

.horizontal-medium {
  width: sizes.$w2;
}

.vertical-medium {
  height: sizes.$h2;
}

.horizontal-large {
  width: sizes.$w-max;
}

.vertical-large {
  height: sizes.$h-max;
}
</style>
