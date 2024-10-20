<script lang="ts" setup>
import {CloseOutline} from '@vicons/ionicons5';
import {useDraggable} from '@vueuse/core';
import AppButton from 'src/app/app-button.vue';
import AppCondition from 'src/app/app-condition.vue';
import AppIcon from 'src/app/app-icon.vue';
import {useAppDraggable} from 'src/app/draggable/use-app-draggable';
import {useAppDraggableBounds} from 'src/app/draggable/use-app-draggable-bounds';
import {useAppDraggableLifecycles} from 'src/app/draggable/use-app-draggable-lifecycles';
import {useAppDraggableSuspense} from 'src/app/draggable/use-app-draggable-suspense';
import {useAppMenu} from 'src/app/menu/use-app-menu';
import {type DraggableKey, useDraggables} from 'src/composables/use-draggables';
import {capitalizeFirstLetter} from 'src/utils/capitalize-first-letter';

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
const {close} = useDraggables();

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
</script>

<template>
  <div
    ref="container"
    :class="{
      appDraggableZoomed: isZoomed,
      appDraggableClosed: isClosed,
      appDraggableSelected: isSelected,
      appDraggableHidden: hidden,
    }"
    :style="style"
    class="appDraggableContainer"
  >
    <div class="appDraggableCloseButton">
      <AppButton
        :handle-click="() => close(props.draggableKey)"
        grow
        icon
        size="tiny"
      >
        <CloseOutline />
      </AppButton>
    </div>

    <div class="appDraggableHeader">
      <div class="appDraggableHeaderTitle">
        <AppIcon v-if="icon !== null">
          <icon />
        </AppIcon>
        <span>
          {{ capitalizeFirstLetter(props.draggableKey) }}
        </span>
      </div>

      <div
        ref="drag"
        class="appDraggableHeaderHandle"
      >
        <span>👋</span>
      </div>
    </div>

    <AppCondition
      :wait-if="suspense.while"
      :wait-message="suspense.message"
    >
      <div class="appDraggableContent">
        <slot />
      </div>
    </AppCondition>
  </div>
</template>

<style lang="scss" scoped>
.appDraggableContainer {
  position: fixed;
  z-index: $appDraggableIndexDefaultLayer;
  justify-content: flex-start;
  padding: $p0 $p0 $p0 $p0 * 5;

  user-select: none;

  opacity: 1;
  border: 1px solid $grey;
  background-color: $white;
  backdrop-filter: blur($p0 + $g0);

  @include s1;
  @include borderRadius;
  @include transition-app-draggable;
}

.appDraggableContent {
  cursor: default;
  margin: $p0 0 0 0;
}

.appDraggableZoomable {
  max-height: 20%;
}

.appDraggableZoomed {
  max-height: 30%;
}

.appDraggableClosed {
  display: none;
}

.appDraggableCloseButton {
  position: fixed;
  left: $p0;
  top: $p0;

  z-index: $appDraggableIndexButtonsLayer;
}

.appDraggableHeader {
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

.appDraggableHeaderHandle {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  max-width: $p0 * 40;

  background-color: $greyLight;
  border-radius: 10px;
  cursor: grab;

  opacity: 0.45;
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
  opacity: 20%;
}

.appDraggableHidden {
  display: none;
}

.appDraggableHeaderTitle {
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
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

.appDraggableSelected {
  z-index: $appDraggableIndexSelectedLayer;

  .appDraggableHeaderTitle > i {
    color: $emerald;
  }
}
</style>
