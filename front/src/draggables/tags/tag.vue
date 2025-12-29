<script lang="ts" setup>
import {NTag} from 'naive-ui';
import AppButton from 'src/app/app-button.vue';
import AppIcon from 'src/app/app-icon.vue';
import {ColorCategory} from 'src/constants';
import {useColoringState} from 'src/draggables/colors/use-coloring-state';
import TagCheckbox from 'src/draggables/tags/tag-checkbox.vue';
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

const {category, option} = useColoringState();

const handleLabelClick = (tagName: string) => {
  if (category.value !== ColorCategory.enum.TAGS) {
    category.value = ColorCategory.enum.TAGS;
  }

  if (option.value !== tagName) {
    option.value = tagName;
  }
};

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
        <AppIcon
          :class="[$style['chevron'], {[$style['chevron-rotate']]: isShowing}]"
          icon="chevron"
          size="small"
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
        <AppIcon
          icon="swap"
          size="small"
        />
      </AppButton>
      <AppButton
        :disabled="hasNoSelection"
        :handle-click="() => resetSelection(props.name)"
        size="tiny"
        small-tooltip
        tooltip="Clear selection"
        tooltip-placement="top"
      >
        <AppIcon
          icon="clean"
          size="small"
        />
      </AppButton>
      <AppButton
        :active="isCurrent"
        :handle-click="() => handleLabelClick(props.name)"
        size="tiny"
        small-tooltip
        tooltip="Use for coloring"
        tooltip-placement="top"
      >
        <AppIcon
          icon="colors"
          size="small"
        />
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
  align-items: center;
  display: flex;
  gap: sizes.$p0;
  height: auto;
  justify-content: center;
  margin-right: sizes.$p0;
}

.tag {
  flex: 1;
  user-select: none;

  &:hover {
    cursor: pointer;
  }
}

.tag-content {
  align-items: center;
  display: flex;
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
