<script lang="ts" setup="">
// TODO: Rename this component to LabelHeader or something
import {ColorFillOutline} from '@vicons/ionicons5';
import {NButton, NGi, NGrid, NIcon, NTag, NTooltip} from 'naive-ui';
import {labelsPropertiesRef, labelsRef} from 'src/hooks/useLabels';

import {colorsStore, type ColorType} from '../Colors/colorsStore';
import LabelItemsSelection from './LabelItemsSelection.vue';
import {labelsSelectionRef, useLabelsSelection} from './useLabelsSelection';

const {updateSelection} = useLabelsSelection();

const handlePropertyClick = (property: string) => {
  if (labelsRef.value === null || labelsSelectionRef.value === null) {
    return;
  }

  const oldSelection = labelsSelectionRef.value[property];
  const uniques = labelsRef.value[property];

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
  <n-grid :cols="2">
    <n-gi v-for="property in labelsPropertiesRef.value">
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
          trigger="hover"
          placement="top-start"
          :show-arrow="false"
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
        class="checkboxes"
        :property="property"
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
