<script lang="ts" setup="">
import {NGi, NGrid} from 'naive-ui';
import {useStorageLabels} from 'src/composables/use-storage-labels';
import DraggableLabelsItemContent from 'src/draggables/labels/draggable-labels-item-content.vue';
import {useDraggableLabels} from 'src/draggables/labels/use-draggable-labels';

const {labelProperties} = useStorageLabels();
const {columns} = useDraggableLabels();
</script>

<template>
  <NGrid :cols="columns">
    <NGi v-for="property in labelProperties">
      <DraggableLabelsItemContent :property="property" />
    </NGi>
  </NGrid>
</template>
