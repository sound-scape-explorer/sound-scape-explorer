<script lang="ts" setup>
import {NButton} from 'naive-ui';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import {useStorageFile} from 'src/composables/use-storage-file';
import {useStorageReady} from 'src/composables/use-storage-ready';
import DraggableOpenDetails from 'src/draggables/open/draggable-open-details.vue';
import {useOpenLock} from 'src/draggables/open/use-open-lock';
import {ref} from 'vue';

const inputRef = ref<HTMLInputElement | null>(null);
const {setFile, resetFile} = useStorageFile();
const {isReady} = useStorageReady();
const {isLocked} = useOpenLock();

const handleChange = () => {
  const file = inputRef.value?.files?.[0];

  if (typeof file === 'undefined') {
    return;
  }

  setFile(file);
};
</script>

<template>
  <AppDraggable draggable-key="open">
    <div class="draggableOpenContainer">
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

    <div class="details">
      <DraggableOpenDetails v-if="isReady" />
    </div>
  </AppDraggable>
</template>

<style lang="scss" scoped>
.draggableOpenContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: $s0;
}

.red {
  background: $red;
}

.details {
  width: $s0;
  max-height: $h0;

  text-align: right;
  text-wrap: stable;

  overflow: auto;
  @include noScroll;
}
</style>
