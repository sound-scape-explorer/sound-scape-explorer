<script lang="ts" setup>
import {useDraggables} from 'src/composables/use-draggables';
import {Shortcut} from 'src/composables/use-shortcuts';
import {computed} from 'vue';

const {hidden} = useDraggables();

const payload = computed<string | null>(() => {
  const payload: string[] = [];

  if (hidden.value) {
    payload.push(
      `Focus mode enabled. Press ${Shortcut._draggableFocus} to quit.`,
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
@use 'src/styles/layers';

.container {
  bottom: 5px;
  font-size: 90%;
  font-style: italic;
  left: 7px;
  position: fixed;
  z-index: layers.$app-console-layer;
}
</style>
