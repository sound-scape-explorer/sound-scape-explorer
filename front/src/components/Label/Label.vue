<script lang="ts" setup="">
import {SearchOutline} from '@vicons/ionicons5';
import {NButton, NIcon} from 'naive-ui';
import {computed} from 'vue';

import AppDraggable from '../AppDraggable/AppDraggable.vue';
import LabelItems from './LabelItems.vue';
import {useLabelsSelection} from './useLabelsSelection';
import {labelZoomedRef} from './useLabelZoomed';

useLabelsSelection();

const containerClasses = computed<string>(() => {
  let classes = 'container';

  if (labelZoomedRef.value === true) {
    classes += ' open';
  }

  return classes;
});

const toggle = () => {
  labelZoomedRef.value = !labelZoomedRef.value;
};
</script>

<template>
  <AppDraggable draggable-key="labels">
    <div
      :class="containerClasses"
      class="container"
    >
      <div class="button search">
        <n-button
          size="tiny"
          @click="toggle"
        >
          <n-icon>
            <search-outline />
          </n-icon>
        </n-button>
      </div>

      <LabelItems />
    </div>
  </AppDraggable>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 14rem;
  overflow-y: auto;
}

.title {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  font-size: small;
  font-weight: bold;
  font-style: italic;
}

.open {
  height: 100%;
  max-height: 70vh;
}

.button {
  position: fixed;
  left: 0.5rem;
}

.button.search {
  top: 2.5rem;
}

.toggle {
  position: fixed;
  background: transparent;
  padding-right: 26px;
  width: auto;
}
</style>
