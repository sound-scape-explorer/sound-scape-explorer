<script lang="ts" setup="">
// TODO: Rename this component to LabelHeader or something
import {ColorFillOutline} from '@vicons/ionicons5';
import {NButton, NGi, NGrid, NIcon, NTag, NTooltip} from 'naive-ui';
import {useStorageLabels} from 'src/composables/storage-labels';
import {colorsStore, type ColorType} from 'src/draggables/colors/colors-store';
import LabelItemsSelection from 'src/draggables/label/draggable-label-options.vue';
import {
  labelsSelectionRef,
  useLabelSelection,
} from 'src/draggables/label/label-selection';
import {labelColumnsRef} from 'src/draggables/label/labels-columns';

const {labels, labelsProperties} = useStorageLabels();
const {updateSelection} = useLabelSelection();

const handlePropertyClick = (property: string) => {
  if (labels.value === null || labelsSelectionRef.value === null) {
    return;
  }

  const oldSelection = labelsSelectionRef.value[property];
  const uniques = labels.value[property];

  const newSelection = [];

  for (const unique of uniques) {
    if (oldSelection.includes(unique)) {
      continue;
    }

    newSelection.push(unique);
  }

  updateSelection(property, newSelection);
};

const handlePropertyRightClick = (e: PointerEvent, property: string) => {
  e.preventDefault();

  if (labelsSelectionRef.value === null) {
    return;
  }

  if (labelsSelectionRef.value[property].length === 0) {
    return;
  }

  updateSelection(property, []);
};

const handleBucketClick = (property: string) => {
  const colorType = `by${property}` as ColorType;

  if (colorsStore.colorType === colorType) {
    return;
  }

  colorsStore.colorType = colorType;
};
</script>

<template>
  <n-grid :cols="labelColumnsRef.value">
    <n-gi v-for="property in labelsProperties">
      <div class="col">
        <n-button
          size="tiny"
          @click="() => handleBucketClick(property)"
        >
          <template #icon>
            <n-icon>
              <color-fill-outline />
            </n-icon>
          </template>
        </n-button>
        <n-tooltip
          :show-arrow="false"
          placement="top-start"
          trigger="hover"
        >
          <template #trigger>
            <n-tag
              :bordered="false"
              class="tag"
              size="small"
              @click="() => handlePropertyClick(property)"
              @contextmenu="(e: PointerEvent) => handlePropertyRightClick(e, property)"
            >
              {{ property }}
            </n-tag>
          </template>
          <div>
            <span>Left click: Invert selection</span>
            <br />
            <span>Right click: Clear selection</span>
          </div>
        </n-tooltip>
      </div>

      <LabelItemsSelection
        :property="property"
        class="checkboxes"
      />
    </n-gi>
  </n-grid>
</template>

<style lang="scss" scoped>
.col {
  display: flex;
  align-items: flex-start;
  height: auto;
  padding-top: 8px;
}

.tag {
  user-select: none;

  &:hover {
    cursor: pointer;
  }
}

.checkboxes {
  padding-top: 8px;
}
</style>
