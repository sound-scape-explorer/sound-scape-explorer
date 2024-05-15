<script lang="ts" setup="">
import {ColorFillOutline} from '@vicons/ionicons5';
import {NButton, NGi, NGrid, NIcon, NTag, NTooltip} from 'naive-ui';
import {useStorageLabels} from 'src/composables/storage-labels';
import {type ColorType} from 'src/draggables/colors/color-type';
import {useDraggableLabel} from 'src/draggables/label/draggable-label';
import DraggableLabelOptions from 'src/draggables/label/draggable-label-options.vue';
import {useLabelSelection} from 'src/draggables/label/label-selection';
import {useColorSelection} from 'src/components/scatter/color-selection';

const {labels, labelProperties} = useStorageLabels();
const {updateSelection, selection} = useLabelSelection();
const {type} = useColorSelection();
const {columns} = useDraggableLabel();

const handlePropertyClick = (property: string) => {
  if (labels.value === null) {
    return;
  }

  const oldSelection = selection.value[property];
  const uniques = labels.value[property];

  const reverseSelection = [];

  for (const unique of uniques) {
    if (oldSelection.includes(unique)) {
      continue;
    }

    reverseSelection.push(unique);
  }

  updateSelection(property, reverseSelection);
};

const handlePropertyRightClick = (e: PointerEvent, property: string) => {
  e.preventDefault();

  if (selection.value[property].length === 0) {
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
  <NGrid :cols="columns">
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
