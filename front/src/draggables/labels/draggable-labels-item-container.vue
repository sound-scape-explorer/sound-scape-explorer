<script lang="ts" setup="">
import {NGi, NGrid} from 'naive-ui';
import {useStorageLabels} from 'src/composables/use-storage-labels';
import DraggableLabelsItemContent from 'src/draggables/labels/draggable-labels-item-content.vue';
import {useDraggableLabels} from 'src/draggables/labels/use-draggable-labels';
import {computed} from 'vue';

const {labelProperties} = useStorageLabels();
const {sizeHorizontal} = useDraggableLabels();

const cols = computed(() => {
  if (sizeHorizontal.value === 'big' || sizeHorizontal.value === 'max') {
    return 2;
  }

  return 1;
});
</script>

<template>
  <NGrid :cols="cols">
    <NGi v-for="property in labelProperties">
      <DraggableLabelsItemContent :property="property" />
    </NGi>
  </NGrid>
</template>
