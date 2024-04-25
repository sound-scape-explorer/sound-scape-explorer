<script lang="ts" setup>
import AppLoader from 'src/app/app-loader.vue';
import AppMenu from 'src/app/menu/app-menu.vue';
import {useDraggables} from 'src/composables/draggables';
import {useStorageReady} from 'src/composables/storage-ready';
import {useWorker} from 'src/composables/worker';
import Draggables from 'src/draggables/draggables.vue';
import Scatter from 'src/scatter/scatter.vue';
import {onMounted} from 'vue';

useWorker();
const {isReady} = useStorageReady();
const {store} = useDraggables();

onMounted(() => {
  if (isReady.value) {
    return;
  }

  store.import = true;
});
</script>

<template>
  <AppMenu />
  <AppLoader v-if="isReady" />
  <Scatter v-if="isReady" />
  <Draggables />
</template>
