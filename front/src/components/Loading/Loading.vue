<script lang="ts" setup>
import {NAlert} from 'naive-ui';
import {loadingStore} from 'src/components/Loading/loadingStore';
import AppModal from '../AppModal/AppModal.vue';
</script>

<template>
  <AppModal v-if="loadingStore.isLoading" :is-wait="true">
    <n-alert
      type="info"
    >
      <div>
        Loading...
      </div>
    </n-alert>
  </AppModal>
</template>

<style lang="scss" scoped>
.link {
  text-decoration: underline;
  font-weight: bold;
  display: inline-block;
}
</style>
