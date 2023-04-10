<script lang="ts" setup>
import {computed} from 'vue';

interface Props {
  isWait?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isWait: false,
});

const containerClasses = computed<string>(() => {
  let payload = 'container';

  if (props.isWait) {
    payload += ' wait';
  }

  return payload;
});
</script>

<template>
  <div :class="containerClasses">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;

  width: 100%;
  height: 100%;

  padding: 0 1rem;
  margin-bottom: 1rem;

  z-index: 99999;

  background: rgba(0, 0, 0, 0.7);

  user-select: none;

  animation: FadeIn 0.6s ease-in-out;
}

.wait {
  cursor: wait;
}

@keyframes FadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes FadeOut {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
