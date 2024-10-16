<script lang="ts" setup="">
import {ColorFillOutline} from '@vicons/ionicons5';
import {NTag, NTooltip} from 'naive-ui';
import AppButton from 'src/app/app-button.vue';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import DraggableLabelsItemsOptions from 'src/draggables/labels/draggable-labels-item-checkboxes.vue';
import {useLabelsItem} from 'src/draggables/labels/use-labels-item';

export interface DraggableLabelsItemContentProps {
  property: string;
}

const props = defineProps<DraggableLabelsItemContentProps>();

const {handleLabelClick} = useColorSelection();
const {handlePropertyClick, handlePropertyRightClick} = useLabelsItem(props);
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
      :handle-click="() => handleLabelClick(props.property)"
      icon
      size="small"
      tooltip="Use for coloring"
      tooltip-placement="top"
    >
      <ColorFillOutline />
    </AppButton>
  </div>

  <DraggableLabelsItemsOptions
    :property="props.property"
    class="checkboxes mr ml"
  />
</template>

<style lang="scss" scoped>
.ml {
  margin-left: $p0;
}

.mr {
  margin-right: $p0;
}

.mt {
  margin-top: $p0;
}

.mb {
  margin-bottom: $p0;
}

.cell {
  display: flex;
  align-items: flex-start;
  height: auto;
  gap: $p0;
}

.tag {
  user-select: none;
  flex: 1;

  &:hover {
    cursor: pointer;
  }
}

.checkboxes {
  margin-bottom: $p0;
}
</style>
