<script lang="ts" setup>
import {NButton} from 'naive-ui';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import {useStorageFile} from 'src/composables/use-storage-file';
import {useStorageReady} from 'src/composables/use-storage-ready';
import ImportDetails from 'src/draggables/import/draggable-import-details.vue';
import {useImportLock} from 'src/draggables/import/use-import-lock';
import {ref} from 'vue';

const inputRef = ref<HTMLInputElement | null>(null);
const {setFile, resetFile} = useStorageFile();
const {isReady} = useStorageReady();
const {isLocked} = useImportLock();

const handleChange = () => {
  const file = inputRef.value?.files?.[0];

  if (typeof file === 'undefined') {
    return;
  }

  setFile(file);
};
</script>

<template>
  <AppDraggable
    class="wrapper"
    draggable-key="import"
  >
    <div class="container">
      <input
        ref="inputRef"
        :disabled="isLocked"
        accept=".h5"
        type="file"
        @change="handleChange"
      />
      <NButton
        :disabled="!isLocked"
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
.wrapper {
  width: 35em;
}

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
