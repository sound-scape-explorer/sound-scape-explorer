<script lang="ts" setup="">
import {NCheckbox, NCheckboxGroup, NGi, NGrid} from 'naive-ui';
import {useColorSelection} from 'src/components/scatter/use-color-selection';
import {useStorageLabels} from 'src/composables/use-storage-labels';
import {CURRENT_SCATTER_LEGEND_ID} from 'src/constants';
import {useColorByLabel} from 'src/draggables/colors/use-color-by-label';
import {useLabelsSelection} from 'src/draggables/labels/use-labels-selection';
import {computed, ref, watch, watchEffect} from 'vue';

interface Props {
  property: string;
}

// todo: refactor this component
// todo: REALLY
const props = defineProps<Props>();

const {criteria} = useColorSelection();
const {labels} = useStorageLabels();
const {getColorByLabelIndex} = useColorByLabel();
const checkboxes = ref<string[] | undefined>([]); // todo: don't know why this gets overwritten to undefined at component mount
const {updateSelection, selection} = useLabelsSelection();

const uniquesRef = computed<string[]>(() => {
  if (labels.value === null) {
    return [];
  }

  return labels.value[props.property];
});

function getColorByItem(index: number): string | undefined {
  if (props.property !== criteria.value) {
    return undefined;
  }

  return getColorByLabelIndex(index, uniquesRef.value.length);
}

watch(checkboxes, () => {
  if (typeof checkboxes.value === 'undefined') {
    return;
  }

  updateSelection(props.property, checkboxes.value ?? []);
});

const updateReverse = () => {
  if (checkboxes.value === selection.value[props.property]) {
    return;
  }

  checkboxes.value = selection.value[props.property];
};

watchEffect(updateReverse);

const isActiveIdRef = computed<string>(() => {
  if (props.property !== criteria.value) {
    return '';
  }

  return CURRENT_SCATTER_LEGEND_ID;
});
</script>

<template>
  <NCheckboxGroup
    :id="isActiveIdRef"
    v-model:value="checkboxes"
  >
    <NGrid
      :cols="2"
      :x-gap="4"
      :y-gap="4"
    >
      <NGi v-for="(item, index) in uniquesRef">
        <NCheckbox
          :style="{
            backgroundColor: getColorByItem(index),
          }"
          :value="item"
          class="checkbox"
          size="small"
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
