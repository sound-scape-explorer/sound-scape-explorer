<script lang="ts" setup>
import {useSlots} from 'vue';

interface Props {
  waitIf: boolean;
  waitMessage: string;
}

const props = defineProps<Props>();

const slots = useSlots();
const hasChildren = typeof slots.default !== 'undefined';
</script>

<template>
  <div
    v-if="props.waitIf"
    class="suspense"
  >
    {{ props.waitMessage }}
  </div>

  <div v-if="!props.waitIf && hasChildren">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.suspense {
  font-style: italic;
}
</style>
