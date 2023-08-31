<script lang="ts" setup="">
import AppDraggable from '../AppDraggable/AppDraggable.vue';
import ColorsAlphas from './ColorsAlphas.vue';
import ColorsGradients from './ColorsGradients.vue';
import ColorsScale from './ColorsScale.vue';
import ColorsType from './ColorsType.vue';
</script>

<template>
  <AppDraggable draggable-key="colors">
    <div class="container">
      <ColorsType />
      <ColorsScale />
      <ColorsAlphas />
      <ColorsGradients />
    </div>
  </AppDraggable>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: 24rem;
}
</style>
