<script lang="ts" setup>
import {NButton} from 'naive-ui';
import AppDraggable from 'src/app/app-draggable.vue';
import {useStorageFile} from 'src/composables/storage-file';
import {useStorageReady} from 'src/composables/storage-ready';
import ImportDetails from 'src/draggables/import/draggable-import-details.vue';
import {importLockRef} from 'src/draggables/import/import-lock';
import {ref} from 'vue';

const inputRef = ref<HTMLInputElement | null>(null);
const {setFile, resetFile} = useStorageFile();
const {isReady} = useStorageReady();

const handleChange = () => {
  const file = inputRef.value?.files?.[0];

  if (typeof file === 'undefined') {
    return;
  }

  setFile(file);
};
</script>

<template>
  <AppDraggable draggable-key="import">
    <div class="container">
      <input
        ref="inputRef"
        :disabled="importLockRef.value"
        accept=".h5"
        type="file"
        @change="handleChange"
      />
      <NButton
        :disabled="!importLockRef.value"
        class="red"
        size="small"
        @click="resetFile"
      >
        Unload
      </NButton>
    </div>

    <ImportDetails v-if="isReady" />
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
