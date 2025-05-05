<script lang="ts" setup>
import {NButton} from 'naive-ui';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import {useStorageFile} from 'src/composables/use-storage-file';
import {useStorageReady} from 'src/composables/use-storage-ready';
import {useThemeColors} from 'src/composables/use-theme-colors';
import DraggableOpenDetails from 'src/draggables/open/draggable-open-details.vue';
import {useOpenLock} from 'src/draggables/open/use-open-lock';
import {ref} from 'vue';

const inputRef = ref<HTMLInputElement | null>(null);
const {setFile, resetFile} = useStorageFile();
const {isReady} = useStorageReady();
const {isLocked} = useOpenLock();
const {colors} = useThemeColors();

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
    <div :class="$style.container">
      <input
        ref="inputRef"
        :disabled="isLocked"
        accept=".h5"
        type="file"
        @change="handleChange"
      />
      <NButton
        :class="$style.red"
        :disabled="!isLocked"
        size="small"
        @click="resetFile"
      >
        Unload
      </NButton>
    </div>

    <div :class="$style.details">
      <DraggableOpenDetails v-if="isReady" />
    </div>
  </AppDraggable>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';
@use 'src/styles/scrolls';

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: sizes.$s0;
}

.red {
  background: v-bind('colors.errorColor');
}

.details {
  overflow: auto;
  width: sizes.$s0;
  max-height: sizes.$h0;
  text-align: right;
  text-wrap: stable;

  @include scrolls.hide-scrollbar;
}
</style>
