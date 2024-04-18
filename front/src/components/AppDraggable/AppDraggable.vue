<script lang="ts" setup>
import {CloseOutline} from '@vicons/ionicons5';
import {
  type Position,
  useDraggable,
  useLocalStorage,
  useMousePressed,
} from '@vueuse/core';
import {NButton, NIcon} from 'naive-ui';
import {computed, onMounted, ref, watch} from 'vue';

import {capitalizeFirstLetter} from '../../utils/capitalize-first-letter';
import {useScatterCamera} from '../Scatter/useScatterCamera';
import {appDraggableSelectedRef} from './appDraggableSelected';
import type {AppDraggablesStore} from './appDraggablesStore';
import {appDraggablesStore} from './appDraggablesStore';

interface Props {
  draggableKey: keyof AppDraggablesStore;
  hideSeparator?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  hideSeparator: false,
});

const storageKey = `sse-draggable-${props.draggableKey}`;
const containerRef = ref<HTMLElement | null>(null);
const isZoomedRef = ref<boolean>(false);
const {lock, unlock} = useScatterCamera();

const classesRef = computed<string>(() => {
  let classes = 'draggable';

  if (isZoomedRef.value === true) {
    classes += ' zoomed';
  }

  if (!appDraggablesStore[props.draggableKey]) {
    classes += ' closed';
  }

  if (appDraggableSelectedRef.value === props.draggableKey) {
    classes += ' selected';
  }

  return classes;
});

const defaultPos = 100;
const checkBounds = (position?: Position) => {
  if (window.visualViewport === null || containerRef.value === null) {
    x.value = defaultPos;
    y.value = defaultPos;
    return;
  }

  const w = containerRef.value.clientWidth;
  const h = containerRef.value.clientHeight;
  const maxWidth = window.visualViewport.width;
  const maxHeight = window.visualViewport.height;

  if (position) {
    if (position.x <= 0) {
      x.value = 0;
    }

    if (position.x >= maxWidth || position.x + w >= maxWidth) {
      x.value = maxWidth - w;
    }

    if (position.y <= 0) {
      y.value = 0;
    }

    if (position.y >= maxHeight || position.y + h >= maxHeight) {
      y.value = maxHeight - h;
    }
    return;
  }

  if (x.value <= 0) {
    x.value = 0;
  }

  if (x.value >= maxWidth || x.value + w >= maxWidth) {
    x.value = maxWidth - w;
  }

  if (y.value <= 0) {
    y.value = 0;
  }

  if (y.value >= maxHeight || y.value + h >= maxHeight) {
    y.value = maxHeight - h;
  }
};

const close = () => {
  appDraggablesStore[props.draggableKey] = false;
};

const open = () => {
  // noinspection PointlessBooleanExpressionJS,JSIncompatibleTypesComparison
  if (
    appDraggableSelectedRef.value !== props.draggableKey ||
    appDraggablesStore[props.draggableKey] === false ||
    window.visualViewport === null
  ) {
    return;
  }

  checkBounds();
};

watch(appDraggablesStore, open);

onMounted(() => checkBounds);

const storageRef = useLocalStorage(storageKey, {x: 100, y: 100});
const dragRef = ref<HTMLElement | null>(null);

const {x, y, style} = useDraggable(containerRef, {
  initialValue: {x: storageRef.value.x, y: storageRef.value.y},
  handle: dragRef,
  onEnd: (position) => {
    // noinspection JSIncompatibleTypesComparison
    if (window.visualViewport === null) {
      return;
    }
    checkBounds(position);
    storageRef.value = {x: x.value, y: y.value};
  },
});

const {pressed} = useMousePressed({target: dragRef});
watch(pressed, () => {
  // noinspection PointlessBooleanExpressionJS
  if (pressed.value === false) {
    unlock();
    return;
  }

  lock();

  if (appDraggableSelectedRef.value !== props.draggableKey) {
    appDraggableSelectedRef.value = props.draggableKey;
  }
});
</script>

<template>
  <div
    ref="containerRef"
    :class="classesRef"
    :style="style"
  >
    <div class="button close">
      <n-button
        size="tiny"
        @click="close"
      >
        <n-icon>
          <close-outline />
        </n-icon>
      </n-button>
    </div>

    <div class="title content">
      <div class="title container">
        <span>
          {{ capitalizeFirstLetter(props.draggableKey) }}
        </span>
        <div
          ref="dragRef"
          class="drag"
        >
          <span>👋</span>
        </div>
      </div>
      <hr v-if="!props.hideSeparator" />
    </div>

    <div class="content">
      <slot />
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
}

@keyframes oscillateHorizontal {
  0% {
    margin-left: 0;
  }
  50% {
    margin-left: 3px;
  }
  100% {
    margin-left: 0;
  }
}

.drag {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 20%;
  min-width: 100px;

  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  cursor: grabbing;

  span {
    animation: oscillateHorizontal 1800ms infinite;
  }
}
</style>
