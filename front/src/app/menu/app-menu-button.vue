<script lang="ts" setup>
import {NButton, NIcon} from 'naive-ui';
import AppTooltip from 'src/app/app-tooltip.vue';
import {useAppMenuButton} from 'src/app/menu/use-app-menu-button';
import {type DraggableKey} from 'src/composables/use-draggables';
import {useKeyboardShortcuts} from 'src/composables/use-shortcuts';
import {useThemeColors} from 'src/composables/use-theme-colors';

export interface AppMenuItemProps {
  draggableKey: DraggableKey;
  text: string;
  disabled?: boolean;
}

const props = defineProps<AppMenuItemProps>();
const {button, handleClick, isActive, isSelected, isHidden} =
  useAppMenuButton(props);
const {getKey} = useKeyboardShortcuts();
const {colors} = useThemeColors();
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
@use 'src/styles/transitions';
@use 'src/styles/fx';
@use 'src/styles/shadows';

.button {
  pointer-events: auto;

  @include transitions.transition-app-menu-button;
  @include fx.background-blur-1;
  @include shadows.s0(v-bind('colors.boxShadow1'));
}

.active {
  background: v-bind('colors.actionColor');

  @include shadows.s0(v-bind('colors.boxShadow2'));
}

.bold {
  font-weight: bold;
}

.selected {
  background: v-bind('colors.primaryColor');
}

.hidden {
  display: none;
}
</style>
