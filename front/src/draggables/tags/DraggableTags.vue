<script lang="ts" setup>
import {NGi, NGrid} from 'naive-ui';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import {useTagUniques} from 'src/composables/use-tag-uniques';
import {TagsDraggableSize} from 'src/constants';
import DraggableTagsSidebar from 'src/draggables/tags/DraggableTagsSidebar.vue';
import Tag from 'src/draggables/tags/Tag.vue';
import {useDraggableTags} from 'src/draggables/tags/use-draggable-tags';
import {useDraggableTagsDom} from 'src/draggables/tags/use-draggable-tags-dom';

const {sizeHorizontal, sizeVertical} = useDraggableTags();
const {cols} = useDraggableTagsDom();
const {allUniques} = useTagUniques();
</script>

<template>
  <AppDraggable
    draggable-key="labels"
    suspense="view"
  >
    <DraggableTagsSidebar />

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
        <NGi v-for="property in Object.keys(allUniques)">
          <Tag :name="property" />
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
