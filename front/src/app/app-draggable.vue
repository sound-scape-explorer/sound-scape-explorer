<script lang="ts" setup>
import {CloseOutline} from '@vicons/ionicons5';
import {
  type Position,
  useDraggable,
  useLocalStorage,
  useMousePressed,
  useWindowSize,
} from '@vueuse/core';
import {NButton, NIcon} from 'naive-ui';
import {type DraggablesStore, useDraggables} from 'src/composables/draggables';
import {useScatterCamera} from 'src/scatter/scatter-camera';
import {capitalizeFirstLetter} from 'src/utils/capitalize-first-letter';
import {computed, onMounted, ref, watch} from 'vue';

const {store, selected} = useDraggables();

interface Props {
  draggableKey: keyof DraggablesStore;
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

  if (!store[props.draggableKey]) {
    classes += ' closed';
  }

  if (selected.value === props.draggableKey) {
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
    if (position.x >= maxWidth || position.x + w >= maxWidth) {
      x.value = maxWidth - w;
    }

    if (position.y >= maxHeight || position.y + h >= maxHeight) {
      y.value = maxHeight - h;
    }

    if (position.x <= 0) {
      x.value = 0;
    }

    if (position.y <= 0) {
      y.value = 0;
    }

    return;
  }

  if (x.value >= maxWidth || x.value + w >= maxWidth) {
    x.value = maxWidth - w;
  }

  if (y.value >= maxHeight || y.value + h >= maxHeight) {
    y.value = maxHeight - h;
  }

  if (x.value <= 0) {
    x.value = 0;
  }

  if (y.value <= 0) {
    y.value = 0;
  }
};

const close = () => {
  store[props.draggableKey] = false;
};

const open = () => {
  // noinspection PointlessBooleanExpressionJS,JSIncompatibleTypesComparison
  if (
    selected.value !== props.draggableKey ||
    store[props.draggableKey] === false ||
    window.visualViewport === null
  ) {
    return;
  }

  checkBounds();
};

watch(store, open);

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

  if (selected.value !== props.draggableKey) {
    selected.value = props.draggableKey;
  }
});

onMounted(() => checkBounds());
const {width, height} = useWindowSize();
watch([width, height], () => checkBounds());
</script>

<template>
  <div
    ref="containerRef"
    :class="classesRef"
    :style="style"
  >
    <div class="button close">
      <NButton
        size="tiny"
        @click="close"
      >
        <NIcon>
          <CloseOutline />
        </NIcon>
      </NButton>
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
</style>
