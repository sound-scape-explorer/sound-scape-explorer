<script lang="ts" setup>
import {NAlert} from 'naive-ui';
import Modal from './Modal.vue';
import {UMAPDatasetStore} from '../store/UMAP-dataset.store';
//
</script>

<template>
  <Modal v-if="UMAPDatasetStore.isLoading">
    <n-alert
        type="info"
    >
      <div>
        Loading...
      </div>
    </n-alert>
  </Modal>
</template>

<style lang="scss" scoped>
.link {
  text-decoration: underline;
  font-weight: bold;
  display: inline-block;
}
</style>
