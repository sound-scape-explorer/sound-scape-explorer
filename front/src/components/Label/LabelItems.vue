<script lang="ts" setup="">
import {NGi, NGrid, NTag, NTooltip} from 'naive-ui';
import {labelsRef} from 'src/hooks/useLabels';
import {metaPropertiesRef} from 'src/hooks/useStorageMetaProperties';

import LabelItemsSelection from './LabelItemsSelection.vue';
import {labelsSelectionRef, useLabelsSelection} from './useLabelsSelection';

const {updateSelection} = useLabelsSelection();

const handleMetaPropertyClick = (property: string) => {
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
  <n-grid
    :cols="2"
    class="grid"
    x-gap="12"
  >
    <n-gi v-for="property in metaPropertiesRef.value">
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
            @click="() => handleMetaPropertyClick(property)"
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

      <LabelItemsSelection :property="property" />
    </n-gi>
  </n-grid>
</template>

<style lang="scss" scoped>
.tag {
  margin: 0.5rem 0;
  user-select: none;

  &:hover {
    cursor: pointer;
  }
}
</style>
