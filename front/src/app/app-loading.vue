<script lang="ts" setup>
import {NAlert} from 'naive-ui';
import AppModal from 'src/app/app-modal.vue';
import {
  scatterLoadingRef,
  scatterLoadingTextRef,
} from 'src/scatter/scatter-loading';
</script>

<template>
  <AppModal
    v-if="scatterLoadingRef.value"
    :is-wait="true"
  >
    <n-alert
      class="loading"
      type="info"
    >
      <div>Loading...</div>
      <span>{{ scatterLoadingTextRef.value }}</span>
    </n-alert>
  </AppModal>
</template>

<style lang="scss" scoped>
.loading {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  width: 16rem;
}
</style>
