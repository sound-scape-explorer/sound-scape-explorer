<script lang="ts" setup>
import {CloseOutline, SearchOutline} from '@vicons/ionicons5';
import {UseDraggable} from '@vueuse/components';
import {onClickOutside, useIntersectionObserver} from '@vueuse/core';
import {NButton, NIcon} from 'naive-ui';
import {computed, onMounted, onUnmounted, ref} from 'vue';
import {capitalizeFirstLetter} from '../../utils/capitalize-first-letter';
import type {AppDraggablesStore} from './appDraggablesStore';
import {appDraggablesStore} from './appDraggablesStore';
import {appDraggableSelectedRef} from './appDraggableSelected';

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

const classesRef = computed<string>(() => {
  let classes = '';

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

const close = () => {
  appDraggablesStore[props.draggableKey] = false;
};

const toggleZoom = () => {
  isZoomedRef.value = !isZoomedRef.value;
};

const select = () => {
  if (appDraggableSelectedRef.value === props.draggableKey) {
    return;
  }

  appDraggableSelectedRef.value = props.draggableKey;
};

const unselect = () => {
  if (appDraggableSelectedRef.value === null) {
    return;
  }

  appDraggableSelectedRef.value = null;
};

useIntersectionObserver(containerRef, ([{isIntersecting}]) => {
  if (isIntersecting === true) {
    return;
  }

  if (containerRef.value === null) {
    return;
  }

  const container = containerRef.value as unknown as typeof UseDraggable;
  const element = container.$el as HTMLDivElement;
  element.style.left = '100px';
  element.style.top = '100px';
});

onMounted(select);
onUnmounted(unselect);
onClickOutside(containerRef, unselect);
</script>

<template>
  <UseDraggable
    ref="containerRef"
    :class="classesRef"
    :exact="true"
    :initialValue="{x: 100, y: 100}"
    :storage-key="storageKey"
    class="draggable"
    @click="select"
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

    <div
      v-if="false"
      class="button zoom"
    >
      <n-button
        size="tiny"
        @click="toggleZoom"
      >
        <n-icon>
          <search-outline />
        </n-icon>
      </n-button>
    </div>

    <div class="title content">
      {{ capitalizeFirstLetter(props.draggableKey) }}
      <hr v-if="!props.hideSeparator" />
    </div>

    <div class="content">
      <slot />
    </div>
  </UseDraggable>
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
  cursor: grabbing;

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

.button.zoom {
  bottom: 0.5rem;
}

.button.move {
  top: 2rem;
  cursor: grabbing;

  button {
    cursor: grabbing;
  }
}

.selected {
  z-index: $indexSelected;
}

.title {
  font-weight: bold;
}
</style>
