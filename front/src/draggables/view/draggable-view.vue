<script lang="ts" setup="">
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import ViewMenu from 'src/draggables/view/draggable-view-menu.vue';
</script>

<template>
  <AppDraggable draggable-key="view">
    <ViewMenu />
  </AppDraggable>
</template>
