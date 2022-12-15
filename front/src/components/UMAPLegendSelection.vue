<script lang="ts" setup="">
import {computed} from 'vue';
import {UMAPSelectionStore} from '../store/UMAP-selection.store';

const isActive = computed<boolean>(() => {
  return UMAPSelectionStore.selection.length > 0;
});
</script>

<template>
  <div v-if="isActive">
    <div>
      Selection
    </div>
    <div class="content">
      <span v-for="item in UMAPSelectionStore.selection">
        {{ item['label'] }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title {
}

.content {
  display: grid;
  font-size: x-small;
}
</style>
