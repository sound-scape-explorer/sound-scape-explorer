<script lang="ts" setup>
import {onUnmounted} from 'vue';
import CoveringExport from '../components/CoveringExport.vue';
import Title from '../components/Title.vue';
import {useSelection} from '../composables/useSelection';

const {clearSelection} = useSelection();
onUnmounted(clearSelection);
</script>

<template>
  <Title text="Covering" />
  <div class="container">
    <CoveringExport />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
