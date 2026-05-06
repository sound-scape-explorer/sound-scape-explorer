<script lang="ts" setup>
import AppModal from 'src/app/app-modal.vue';
import {useScatterState} from 'src/components/scatter/use-scatter-state';

const {isRendering} = useScatterState();
</script>

<template>
  <AppModal
    v-if="isRendering"
    :is-wait="true"
  />
</template>

<style lang="scss" module>
@use 'src/styles/fx';
</style>
