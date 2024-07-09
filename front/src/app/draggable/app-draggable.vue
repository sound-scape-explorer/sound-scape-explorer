<script lang="ts" setup>
import {CloseOutline} from '@vicons/ionicons5';
import {useDraggable} from '@vueuse/core';
import AppButton from 'src/app/app-button.vue';
import {useAppDraggable} from 'src/app/draggable/use-app-draggable';
import {useAppDraggableBounds} from 'src/app/draggable/use-app-draggable-bounds';
import {useAppDraggableLifecycles} from 'src/app/draggable/use-app-draggable-lifecycles';
import {useAppDraggableStyles} from 'src/app/draggable/use-app-draggable-styles';
import {type DraggableKey, useDraggables} from 'src/composables/use-draggables';
import {capitalizeFirstLetter} from 'src/utils/capitalize-first-letter';

export interface AppDraggableProps {
  draggableKey: DraggableKey;
  hideSeparator?: boolean;
}

const props = defineProps<AppDraggableProps>();

const {container, storage, drag} = useAppDraggable(props);
const {close} = useDraggables();
const {classes} = useAppDraggableStyles(props);
const {check} = useAppDraggableBounds(container);

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
  <div>
    <div
      ref="container"
      :class="classes"
      :style="style"
    >
      <div class="button close">
        <AppButton
          :handle-click="() => close(props.draggableKey)"
          grow
          icon
          size="tiny"
        >
          <CloseOutline />
        </AppButton>
      </div>

      <div class="title content">
        <div class="title container">
          <span>
            {{ capitalizeFirstLetter(props.draggableKey) }}
          </span>
          <div
            ref="drag"
            class="drag"
          >
            <span>👋</span>
          </div>
        </div>
      </div>

      <div class="content main">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$indexDefault: 1000;
$indexButtons: 1000;
$indexSelected: 1001;

.draggable {
  position: fixed;
  z-index: $indexDefault;

  justify-content: flex-start;

  padding: 0.6rem 0.9rem 0.6rem 2.5rem;
  min-width: 20em;

  user-select: none;

  opacity: 1;

  border: 1px solid rgba(0, 0, 0, 0.1);

  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);

  box-shadow: 10px 10px 20px -3px rgba(0, 0, 0, 0.2);
  border-radius: 8px;

  transition: width 120ms ease-in-out, border 120ms ease-in-out,
    max-height 120ms ease-in, background-color 120ms ease-in-out;
}

.content {
  cursor: default;
}

.zoomable {
  max-height: 20%;
}

.zoomed {
  max-height: 30%;
}

.closed {
  //animation: FadeOut 120ms ease-in-out forwards;
  display: none;
}

.button {
  position: fixed;
  left: 0.5rem;

  z-index: $indexButtons;
}

.button.close {
  top: 0.5rem;
}

.selected {
  z-index: $indexSelected;
}

.title {
  font-weight: bold;
}

.title.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 25%;
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

.drag {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  min-width: 100px;

  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  cursor: grab;

  opacity: 0.45;
  filter: grayscale(0.95);

  transition: opacity 100ms ease-in, filter 100ms ease-in;

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

.main {
  margin-top: 10px;
}

.hidden {
  display: none;
}
</style>
