<script lang="ts" setup="">
import {ColorFillOutline} from '@vicons/ionicons5';
import {NGi, NGrid, NTag, NTooltip} from 'naive-ui';
import AppButton from 'src/app/app-button.vue';
import {useColorSelection} from 'src/components/scatter/use-color-selection';
import {useStorageLabels} from 'src/composables/use-storage-labels';
import DraggableLabelsItemsOptions from 'src/draggables/labels/draggable-labels-items-options.vue';
import {useDraggableLabels} from 'src/draggables/labels/use-draggable-labels';
import {useLabelsSelection} from 'src/draggables/labels/use-labels-selection';

const {labels, labelProperties} = useStorageLabels();
const {updateSelection, selection} = useLabelsSelection();
const {handleLabelClick} = useColorSelection();
const {columns} = useDraggableLabels();

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
</script>

<template>
  <NGrid :cols="columns">
    <NGi v-for="property in labelProperties">
      <div class="cell ml mr mb">
        <AppButton
          :handle-click="() => handleLabelClick(property)"
          icon
          size="small"
          tooltip="Use for coloring"
          tooltip-placement="top"
        >
          <ColorFillOutline />
        </AppButton>

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

      <DraggableLabelsItemsOptions
        :property="property"
        class="checkboxes mr ml"
      />
    </NGi>
  </NGrid>
</template>

<style lang="scss" scoped>
$m: 8px;

.ml {
  margin-left: $m;
}

.mr {
  margin-right: $m;
}

.mt {
  margin-top: $m;
}

.mb {
  margin-bottom: $m;
}

.cell {
  display: flex;
  align-items: flex-start;
  height: auto;
  gap: $m;
}

.tag {
  user-select: none;
  flex: 1;

  &:hover {
    cursor: pointer;
  }
}

.checkboxes {
  margin-bottom: 1em;
}
</style>
