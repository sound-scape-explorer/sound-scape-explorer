<script lang="ts" setup="">
import {useDraggables} from 'src/composables/use-draggables';
import {computed} from 'vue';

const {hidden} = useDraggables();

const payload = computed<string | null>(() => {
  const payload: string[] = [];

  if (hidden.value) {
    payload.push('Escape mode enabled');
  }

  return payload.length === 0 ? null : payload.join('<br />');
});
</script>

<template>
  <div
    v-if="payload"
    class="app-console__container"
    v-html="payload"
  />
</template>

<style lang="scss" scoped>
.app-console__container {
  position: fixed;
  left: 7px;
  bottom: 5px;
  z-index: $appConsoleLayer;
  font-style: italic;
  font-size: 90%;
}
</style>
