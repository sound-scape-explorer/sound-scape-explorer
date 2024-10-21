<script lang="ts" setup="">
import {NButton, NIcon, NTooltip} from 'naive-ui';
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
  <NTooltip
    placement="right"
    trigger="hover"
  >
    <!--suppress VueUnrecognizedSlot -->
    <template #trigger>
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

    <div>
      {{ props.text }} [<span :class="$style.bold">
        {{ getKey(props.draggableKey) }}</span
      >]
    </div>
  </NTooltip>
</template>

<style lang="scss" module>
.button {
  pointer-events: auto;
  backdrop-filter: blur(5px);

  @include s0;
}

.active {
  background: $olive-light;
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
