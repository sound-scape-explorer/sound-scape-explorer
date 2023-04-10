<script lang="ts" setup="">
import AppDraggable from '../AppDraggable/AppDraggable.vue';
import QueryComplex from './QueryComplex.vue';
import QuerySimple from './QuerySimple.vue';
</script>

<template>
  <AppDraggable draggable-key="queries">
    <div class="container">
      <QuerySimple />
      <QueryComplex />
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
