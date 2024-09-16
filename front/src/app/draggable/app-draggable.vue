<script lang="ts" setup>
import {CloseOutline} from '@vicons/ionicons5';
import {useDraggable} from '@vueuse/core';
import AppButton from 'src/app/app-button.vue';
import AppCondition from 'src/app/app-condition.vue';
import AppIcon from 'src/app/app-icon.vue';
import {useAppDraggable} from 'src/app/draggable/use-app-draggable';
import {useAppDraggableBounds} from 'src/app/draggable/use-app-draggable-bounds';
import {useAppDraggableLifecycles} from 'src/app/draggable/use-app-draggable-lifecycles';
import {useAppDraggableStyles} from 'src/app/draggable/use-app-draggable-styles';
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

const {container, storage, drag} = useAppDraggable(props);
const {classes} = useAppDraggableStyles(props);
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
          <div class="title header">
            <AppIcon v-if="icon !== null">
              <icon />
            </AppIcon>
            <span>
              {{ capitalizeFirstLetter(props.draggableKey) }}
            </span>
          </div>

          <div
            ref="drag"
            class="drag"
          >
            <span>👋</span>
          </div>
        </div>
      </div>

      <AppCondition
        :wait-if="suspense.while"
        :wait-message="suspense.message"
      >
        <div class="content main">
          <slot />
        </div>
      </AppCondition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.draggable {
  position: fixed;
  z-index: $appDraggableIndexDefaultLayer;

  justify-content: flex-start;

  padding: 0.6rem 0.9rem 0.6rem 2.5rem;
  min-width: 20em;

  user-select: none;

  opacity: 1;

  border: 1px solid $grey;

  background-color: $white;
  backdrop-filter: blur(10px);

  box-shadow: 10px 10px 20px -3px $greyDeep;
  @include borderRadius;
  @include transition-app-draggable;
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

  z-index: $appDraggableIndexButtonsLayer;
}

.button.close {
  top: 0.5rem;
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

.main {
  margin-top: 10px;
}

.hidden {
  display: none;
}

$titleHeaderSize: 1.3em;
.title.header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  @include transition-color;

  > i {
    width: $titleHeaderSize;
    height: $titleHeaderSize;

    * {
      width: $titleHeaderSize;
      height: $titleHeaderSize;
    }
  }
}

.selected {
  z-index: $appDraggableIndexSelectedLayer;

  .title.header > i {
    color: $emerald;
  }
}
</style>
