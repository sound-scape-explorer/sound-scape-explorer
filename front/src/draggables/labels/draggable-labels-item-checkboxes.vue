<script lang="ts" setup="">
import {NCheckbox, NCheckboxGroup, NGi, NGrid} from 'naive-ui';
import {useStorageLabels} from 'src/composables/use-storage-labels';
import {CURRENT_SCATTER_LEGEND_ID} from 'src/constants';
import {useColorByLabel} from 'src/draggables/colors/use-color-by-label';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {useLabelsNumeric} from 'src/draggables/labels/use-labels-numeric';
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
const {getColorByLabelIndex, getColorNumeric} = useColorByLabel();
const checkboxes = ref<string[] | undefined>([]); // todo: don't know why this gets overwritten to undefined at component mount
const {updateSelection, selection} = useLabelsSelection();
const {isEnabled} = useLabelsNumeric();

const set = computed<string[]>(() =>
  labels.value === null ? [] : labels.value[props.property],
);

const getColorItem = (p: number): string | undefined => {
  if (props.property !== criteria.value) {
    return undefined;
  }

  if (isEnabled.value) {
    return getColorNumeric(Number(set.value[p]));
  }

  return getColorByLabelIndex(p, set.value.length);
};

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
      <NGi v-for="(value, p) in set">
        <NCheckbox
          :class="$style.checkbox"
          :style="{
            backgroundColor: getColorItem(p),
          }"
          :value="value"
          size="small"
        >
          <span>{{ value }}</span>
        </NCheckbox>
      </NGi>
    </NGrid>
  </NCheckboxGroup>
</template>

<style lang="scss" module>
.checkbox {
  width: 100%;
  height: 100%;
  padding-left: $g0;
  border-radius: $g0;

  @include transition-checkboxes;

  &:hover {
    opacity: 0.9;
    background-color: $grey;
  }

  span {
    color: inherit;
  }
}
</style>
