<script lang="ts" setup>
import {IonIcon} from '@ionic/vue';
import {
  chevronForwardOutline,
  colorFillOutline,
  invertModeOutline,
  refreshOutline,
} from 'ionicons/icons';
import {NTag} from 'naive-ui';
import AppButton from 'src/app/app-button.vue';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import TagCheckbox from 'src/draggables/tags/TagCheckbox.vue';
import {useTag} from 'src/draggables/tags/use-tag';
import {watch} from 'vue';

export interface TagProps {
  name: string;
}

const props = defineProps<TagProps>();

const {
  hasNoSelection,
  invertSelection,
  resetSelection,
  isShowing,
  toggleShowing,
  isCurrent,
  openCurrent,
} = useTag(props);
const {handleLabelClick} = useColorSelection();

watch(isCurrent, openCurrent);
</script>

<template>
  <div :class="[$style.cell]">
    <NTag
      :bordered="false"
      :class="$style.tag"
      @click="toggleShowing"
    >
      <div :class="$style['tag-content']">
        <IonIcon
          :class="[$style['chevron'], {[$style['chevron-rotate']]: isShowing}]"
          :icon="chevronForwardOutline"
        />
        <span>{{ props.name }}</span>
      </div>
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
        :handle-click="() => resetSelection(props.name)"
        size="tiny"
        small-tooltip
        tooltip="Clear selection"
        tooltip-placement="top"
      >
        <IonIcon :icon="refreshOutline" />
      </AppButton>
      <AppButton
        :active="isCurrent"
        :handle-click="() => handleLabelClick(props.name)"
        size="tiny"
        small-tooltip
        tooltip="Use for coloring"
        tooltip-placement="top"
      >
        <IonIcon :icon="colorFillOutline" />
      </AppButton>
    </div>
  </div>

  <TagCheckbox
    :class="[$style.checkboxes, {[$style['checkboxes-show']]: isShowing}]"
    :property="props.name"
  />
</template>

<style lang="scss" module>
@use 'src/styles/fx';
@use 'src/styles/sizes';
@use 'src/styles/transitions';

.cell {
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
  margin-right: sizes.$p0;
  gap: sizes.$p0;
}

.tag {
  flex: 1;
  user-select: none;

  &:hover {
    cursor: pointer;
  }
}

.tag-content {
  display: flex;
  align-items: center;
  gap: sizes.$p0;
}

.chevron {
  @include transitions.transition-rotate;
}

.chevron-rotate {
  @include fx.rotate-90;
}

.buttons {
  display: flex;
  gap: sizes.$p0;
}

.checkboxes {
  display: none;
}

.checkboxes-show {
  display: flex;
}
</style>
