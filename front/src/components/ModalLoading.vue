<script lang="ts" setup>
import {NAlert} from 'naive-ui';
import Modal from './Modal.vue';
import {modalLoadingStore} from 'src/store/modal-loading.store';
//
</script>

<template>
  <Modal v-if="modalLoadingStore.isLoading" :is-wait="true">
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
