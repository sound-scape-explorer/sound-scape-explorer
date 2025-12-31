<script lang="ts" setup>
import {useDraggable} from '@vueuse/core';
import AppButton from 'src/app/app-button.vue';
import AppCondition from 'src/app/app-condition.vue';
import AppIcon from 'src/app/app-icon.vue';
import {useAppDraggable} from 'src/app/draggable/use-app-draggable';
import {useAppDraggableBounds} from 'src/app/draggable/use-app-draggable-bounds';
import {useAppDraggableLifecycles} from 'src/app/draggable/use-app-draggable-lifecycles';
import {
  SuspenseCase,
  useAppDraggableSuspense,
} from 'src/app/draggable/use-app-draggable-suspense';
import {type DraggableKey, useDraggables} from 'src/composables/use-draggables';
import {useThemeColors} from 'src/composables/use-theme-colors';
import {capitalizeFirstLetter} from 'src/utils/strings';
import {computed} from 'vue';

export interface AppDraggableProps {
  draggableKey: DraggableKey;
  suspense?: SuspenseCase;
}

const props = withDefaults(defineProps<AppDraggableProps>(), {
  suspense: SuspenseCase.enum.NONE,
});

const {container, storage, drag, isZoomed, isSelected, isClosed, hidden} =
  useAppDraggable(props);
const {suspense} = useAppDraggableSuspense(props);
const {check} = useAppDraggableBounds(container);
const {colors} = useThemeColors();
const {close, stack} = useDraggables();

const {x, y, style} = useDraggable(container, {
  initialValue: {x: storage.value.x, y: storage.value.y},
  handle: drag,
  onEnd: (position) => {
    // noinspection JSIncompatibleTypesComparison
    if (window.visualViewport === null) {
      return;
    }
    check(x, y, position);
    storage.value = {x: x.value, y: y.value};
  },
});

useAppDraggableLifecycles({
  props,
  container,
  drag,
  x,
  y,
});

const zIndex = computed(() => {
  const i = stack.value.indexOf(props.draggableKey);
  const z = 40;
  return z - i;
});
</script>

<template>
  <div
    ref="container"
    :class="[
      $style.container,
      {
        [$style.zoomed]: isZoomed,
        [$style.closed]: isClosed,
        [$style.hidden]: hidden,
      },
    ]"
    :style="[
      style,
      {
        border: `1px solid ${colors.borderColor}`,
        backgroundColor: colors.modalColor,
      },
    ]"
  >
    <div :class="$style['close-button']">
      <AppButton
        :handle-click="() => close(props.draggableKey)"
        grow
        size="tiny"
      >
        <AppIcon
          icon="close"
          size="small"
        />
      </AppButton>
    </div>

    <div :class="$style.header">
      <div :class="$style.title">
        <AppIcon
          :icon="props.draggableKey"
          :intent="isSelected ? 'active' : 'default'"
          size="small"
        />
        <span>
          {{ capitalizeFirstLetter(props.draggableKey) }}
        </span>
      </div>

      <div
        ref="drag"
        :class="$style.handle"
      >
        <span>
          <AppIcon
            icon="drag"
            size="small"
          />
        </span>
      </div>
    </div>

    <AppCondition
      :wait-if="suspense.while"
      :wait-message="suspense.message"
    >
      <div :class="$style.content">
        <slot />
      </div>
    </AppCondition>
  </div>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';
@use 'src/styles/shadows';
@use 'src/styles/transitions';
@use 'src/styles/fx';
@use 'src/styles/borders';

.container {
  backdrop-filter: blur(sizes.$p0 + sizes.$g0);
  justify-content: flex-start;
  opacity: 1;
  padding: sizes.$p0 sizes.$p0 sizes.$p0 sizes.$p0 * 5;
  position: fixed;
  user-select: none;
  z-index: v-bind(zIndex);

  @include shadows.s1(v-bind('colors.boxShadow2'));
  @include borders.border-radius;
  @include transitions.transition-app-draggable;
}

.content {
  cursor: default;
  margin: sizes.$p0 0 0 0;
}

.zoomed {
  max-height: 30%;
}

.closed {
  display: none;
}

.close-button {
  left: sizes.$p0;
  position: fixed;
  top: sizes.$p0;
}

.header {
  align-items: center;
  display: flex;
  gap: sizes.$p0 * 4;
  justify-content: space-between;
}

.handle {
  align-items: center;
  background-color: v-bind('colors.primaryColor');
  border-radius: 10px;
  cursor: grab;
  display: flex;
  filter: grayscale(0.95);
  justify-content: center;
  max-width: sizes.$p0 * 40;
  opacity: 0.45;
  width: 100%;

  @include transitions.transition-app-draggable-handle;

  &:hover {
    filter: grayscale(0.05);
    opacity: 0.99;
  }

  &:active {
    cursor: grabbing;
  }
}

hr {
  opacity: 0.2;
}

.hidden {
  display: none;
}

.title {
  align-items: center;
  display: flex;
  font-weight: bold;
  gap: sizes.$p0;
  justify-content: center;

  @include transitions.transition-color;

  > i {
    height: 100%;
    transform: translate3d(1px, 1px, 0);
    width: 100%;

    svg {
      height: sizes.$p0 * 2;
      width: sizes.$p0 * 2;
    }
  }
}

.active {
  color: v-bind('colors.pressedColor');
}
</style>
