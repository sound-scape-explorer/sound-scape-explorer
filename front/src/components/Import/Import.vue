<script lang="ts" setup>
import {ref} from 'vue';
import {useStorage} from '../../hooks/useStorage';
import AppButton from '../AppButton/AppButton.vue';
import AppDraggable from '../AppDraggable/AppDraggable.vue';
import ImportDetails from './ImportDetails.vue';

const inputRef = ref<HTMLInputElement>();
const {
  importUploadedFile,
  deleteBrowserStorage,
  isLoaded,
} = await useStorage();

const isReady = await isLoaded();

async function handleChange() {
  const file = inputRef.value?.files?.[0];

  if (!file) {
    return;
  }

  await importUploadedFile(file);
}
</script>

<template>
  <AppDraggable draggable-key="import">
    <div class="container">
      <input ref="inputRef" type="file" @change="handleChange" />
      <AppButton
        :handle-click="deleteBrowserStorage"
        class="red"
        text="Remove data from browser"
      />
    </div>

    <ImportDetails v-if="isReady" />
  </AppDraggable>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 1rem;
}

.red {
  background: rgba(255, 0, 0, 0.2);
}
</style>
