<script lang="ts" setup="">
import {useDraggables} from 'src/composables/use-draggables';
import {Shortcuts} from 'src/composables/use-shortcuts';
import {computed} from 'vue';

const {hidden} = useDraggables();

const payload = computed<string | null>(() => {
  const payload: string[] = [];

  if (hidden.value) {
    payload.push(
      `Toggle mode enabled. Press ${Shortcuts._draggableToggle} to quit.`,
    );
  }

  return payload.length === 0 ? null : payload.join('<br />');
});
</script>

<template>
  <div
    v-if="payload"
    :class="$style.container"
    v-html="payload"
  />
</template>

<style lang="scss" module>
.container {
  font-size: 90%;
  font-style: italic;
  position: fixed;
  z-index: $app-console-layer;
  bottom: 5px;
  left: 7px;
}
</style>
