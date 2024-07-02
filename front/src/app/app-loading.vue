<script lang="ts" setup>
import {NAlert} from 'naive-ui';
import AppModal from 'src/app/app-modal.vue';
import {useScatterLoading} from 'src/components/scatter/use-scatter-loading';

const {isLoading, loadingText} = useScatterLoading();
</script>

<template>
  <AppModal
    v-if="isLoading"
    :is-wait="true"
  >
    <NAlert
      class="loading"
      type="info"
    >
      <div>Loading...</div>
      <span>{{ loadingText }}</span>
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
