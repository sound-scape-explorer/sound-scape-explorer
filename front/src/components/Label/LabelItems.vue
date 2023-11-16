<script lang="ts" setup="">
import {NGi, NGrid, NTag, NTooltip} from 'naive-ui';
import {labelsPropertiesRef, labelsRef} from 'src/hooks/useLabels';

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
</script>

<template>
  <n-grid :cols="2">
    <n-gi v-for="property in labelsPropertiesRef.value">
      <n-tooltip
        trigger="hover"
        placement="top-start"
        :show-arrow="false"
      >
        <template #trigger>
          <div class="col">
            <n-tag
              :bordered="false"
              class="tag"
              size="small"
              @click="() => handlePropertyClick(property)"
              @contextmenu="(e: PointerEvent) => handlePropertyRightClick(e, property)"
            >
              {{ property }}
            </n-tag>
          </div>
        </template>
        <div>
          <span>Left click: Invert selection</span>
          <br />
          <span>Right click: Clear selection</span>
        </div>
      </n-tooltip>

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
