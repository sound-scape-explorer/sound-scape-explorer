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
      :class="$style.loading"
      type="info"
    >
      <div>Loading...</div>
      <span>{{ loadingText }}</span>
    </NAlert>
  </AppModal>
</template>

<style lang="scss" module>
.loading {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 16rem;
}
</style>
