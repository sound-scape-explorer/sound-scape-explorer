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
    <NAlert
      class="loading"
      type="info"
    >
      <div>Loading...</div>
      <span>{{ scatterLoadingTextRef.value }}</span>
    </NAlert>
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
