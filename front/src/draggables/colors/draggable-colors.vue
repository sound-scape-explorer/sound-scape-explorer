<script lang="ts" setup="">
import AppDraggable from 'src/app/app-draggable.vue';
import ColorsAlphas from 'src/draggables/colors/draggable-colors-alphas.vue';
import ColorsGradients from 'src/draggables/colors/draggable-colors-gradients.vue';
import ColorsScale from 'src/draggables/colors/draggable-colors-scale.vue';
import ColorsType from 'src/draggables/colors/draggable-colors-type.vue';
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
