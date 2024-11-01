<script lang="ts" setup="">
import {IonIcon} from '@ionic/vue';
import {
  colorFillOutline,
  invertModeOutline,
  refreshOutline,
} from 'ionicons/icons';
import {NTag} from 'naive-ui';
import AppButton from 'src/app/app-button.vue';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import LabelCheckboxes from 'src/draggables/labels/label-checkboxes.vue';
import {useLabel} from 'src/draggables/labels/use-label';
import {watch} from 'vue';

export interface LabelProps {
  property: string;
}

const props = defineProps<LabelProps>();

const {
  hasNoSelection,
  invertSelection,
  resetSelection,
  isShowing,
  toggleShowing,
  isCurrent,
  openCurrent,
} = useLabel(props);
const {handleLabelClick} = useColorSelection();

watch(isCurrent, openCurrent);
</script>

<template>
  <div :class="[$style.cell, $style.ml, $style.mr, $style.mb]">
    <NTag
      :bordered="false"
      :class="$style.tag"
      @click="toggleShowing"
    >
      {{ props.property }}
    </NTag>

    <div :class="$style.buttons">
      <AppButton
        :disabled="hasNoSelection"
        :handle-click="invertSelection"
        size="tiny"
        small-tooltip
        tooltip="Invert selection"
        tooltip-placement="top"
      >
        <IonIcon :icon="invertModeOutline" />
      </AppButton>
      <AppButton
        :disabled="hasNoSelection"
        :handle-click="() => resetSelection(props.property)"
        size="tiny"
        small-tooltip
        tooltip="Clear selection"
        tooltip-placement="top"
      >
        <IonIcon :icon="refreshOutline" />
      </AppButton>
      <AppButton
        :active="isCurrent"
        :handle-click="() => handleLabelClick(props.property)"
        size="tiny"
        small-tooltip
        tooltip="Use for coloring"
        tooltip-placement="top"
      >
        <IonIcon :icon="colorFillOutline" />
      </AppButton>
    </div>
  </div>

  <LabelCheckboxes
    :class="[
      $style.checkboxes,
      $style.mr,
      $style.ml,
      {[$style.show]: isShowing},
    ]"
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
  align-items: center;
  justify-content: center;
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

.buttons {
  display: flex;
  gap: $p0;
}

.checkboxes {
  display: none;
  margin-bottom: $p0;
  opacity: 0;
}

.show {
  display: flex;
  opacity: 1;
}
</style>
