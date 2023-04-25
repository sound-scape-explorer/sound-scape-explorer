<script lang="ts" setup>
import {CloseOutline, SearchOutline} from '@vicons/ionicons5';
import {UseDraggable} from '@vueuse/components';
import {onClickOutside} from '@vueuse/core';
import {NButton, NIcon} from 'naive-ui';
import {computed, ref} from 'vue';
import {capitalizeFirstLetter} from '../../utils/capitalize-first-letter';
import type {AppDraggablesStore} from './appDraggablesStore';
import {appDraggablesStore} from './appDraggablesStore';

/**
 * Props
 */
interface Props {
  draggableKey: keyof AppDraggablesStore;
  hideSeparator?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  hideSeparator: false,
});

/**
 * Ref
 */

const containerRef = ref<HTMLElement>();
const storageKey = `sse-draggable-${props.draggableKey}`;
const isZoomedRef = ref<boolean>(false);
const isSelectedRef = ref<boolean>(true);

const dynamicClasses = computed<string>(() => {
  let classes = '';

  if (isZoomedRef.value === true) {
    classes += ' zoomed';
  }

  if (!appDraggablesStore[props.draggableKey]) {
    classes += ' closed';
  }

  if (isSelectedRef.value === true) {
    classes += ' selected';
  }

  return classes;
});

/**
 * Lifecycles
 */

onClickOutside(containerRef, unselect);

/**
 * Handlers
 */
function close() {
  appDraggablesStore[props.draggableKey] = false;
}

function toggleZoom() {
  isZoomedRef.value = !isZoomedRef.value;
}

function select() {
  if (isSelectedRef.value === true) {
    return;
  }

  isSelectedRef.value = true;
}

function unselect() {
  if (isSelectedRef.value === false) {
    return;
  }

  isSelectedRef.value = false;
}
</script>

<template>
  <UseDraggable
    ref="containerRef"
    :class="dynamicClasses"
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
