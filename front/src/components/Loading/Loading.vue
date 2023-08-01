<script lang="ts" setup>
import {NAlert} from 'naive-ui';
import AppModal from '../AppModal/AppModal.vue';
import {scatterLoadingRef} from '../Scatter/useScatterLoading';
</script>

<template>
  <AppModal
    v-if="scatterLoadingRef.value"
    :is-wait="true"
  >
    <n-alert type="info">
      <div>Loading...</div>
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
