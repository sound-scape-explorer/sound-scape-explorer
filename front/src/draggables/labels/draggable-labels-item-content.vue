<script lang="ts" setup="">
import {CalculatorOutline, ColorFillOutline} from '@vicons/ionicons5';
import {NTag, NTooltip} from 'naive-ui';
import AppButton from 'src/app/app-button.vue';
import {useColorSelection} from 'src/components/scatter/use-color-selection';
import {useStorageLabels} from 'src/composables/use-storage-labels';
import DraggableLabelsItemsOptions from 'src/draggables/labels/draggable-labels-item-checkboxes.vue';
import {useLabelsCalculation} from 'src/draggables/labels/use-labels-calculation';
import {useLabelsSelection} from 'src/draggables/labels/use-labels-selection';
import {ref} from 'vue';

const {labels} = useStorageLabels();
const {updateSelection, selection} = useLabelsSelection();
const {handleLabelClick} = useColorSelection();
const {isCalculable} = useLabelsCalculation();

interface Props {
  property: string;
}

const props = defineProps<Props>();

const handlePropertyClick = () => {
  if (labels.value === null) {
    return;
  }

  const oldSelection = selection.value[props.property];
  const uniques = labels.value[props.property];

  const reverseSelection = [];

  for (const unique of uniques) {
    if (oldSelection.includes(unique)) {
      continue;
    }

    reverseSelection.push(unique);
  }

  updateSelection(props.property, reverseSelection);
};

const handlePropertyRightClick = (e: PointerEvent, property: string) => {
  e.preventDefault();

  if (selection.value[property].length === 0) {
    return;
  }

  updateSelection(property, []);
};

const isExpanded = ref<boolean>(false);

const toggle = () => (isExpanded.value = !isExpanded.value);
</script>

<template>
  <div class="cell ml mr mb">
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
          @click="handlePropertyClick"
          @contextmenu="(e: PointerEvent) => handlePropertyRightClick(e, property)"
        >
          {{ props.property }}
        </NTag>
      </template>
      <div>
        <span>Left click: Invert selection</span>
        <br />
        <span>Right click: Clear selection</span>
      </div>
    </NTooltip>

    <AppButton
      v-if="isCalculable(props.property)"
      :handle-click="toggle"
      icon
      size="small"
      tooltip="Toggle numerical panel"
      tooltip-placement="top"
    >
      <CalculatorOutline />
    </AppButton>

    <AppButton
      :handle-click="() => handleLabelClick(props.property)"
      icon
      size="small"
      tooltip="Use for coloring"
      tooltip-placement="top"
    >
      <ColorFillOutline />
    </AppButton>
  </div>

  <div class="cell ml mr mb">
    <AppButton
      v-if="isExpanded"
      :handle-click="() => console.log(props.property)"
      size="small"
    >
      test
    </AppButton>
  </div>

  <DraggableLabelsItemsOptions
    :property="props.property"
    class="checkboxes mr ml"
  />
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
