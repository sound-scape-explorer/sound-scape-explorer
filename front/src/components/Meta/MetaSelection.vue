<script lang="ts" setup="">
import {NCheckbox, NCheckboxGroup} from 'naive-ui';
import {ref, watch} from 'vue';
import {colorsStore} from '../Colors/colorsStore';
import {useScatterMeta} from '../Scatter/useScatterMeta';
import {metaSelectionStore} from './metaSelectionStore';
import {useScatterFilterMeta} from '../Scatter/useScatterFilterMeta';

/**
 * Props
 */

interface Props {
  title: string;
  items: string[];
  index: number;
}

const props = defineProps<Props>();

/**
 * State
 */

const {filterByMeta} = useScatterFilterMeta();
const selectionRef = ref();

/**
 * Lifecycles
 */

watch(selectionRef, updateSelection);

/**
 * Handlers
 */

function getColorByItem(index: number): string | undefined {
  const {getMetaColorFromMetaIndex} = useScatterMeta();
  const colorType = `by${props.title}`;

  if (colorType !== colorsStore.colorType) {
    return undefined;
  }

  return getMetaColorFromMetaIndex(index, props.items.length);
}

function updateSelection() {
  if (selectionRef.value === null) {
    return;
  }

  metaSelectionStore.selection[props.index] = selectionRef.value;
  filterByMeta();
}
</script>

<template>
  <n-checkbox-group
    v-model:value="selectionRef"
    class="checkboxes"
  >
    <n-checkbox
      v-for="(item, index) in props.items"
      :style="{
        backgroundColor: getColorByItem(index),
      }"
      :value="item"
      class="checkbox"
    >
      {{ item }}
    </n-checkbox>
  </n-checkbox-group>
</template>

<style lang="scss" scoped>
.checkboxes {
  display: grid;
  padding-left: 0.8rem;
  gap: 0.2rem 1rem;
}

.checkbox {
  padding-left: 0.2rem;
  border-radius: 0.2rem;

  transition: background-color 120ms ease-in-out, opacity 120ms ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    opacity: 0.9;
  }
}
</style>
