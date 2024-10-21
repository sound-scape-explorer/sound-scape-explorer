<script lang="ts" setup="">
import {NGi, NGrid} from 'naive-ui';
import {useStorageLabels} from 'src/composables/use-storage-labels';
import DraggableLabelsItemContent from 'src/draggables/labels/draggable-labels-item-content.vue';
import {useDraggableLabels} from 'src/draggables/labels/use-draggable-labels';

const {labelProperties} = useStorageLabels();
const {isExpanded} = useDraggableLabels();
</script>

<template>
  <NGrid :cols="isExpanded ? 2 : 1">
    <NGi v-for="property in labelProperties">
      <DraggableLabelsItemContent :property="property" />
    </NGi>
  </NGrid>
</template>
