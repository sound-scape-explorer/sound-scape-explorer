<script lang="ts" setup="">
import type {Scale} from 'chroma-js';
import {NCheckbox, NCheckboxGroup, NGi, NGrid} from 'naive-ui';
import {useStorageLabels} from 'src/composables/storage-labels';
import {CURRENT_SCATTER_LEGEND_ID} from 'src/constants';
import {useColorByLabel} from 'src/draggables/colors/color-by-label';
import {
  labelsSelectionRef,
  useLabelSelection,
} from 'src/draggables/label/label-selection';
import {useColorSelection} from 'src/scatter/color-selection';
import {useScatterColorScale} from 'src/scatter/scatter-color-scale';
import {computed, ref, watch, watchEffect} from 'vue';

interface Props {
  property: string;
}

// todo: refactor this component
const props = defineProps<Props>();

const {type} = useColorSelection();
const {userScale} = useScatterColorScale();
const {labels} = useStorageLabels();
const {getColorByLabelIndex} = useColorByLabel();
const selectionRef = ref<string[]>([]);
const {updateSelection} = useLabelSelection();

const uniquesRef = computed<string[]>(() => {
  if (labels.value === null) {
    return [];
  }

  return labels.value[props.property];
});

function getColorByItem(index: number, scale: Scale): string | undefined {
  const colorType = `by${props.property}`;

  if (colorType !== type.value) {
    return undefined;
  }

  return getColorByLabelIndex(index, uniquesRef.value.length, scale);
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

  if (colorType !== type.value) {
    return '';
  }

  return CURRENT_SCATTER_LEGEND_ID;
});
</script>

<template>
  <NCheckboxGroup
    :id="isActiveIdRef"
    v-model:value="selectionRef"
  >
    <NGrid
      :cols="2"
      :x-gap="4"
      :y-gap="4"
    >
      <NGi v-for="(item, index) in uniquesRef">
        <NCheckbox
          :style="{
            backgroundColor: getColorByItem(index, userScale),
          }"
          :value="item"
          class="checkbox"
        >
          <span>{{ item }}</span>
        </NCheckbox>
      </NGi>
    </NGrid>
  </NCheckboxGroup>
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
