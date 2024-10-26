<script lang="ts" setup>
import {IonIcon} from '@ionic/vue';
import {useDraggable} from '@vueuse/core';
import {close as closeIcon} from 'ionicons/icons';
import AppButton from 'src/app/app-button.vue';
import AppCondition from 'src/app/app-condition.vue';
import {useAppDraggable} from 'src/app/draggable/use-app-draggable';
import {useAppDraggableBounds} from 'src/app/draggable/use-app-draggable-bounds';
import {useAppDraggableLifecycles} from 'src/app/draggable/use-app-draggable-lifecycles';
import {useAppDraggableSuspense} from 'src/app/draggable/use-app-draggable-suspense';
import {useAppMenu} from 'src/app/menu/use-app-menu';
import {type DraggableKey, useDraggables} from 'src/composables/use-draggables';
import {capitalizeFirstLetter} from 'src/utils/strings';
import {computed} from 'vue';

export interface AppDraggableProps {
  draggableKey: DraggableKey;
  suspense?: null | 'view' | 'scatterClick';
}

const props = withDefaults(defineProps<AppDraggableProps>(), {
  suspense: null,
});

const {container, storage, drag, isZoomed, isSelected, isClosed, hidden} =
  useAppDraggable(props);
const {suspense} = useAppDraggableSuspense(props);
const {check} = useAppDraggableBounds(container);

const {menu} = useAppMenu();
const icon = menu[props.draggableKey] ?? null;
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
  props: props,
  container: container,
  drag: drag,
  x: x,
  y: y,
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
    :style="style"
  >
    <div :class="$style['close-button']">
      <AppButton
        :handle-click="() => close(props.draggableKey)"
        grow
        size="tiny"
      >
        <IonIcon :icon="closeIcon" />
      </AppButton>
    </div>

    <div :class="$style.header">
      <div :class="$style.title">
        <IonIcon
          :class="{[$style.active]: isSelected}"
          :icon="icon"
        />
        <span>
          {{ capitalizeFirstLetter(props.draggableKey) }}
        </span>
      </div>

      <div
        ref="drag"
        :class="$style.handle"
      >
        <span>👋</span>
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
.container {
  position: fixed;
  z-index: v-bind(zIndex);
  justify-content: flex-start;
  padding: $p0 $p0 $p0 $p0 * 5;
  user-select: none;
  opacity: 1;
  border: 1px solid $grey;
  background-color: $white;
  backdrop-filter: blur($p0 + $g0);

  @include s1;
  @include border-radius;
  @include transition-app-draggable;
}

.content {
  margin: $p0 0 0 0;
  cursor: default;
}

.zoomed {
  max-height: 30%;
}

.closed {
  display: none;
}

.close-button {
  position: fixed;
  top: $p0;
  left: $p0;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $p0 * 4;
}

@keyframes oscillate {
  0% {
    transform: translate3d(0, 0, 0);
  }

  50% {
    transform: translate3d(0, -2px, 0);
  }

  100% {
    transform: translate3d(0, 0, 0);
  }
}

.handle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: $p0 * 40;
  cursor: grab;
  opacity: 0.45;
  border-radius: 10px;
  background-color: $grey-light;
  filter: grayscale(0.95);

  @include transition-app-draggable-handle;

  &:hover {
    opacity: 0.99;
    filter: grayscale(0.05);

    span {
      animation: oscillate 1200ms infinite;
    }
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
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $p0;

  @include transition-color;

  > i {
    width: 100%;
    height: 100%;
    transform: translate3d(1px, 1px, 0);

    svg {
      width: $p0 * 2;
      height: $p0 * 2;
    }
  }
}

.active {
  color: $emerald;
}
</style>
