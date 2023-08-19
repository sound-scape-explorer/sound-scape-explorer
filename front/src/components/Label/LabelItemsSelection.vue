<script lang="ts" setup="">
import {NCheckbox, NCheckboxGroup} from 'naive-ui';
import {labelsRef} from 'src/hooks/useLabels';
import {computed, ref, watch, watchEffect} from 'vue';

import {colorsStore} from '../Colors/colorsStore';
import {useColorByMeta} from '../Colors/useColorByMeta';
import {labelsSelectionRef, useLabelsSelection} from './useLabelsSelection';

interface Props {
  property: string;
}

const props = defineProps<Props>();

const {getColorByMetaIndex} = useColorByMeta();
const selectionRef = ref<string[]>([]);
const {updateSelection} = useLabelsSelection();

const uniquesRef = computed<string[]>(() => {
  if (labelsRef.value === null) {
    return [];
  }

  return labelsRef.value[props.property];
});

function getColorByItem(index: number): string | undefined {
  const colorType = `by${props.property}`;

  if (colorType !== colorsStore.colorType) {
    return undefined;
  }

  return getColorByMetaIndex(index, uniquesRef.value.length);
}

watch(selectionRef, () => updateSelection(props.property, selectionRef.value));

const updateReverse = () => {
  if (labelsSelectionRef.value === null) {
    return;
  }

  if (selectionRef.value === labelsSelectionRef.value[props.property]) {
    return;
  }

  selectionRef.value = labelsSelectionRef.value[props.property];
};

watchEffect(updateReverse);
</script>

<template>
  <n-checkbox-group
    v-model:value="selectionRef"
    class="checkboxes"
  >
    <n-checkbox
      v-for="(item, index) in uniquesRef"
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
