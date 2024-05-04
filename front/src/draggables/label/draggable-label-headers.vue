<script lang="ts" setup="">
import {ColorFillOutline} from '@vicons/ionicons5';
import {NButton, NGi, NGrid, NIcon, NTag, NTooltip} from 'naive-ui';
import {useStorageLabels} from 'src/composables/storage-labels';
import {type ColorType} from 'src/draggables/colors/color-type';
import DraggableLabelOptions from 'src/draggables/label/draggable-label-options.vue';
import {
  labelsSelectionRef,
  useLabelSelection,
} from 'src/draggables/label/label-selection';
import {labelColumnsRef} from 'src/draggables/label/labels-columns';
import {useColorSelection} from 'src/scatter/color-selection';

const {labels, labelProperties} = useStorageLabels();
const {updateSelection} = useLabelSelection();
const {type} = useColorSelection();

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

  if (type.value !== colorType) {
    type.value = colorType;
  }
};
</script>

<template>
  <NGrid :cols="labelColumnsRef.value">
    <NGi v-for="property in labelProperties">
      <div class="col">
        <NButton
          size="tiny"
          @click="() => handleBucketClick(property)"
        >
          <template #icon>
            <NIcon>
              <ColorFillOutline />
            </NIcon>
          </template>
        </NButton>
        <NTooltip
          :show-arrow="false"
          placement="top-start"
          trigger="hover"
        >
          <!--suppress VueUnrecognizedSlot -->
          <template #trigger>
            <NTag
              :bordered="false"
              class="tag"
              size="small"
              @click="() => handlePropertyClick(property)"
              @contextmenu="(e: PointerEvent) => handlePropertyRightClick(e, property)"
            >
              {{ property }}
            </NTag>
          </template>
          <div>
            <span>Left click: Invert selection</span>
            <br />
            <span>Right click: Clear selection</span>
          </div>
        </NTooltip>
      </div>

      <DraggableLabelOptions
        :property="property"
        class="checkboxes"
      />
    </NGi>
  </NGrid>
</template>

<style lang="scss" scoped>
.col {
  display: flex;
  align-items: flex-start;
  height: auto;
  padding-top: 8px;
  gap: 2px;
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
