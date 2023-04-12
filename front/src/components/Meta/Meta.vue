<script lang="ts" setup="">
import {SearchOutline} from '@vicons/ionicons5';
import {NButton, NIcon} from 'naive-ui';
import {computed} from 'vue';
import AppDraggable from '../AppDraggable/AppDraggable.vue';
import MetaItems from './MetaItems.vue';
import {metaStore} from './metaStore';

/**
 * State
 */

const containerClasses = computed<string>(() => {
  let classes = 'container';

  if (metaStore.isOpen) {
    classes += ' open';
  }

  return classes;
});

/**
 * Handlers
 */

function toggle() {
  metaStore.isOpen = !metaStore.isOpen;
}
</script>

<template>
  <AppDraggable draggable-key="meta">
    <div :class="containerClasses" class="container">
      <div class="button search">
        <n-button size="tiny" @click="toggle">
          <n-icon>
            <search-outline />
          </n-icon>
        </n-button>
      </div>

      <MetaItems />
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
