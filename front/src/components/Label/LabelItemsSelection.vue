<script lang="ts" setup="">
import {NCheckbox, NCheckboxGroup, NGi, NGrid} from 'naive-ui';
import {CURRENT_SCATTER_LEGEND_ID} from 'src/constants';
import {labelsRef} from 'src/hooks/useLabels';
import {computed, ref, watch, watchEffect} from 'vue';

import {colorsStore} from '../Colors/colorsStore';
import {useColorByLabel} from '../Colors/useColorByLabel';
import {labelsSelectionRef, useLabelsSelection} from './useLabelsSelection';

interface Props {
  property: string;
}

const props = defineProps<Props>();

const {getColorByLabelIndex} = useColorByLabel();
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

  return getColorByLabelIndex(index, uniquesRef.value.length);
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

const isActiveIdRef = computed<string>(() => {
  const colorType = `by${props.property}`;

  if (colorType !== colorsStore.colorType) {
    return '';
  }

  return CURRENT_SCATTER_LEGEND_ID;
});
</script>

<template>
  <n-checkbox-group
    v-model:value="selectionRef"
    :id="isActiveIdRef"
  >
    <n-grid
      :cols="2"
      :y-gap="4"
      :x-gap="4"
    >
      <n-gi v-for="(item, index) in uniquesRef">
        <n-checkbox
          class="checkbox"
          :style="{
            backgroundColor: getColorByItem(index),
          }"
          :value="item"
        >
          <span>{{ item }}</span>
        </n-checkbox>
      </n-gi>
    </n-grid>
  </n-checkbox-group>
</template>

<style lang="scss" scoped>
.checkbox {
  width: 100%;

  padding-left: 4px;
  border-radius: 4px;

  transition: background-color 120ms ease-in-out, opacity 120ms ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    opacity: 0.9;
  }

  span {
    color: inherit;
  }
}
</style>
