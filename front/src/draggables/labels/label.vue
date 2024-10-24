<script lang="ts" setup="">
import {IonIcon} from '@ionic/vue';
import {colorFillOutline} from 'ionicons/icons';
import {NTag, NTooltip} from 'naive-ui';
import AppButton from 'src/app/app-button.vue';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import LabelCheckboxes from 'src/draggables/labels/label-checkboxes.vue';
import {useLabel} from 'src/draggables/labels/use-label';

export interface LabelProps {
  property: string;
}

const props = defineProps<LabelProps>();

const {handlePropertyClick, handlePropertyRightClick} = useLabel(props);
const {handleLabelClick} = useColorSelection();
</script>

<template>
  <div :class="[$style.cell, $style.ml, $style.mr, $style.mb]">
    <NTooltip
      :show-arrow="false"
      placement="top-start"
      trigger="hover"
    >
      <!--suppress VueUnrecognizedSlot -->
      <template #trigger>
        <NTag
          :bordered="false"
          :class="$style.tag"
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
      size="small"
      small-tooltip
      tooltip="Use for coloring"
      tooltip-placement="top"
    >
      <IonIcon :icon="colorFillOutline" />
    </AppButton>
  </div>

  <LabelCheckboxes
    :class="[$style.checkboxes, $style.mr, $style.ml]"
    :property="props.property"
  />
</template>

<style lang="scss" module>
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
  flex: 1;
  user-select: none;

  &:hover {
    cursor: pointer;
  }
}

.checkboxes {
  margin-bottom: $p0;
}
</style>
