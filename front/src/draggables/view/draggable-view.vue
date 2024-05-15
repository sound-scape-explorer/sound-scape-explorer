<script lang="ts" setup="">
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import ViewMenu from 'src/draggables/view/draggable-view-menu.vue';
import ViewUnload from 'src/draggables/view/draggable-view-unloader.vue';
</script>

<template>
  <AppDraggable draggable-key="view">
    <div class="container">
      <ViewMenu />
      <ViewUnload />
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
