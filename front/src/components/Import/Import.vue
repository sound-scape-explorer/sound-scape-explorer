<script lang="ts" setup>
import {NButton} from 'naive-ui';
import {ref} from 'vue';
import {useStorage} from '../../storage/useStorage';
import AppDraggable from '../AppDraggable/AppDraggable.vue';
import ImportDetails from './ImportDetails.vue';

const inputRef = ref<HTMLInputElement>();
const {load, unload, isReadyRef} = await useStorage();

const handleChange = () => {
  const file = inputRef.value?.files?.[0];

  if (typeof file === 'undefined') {
    return;
  }

  load(file);
};
</script>

<template>
  <AppDraggable draggable-key="import">
    <div class="container">
      <input
        ref="inputRef"
        type="file"
        @change="handleChange"
      />
      <n-button
        class="red"
        size="small"
        @click="unload"
      >
        Unload
      </n-button>
    </div>

    <ImportDetails v-if="isReadyRef" />
  </AppDraggable>
</template>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 8rem;

  gap: 1rem;
}

.red {
  background: rgba(255, 0, 0, 0.2);
}

.green {
  background: rgba(0, 255, 0, 0.2);
}
</style>
