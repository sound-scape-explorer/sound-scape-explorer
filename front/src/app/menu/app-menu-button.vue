<script lang="ts" setup="">
import {NButton, NIcon} from 'naive-ui';
import AppTooltip from 'src/app/app-tooltip.vue';
import {useAppMenuButton} from 'src/app/menu/use-app-menu-button';
import {type DraggableKey} from 'src/composables/use-draggables';
import {useKeyboardShortcuts} from 'src/composables/use-shortcuts';

export interface AppMenuItemProps {
  draggableKey: DraggableKey;
  text: string;
  disabled?: boolean;
}

const props = defineProps<AppMenuItemProps>();
const {button, handleClick, isActive, isSelected, isHidden} =
  useAppMenuButton(props);
const {getKey} = useKeyboardShortcuts();
</script>

<template>
  <AppTooltip>
    <template #body>
      <NButton
        ref="button"
        :class="[
          $style.button,
          {
            [$style.active]: isActive,
            [$style.selected]: isSelected,
            [$style.hidden]: isHidden,
          },
        ]"
        :disabled="props.disabled"
        size="small"
        @click="handleClick"
      >
        <NIcon>
          <slot />
        </NIcon>
      </NButton>
    </template>

    <template #tooltip>
      {{ props.text }} [<span :class="$style.bold">
        {{ getKey(props.draggableKey) }}</span
      >]
    </template>
  </AppTooltip>
</template>

<style lang="scss" module>
.button {
  pointer-events: auto;

  @include transition-app-menu-button;
  @include background-blur-1;
  @include s0;
}

.active {
  background: $olive-light;

  @include s0d;
}

.bold {
  font-weight: bold;
}

.selected {
  background: $olive;
}

.hidden {
  display: none;
}
</style>
